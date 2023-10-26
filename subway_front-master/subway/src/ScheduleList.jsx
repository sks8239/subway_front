import styled from "styled-components";
import { useState,useEffect } from "react";
import axios from "axios";
import stations from './stations';

const ScheduleListBlock = styled.div`
    display: flex;
    box-sizing: border-box;
    padding-bottom: 3em;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    
    @media screen and(max-width:768px){
        width: 100%;
        padding-left: 1em;
        padding-right: 1em;
    } 

    .Loading{
      /* background-color: aqua; */
      width: 165%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`;


const ScheduleTable = styled.table`
  text-align: center;
  margin-left: 0px;
  border-collapse: collapse;
  width: 100%;
    th{
      background-color: #D8D8D8;
      color: black;
      height: 30px;
      border: 1px solid #dddddd;
      padding: 8px;
    }
    td{
      border: 1px solid #dddddd;
      text-align: center;
      padding: 8px;
      font-size: 1rem;
      text-align: left;
      vertical-align: top;
      p{
        margin-top: 10px;
      }
    }
    th:nth-child(2){
      width: 40px;
    }
    tr:nth-child(even){
      background-color: #eaeaec;
    }
    .textBold{
      text-align: center;
      font-weight: bold;
    }
`;




const ScheduleList = ({ ID }) => {
    const[schedules,setSchedules] = useState(null);
    const[loading,setLoading] = useState(false);
    // console.log(ID);
    useEffect(()=>{
      setSchedules(null);
        const fetchData = async() =>{
            setLoading(true);
            try{
                const response = await axios.get(`http://subwaymap.ddns.net:30/timetable/?id=${ID}`) 
                  // console.log(response.data);  
                  setSchedules(response.data);
                  console.log(ID);
            } catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    },[ID])
    if(loading){
        return <ScheduleListBlock>
          <div className="Loading">로딩 중....</div>
        </ScheduleListBlock>
    }
    if(!schedules) return null;



    const timeTables = {
      "00": [],
      "05": [],
      "06": [],
      "07": [],
      "08": [],
      "09": [],
      "10": [],
      "11": [],
      "12": [],
      "13": [],
      "14": [],
      "15": [],
      "16": [],
      "17": [],
      "18": [],
      "19": [],
      "20": [],
      "21": [],
      "22": [],
      "23": [],
    };
  
    schedules.forEach((schedule) => {
      if (schedule.dptTm === null || typeof schedule.dptTm !== 'string') {
        schedule.dptTm = '9999'; // 예시로 99시 99분 처리
      }else{
      const time = schedule.dptTm.substring(0, 2);
      if (timeTables[time]) {
        timeTables[time].push(schedule);
      }
      }
    });

    
    return (
      <ScheduleListBlock>
        <ScheduleTable>
          <thead>
            <tr>
              <th>상행</th>
              <th>시간</th>
              <th>하행</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(timeTables)
              .filter((time) =>  parseInt(time) >= 5) // 05시 이후인 경우만 필터링
              .sort()
              .concat(Object.keys(timeTables).filter((time) => parseInt(time) < 5)) // 05시 이전인 경우 붙이기
              .map((time) => {
              const filteredSchedules = timeTables[time];
              return (
                <tr key={time}>
                  
                  <td>
                    {filteredSchedules
                      .filter((schedule) => {
                        const UpTrain =
                          parseInt(schedule.trnNo.substring(3)) % 2 === 1;
                        return UpTrain;
                      })
                      .map((schedule) => {
                        const { dptTm, tmnStinCd } = schedule;
                        const [hours, minutes] = [
                          dptTm.substring(0, 2),
                          dptTm.substring(2, 4),
                        ];
                        return (
                          <p key={`${tmnStinCd}-${dptTm}`}>
                                {`${stations.map((line) =>
                                line.stations.find((s) => s.STIN_CD === tmnStinCd)?.name
                              ).join('')}행 ${hours}:${minutes}`}
                          </p>
                        );
                      })}
                  </td>
                  <td style={{ verticalAlign: 'middle' }}><p className="textBold">{time}시</p></td>
                  <td>
                    {filteredSchedules
                      .filter((schedule) => {
                        const UpTrain =
                          parseInt(schedule.trnNo.substring(3)) % 2 === 0;
                        return !UpTrain;
                      })
                      .map((schedule) => {
                        const { dptTm, tmnStinCd } = schedule;
                        const [hours, minutes] = [
                          dptTm.substring(0, 2),
                          dptTm.substring(2, 4),
                        ];
                        return (
                          <p key={`${tmnStinCd}-${dptTm}`}>
                              {`${stations.map((line) =>
                                line.stations.find((s) => s.STIN_CD === tmnStinCd)?.name
                              ).join('')}행 ${hours}:${minutes}`}
                          </p>
                        );
                      })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ScheduleTable>
      </ScheduleListBlock>
    );
  };
  
  export default ScheduleList;