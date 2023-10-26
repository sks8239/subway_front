import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import styled, {createGlobalStyle} from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const port = 40;

const socket =  io.connect(`http://subwaymap.ddns.net:${port}`)
const GlobalStyle = createGlobalStyle`
  body{
    background-color: #1C1C1C;
    overflow: hidden;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: aqua; */
  flex-direction: row;
  width: 50vw;
  padding: 20px 0;
  /* height: 500px; */
  /* margin: 50px; */
  /* position: relative;
  top: 60px; */
  form {
    display: flex;
    /* background-color: red; */
    width: 80%;

      .nameInput{
        /* position: relative;
        left: 30px; */
        height: 4.5vh;
        width: 20%;
        border: 1.5px solid purple;
        border-right: none;
        background-color: black;
        color: white;
      }
      .messageInput{
        /* position: relative;
        left: 30px; */
        height: 4.5vh;
        width: 80%;
        border: 1.5px solid purple;
        position: relative;
        z-index: 1;
        background-color: black;
        color: white;
      }
      input::placeholder{
        padding-left: 10px;
      }
      button{
        height: 5vh;
        width: 100px;
        margin-left: 10px;
        background-color: #8000FF;
        color: white;
        border: none;
        cursor: pointer;
        /* position: relative;
        left: 410px;
        bottom: 55px; */
        z-index: 2;
        font-weight: bold;
        border-radius: 10px;

        &:hover{
          background-color: #4B088A;
        }
  }
}
`;

const ChatLog = styled.div`
  width: 50vw;
  height: 70vh;
  /* height: 700px; */
  /* margin: 20px; */
  max-height: 700px;
  overflow-y: auto;
  border: 2px solid purple;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 0px 20px purple;
  opacity: 0.6;
  background-color: rgba(255,255,255,0.5);
  p{
    margin: 20px;
    color: white;
    opacity: 1;
    font-weight: 400;
    font-size: 1rem;

  }
  .nameCard{
    color: red;
  }
  .messageCard{
    color: white;
    text-decoration: underline;
  }
  h3{
    margin: 5px 0px;
    font-size: 14px;
  }
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  span{
    margin-left: 10px;
  }
`;

const RenderChat = styled.div`
    .exit{
    /* position: relative;
    top: 10px;
    left: 26%; */
    height: 5vh;
    margin-left: 10px;
    background-color: #8000FF;
      /* background-color: aqua; */
    color: white;
    border: none;
    cursor: pointer;
    /* border-radius: 50%; */
    &:hover{
      background-color: #4B088A;
    }
  }
`;

const Test = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Chat = () => {
  const [state, setState] = useState({message:'', name:''});
  const [chat,setChat] = useState([]);

  const nav = useNavigate();

  useEffect(()=>{
    socket.on('message',({name,message})=>{
      setChat([...chat,{name,message}]);
    });
  },[chat]);

  const onTextChange = e => {
    setState({...state,[e.target.name] : e.target.value});
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const {name, message} =state;
    socket.emit('message',{name, message});
    setState({message : '',name});
  };


  const renderChat = () => {
    console.log(chat);
    return chat.map(({name, message},index)=>(
      <ChatMessage key={index}>
        <div><span className='nameCard'>{name} : </span><span className='messageCard'>{message}</span></div>
      </ChatMessage>
    ))
  };

  return (
    <>
<GlobalStyle/>
      <RenderChat>
        <Test>
                    {/* 채팅창 */}
                    <ChatLog> <p> 채팅창에 오신것을 환영합니다.  </p> {renderChat()}</ChatLog>
                          
                  {/* 채팅 메시지 보내기  */}
                  <Card>
                    <form onSubmit={onMessageSubmit}>
                        <input
                        className='nameInput' 
                        name ="name" 
                        onChange={e=> onTextChange(e)} 
                        value={state.name}
                        label="Name"
                        placeholder='ID'/>
                      
                        <input
                        className='messageInput'
                        name ="message" 
                        onChange={e=> onTextChange(e)} 
                        value={state.message}
                        label="message"
                        placeholder='SEND MESSAGE'/>

                        <button className='send'>보내기</button>
                        <button className='exit' onClick={() => {
                            socket.emit('disconnection', {name: state.name});
                            nav(-1);
                          }}>퇴장하기</button>
          

                    </form>
                  </Card>

        </Test>

      </RenderChat>

    <Nav/>

    </>
  );
}

export default Chat;

