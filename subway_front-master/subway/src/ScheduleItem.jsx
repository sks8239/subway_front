import styled from "styled-components";

const ScheduleItemBlock = styled.div`
    display : flex;
        .contents{
            button{
                margin:0;
                line-height: 1.5;
                margin-top:0.5rem;
                white-space: normal;
            }
    }
        .upBlock{
        position : relative;
        left : 10px;
        top : calc(20% - 150px);
        }
        .downBlock{
        position : relative;
        left : 230px;
        top : calc(20% - 150px);
        }
        .Clock05 {
            background-color: red;
            // 나머지 시간대도 같은 방식으로 작성합니다.
            }
`; 

const ScheduleItem = ({schedule, trnNo})=>{
    const{tmnStinCd,stinCd,dptTm } = schedule;

    const Time = dptTm ? `Clock${dptTm.substring(0,2)}` : '';

    return(
        
       <ScheduleItemBlock>
            {dptTm && (
                    <div className= {Time} >
                    <p>{stinCd}-→{tmnStinCd} {dptTm.substring(0,2)}:{dptTm.substring(2,4)}출발</p>
                    </div>
            )}
       </ScheduleItemBlock>
    );
}
export default ScheduleItem;