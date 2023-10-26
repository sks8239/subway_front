import styled from 'styled-components';
import lineColors from '../lineColor';

const Container = styled.div`
width: 500px;

height: auto;
/* background-color: orangered; */

display: flex;
justify-content: center;

    .minTime{
        width: 100%;
        /* min-height: 100%; */
        padding: 6% 0; 
        height: auto;
        border-top : 1px solid #8AC1FF;
        border-bottom : 1px solid #8AC1FF;
        /* background-color: red; */
        display: flex;
        flex-direction: row;



        .estimateTime{
            /* background-color: yellow; */
            width: 25%;
            text-align: right;
            p{
                font-size: 1.3rem;
                margin: 0;


            }
            span {
                font-weight: bold;
                font-size: 2rem;
                margin: 0;
                

            }
        }
        ul{
            height: auto;
            margin: 0;
            li{
            /* background-color: aqua; */
            margin: 0px;
            display: flex;
            flex-direction: column;
            justify-content: left;
            text-align: left;

            p{
                margin:0px;
                /* background-color: red; */
                display: flex;
                span{
                    margin-left: 10px;
                    font-size: 1rem;
                    .lineBox{
                        background-color: aqua;
                        border-radius: 15px;
                        color: white;
                        padding: 3px 10px;
                        font-size: .8rem;
                    }
                }
            }
            .listmarker{
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: white;
                border: 6px solid black;
            }
            .hrLine{
                box-sizing: border-box;
                width: 14px;
                height: 80px;
                /* border: 5px solid black; */
                border-right: 5px solid black;
                /* background-color: brown; */
            }

        }

        }
        
    }
    .minTime:hover{
        background-color: rgb(244, 248, 255);
    }
    

`;

const OpenMintransModal = ({ estimatedTime, selectedStations }) => {
    // const [clickStyle, setClickStyle] = useState();

    return (
        <Container>
            <div className='minTime'>
                <div className='estimateTime'> <p> 최소환승 <br /> <span>{estimatedTime}분 </span> </p> </div>

                {selectedStations && (
                    <ul>
                        {selectedStations.map((station, index) => {
                            if (index === 0 || index === selectedStations.length - 1 || selectedStations[index].hasTransfer === 1) {
                                const lineColor = lineColors[station.line];
                                let nextStation2 = null;

                                if (selectedStations[index].hasTransfer === 1 && index < selectedStations.length - 1 && station.station === selectedStations[index + 1].station) {
                                    nextStation2 = selectedStations[index + 1];
                                }

                                return (
                                    <li key={index} style={{ borderColor: lineColor }}>
                                        <p>
                                            <div className="listmarker" style={{ borderColor: lineColor }} />
                                            <span>
                                                <span style={{ fontWeight: 'bold' }}>  {station.time}  </span>
                                                <span className='lineBox' style={{ backgroundColor: lineColor }}> {station.line} </span>
                                                &nbsp; {nextStation2 ? nextStation2.station : station.station}
                                            </span>
                                        </p>

                                        {/* 마지막 요소의 라인 삭제 */}
                                        {index !== selectedStations.length - 1 && <div className='hrLine' style={{ borderColor: lineColor }}>
                                            <span style={{ marginLeft: '550%', color: '#8AC1FF', fontSize: '1.4rem' }}> &darr; </span>
                                        </div>}
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                )}

            </div>

        </Container>
    );
};

export default OpenMintransModal;