import styled from 'styled-components';
import ScheduleList from '../ScheduleList';
import lineColors from '../lineColor';
import stations from '../stations';


const StickyBlock = styled.div`
    height: 1400vh;
    .stickyItem{
        position: sticky;
        top: 0;
        background-color: white;
        justify-content: center;

        .menuBoard{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            // width: 100%;
            width: 800px;
            // background-color: blue;
            
        }
        .nextStation{
            width: 50%;
            padding: 0;
            height: auto;
            /* background-color: aqua;  */
            display: flex;
            justify-content: space-between;
            p{
                padding: 0;
                margin: 0;
            }
        }
    }`;
const NameBoard = styled.div`
    width: 60%;
    margin: 2% 0;
    .nameTag{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #D8D8D8;
        color: black;
        width: 25%;
        height: 40px;
        margin-left: 5%;
        margin-top: 3%;
        border-radius: 50px;
        font-size: .8rem
    }
            
`;


const StationBoard = styled.div`
    width: 60%;
    /* background-color: orange;  */
    display: flex;
    .boardLine{
        width: 10%;
        margin: auto;
        hr{
            border: 3px solid black;
        }
    }
    .circle{
        width: 14px;
        height: 10px;
        border: 5px solid black;
        border-radius: 100%;
        margin: auto;
        background-color: white;
    }
    .stationBoardName{
        border: 15px solid black;
        border-radius: 50px;
        width: 70%;
        background-color: white;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 1rem
    }`;

const TransferBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:row;
  // width: 100%;
  width: 800px;
  .transferIcon{
        width: 60px;
        height: 60px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin : 10px 15px 0px 15px;
        font-size: .7rem;
        color: white;
        cursor: pointer;
    }`;

const StuckTimetable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // width: 100%;
  width: 800px;
  /* height: 15%; */
  /* margin-top: %; */
  // background-color: blue;
    .gredient{
        width: 96%;
    height: 80px;
    position: absolute;
    top: 100%;
    background-image: linear-gradient(0deg, rgba(255,255,255,0), rgba(255,255,255,1));
}
`;
const Test2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
     width: 100%;
    /* width: 800px; */
    /* background-color: blue; */
    padding: 0;
`;



const OpenInfoModal = ({ handleModalClose, stationInfo, isClosing, hoverClick }) => {
  const { name, transfer, line } = stationInfo;
  const stationIds = stations
  .filter((line) => line.stations.some((s) => s.name === name))
  .map((line) => line.stations.find((s) => s.name === name)?.ID);

  //아아디 값만 가져오기
  const getId = stations.filter((e) => e.line === line)
  .map(line => line.stations.find(s => s.name === name)?.ID);

    const stationId = stationIds.find(e=>e === getId[0]);


    //해당역의 전역과 다음역 가져오기
    const filteredStations = stations
    .filter((s) => s.line === line);

    const names = filteredStations
    .flatMap((line) => line.stations)
    .map((s) => s.name);
    
    const index = filteredStations
    .flatMap((line) => line.stations)
    .findIndex((s) => s.name === name);
    
      const prevName = names[index - 1];
      const nextName = names[index + 1];

  return (

    <div className={`modal ${isClosing ? 'hidden' : ''} `}>

          <div className="content" onClick={(e) => e.stopPropagation()}>

              <div>

              <button className="close-btn2" onClick={()=>{handleModalClose() }}>{isClosing? "\u27E9":"\u27E8"} </button>

                <StickyBlock>

                    <div className="stickyItem">

                        <div className="menuBoard" >

                            <NameBoard><span className='nameTag'> 역정보 </span></NameBoard>
                            {/* 정류장 보드판 */}

                            <StationBoard>
                                <div className='boardLine' ><hr style={{borderColor: lineColors[line]}}/></div>
                                <div className='circle' style={{borderColor: lineColors[stationInfo.line]}}/>
                                <div className='boardLine'><hr style={{borderColor: lineColors[stationInfo.line]}}/></div>
                                <div className='stationBoardName' style={{borderColor: lineColors[stationInfo.line]}}>
                                   
                                   <p>{name}</p>
                                
                                </div> 
                                <div className='boardLine' ><hr style={{borderColor: lineColors[stationInfo.line]}}/></div>
                                <div className='circle' style={{borderColor: lineColors[stationInfo.line]}}/>
                                <div className='boardLine'>
                                   
                                    <hr style={{borderColor: lineColors[stationInfo.line]}}/>
                                
                                </div>
                           
                            {/* 정류장 보드판 */}
                           
                            </StationBoard>
                            
                            <div className="nextStation">
                                <p>{prevName}</p> {/* 이전역 */}
                                <p>{nextName}</p> {/* 다음역 */}
                            </div>
                       
                        </div>

                        <div>
                        {
                            transfer && (
                                <TransferBlock >
                                    {transfer.map((transferStation, index) => (
                                        <div key={index} 
                                        className='transferIcon' style={{backgroundColor: lineColors[transferStation]}}
                                        onClick={()=>{ hoverClick(stationInfo.name, transferStation, stationInfo.left, stationInfo.top, stationId)}}>
                                            {transferStation}
                                        </div>
                                    ))}
                                </TransferBlock>
                            )
                        }
                        </div>

                        <StuckTimetable>
                            <NameBoard style={{borderTop :'1px solid #77797b'}}><span className='nameTag'> 시간표 </span></NameBoard>
                            <div className="gredient"/>
                        </StuckTimetable>
                    {/* sticky 적용받는 구역 */}
                    </div>
                    
                    <Test2>
                        <div style={{display:'flex', width:'60%'}}>
                            <ScheduleList stationName={stationInfo.name} ID={stationId} /> 
                        </div>
                    </Test2>
                    
                </StickyBlock>
              </div>
          </div>
      </div>

  );
};

export default OpenInfoModal;
