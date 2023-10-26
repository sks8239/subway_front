import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainVideo from "./MainVideo";

const Container =styled.div`
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

// Styled components
const TextBox = styled.div`
  /* width: 500px; */
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1rem;
  color: white;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-direction: column; */

  .smallP{
    font-size: 1rem;
    font-weight: 300; 
    display: block;
    text-align: center;
  }
  
  .bigP{
    display: block;
    padding: 0;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 4rem;
    text-align: center;
  }
  .btnBox{
    display: flex;
    flex-direction: row;
    
    .btn{
    background: none;
    color: white;
    font-weight: 600;
    margin: 20px 20px ;
    width: 140px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid white;
    border-radius: 30px;
    font-size: .8rem;
    cursor: pointer;

    &:hover {
      background: white;
      color: black;

    }
  }
}
`;



function VideoWallpaper() {

  const navigate = useNavigate();

  return (
    <Container>
          <MainVideo/>
          <TextBox>
            <div className="smallP"><p>I'm Finding My way</p>
            </div>
            <div className="bigP">
              ㅊㄱ<br />
              안녕하세요
            </div>
            <div className="btnBox">
              <div className="btn" onClick={()=>navigate("/subwayMap")} > Serach</div>
              <div className="btn" onClick={()=>navigate("/Chat")} > Chat</div>
              {/* <div className="btn" onClick={() => {
                isClicked();
                scroll.scrollMore(100 * window.innerHeight / 100, { smooth: true, duration: 500 });
              }}>
                See More
              </div>   */}
            </div>
          </TextBox>
        {/* <Nav color="white"/> */}

          {/* {modal && <About />}  */}
          {/* modal 값이 true일 때만 Abouts 컴포넌트 렌더링 */}
    </Container>
  );

}

export default VideoWallpaper;
