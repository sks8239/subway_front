import { useState , useEffect} from 'react';

import './SubwayMap.css';

import StartMarkerImg from './img/pin.png';
import EndMarkerImg from './img/pin.png';

import stations from './stations';

import useStates from './useStates';
import SearchBar from './SearchBar/SearchBar';


import fetchPathData from './Api/ApiFetch';

import OpenMintimeModal from './Modal/OpenMintimeModal';
import OpenMintransModal from './Modal/OpenMintransModal';
import OpenInfoModal from './Modal/OpenInfoModal';

import Nav2 from './components/Nav2';

import Map from './Map';
import { PanZoom } from 'react-easy-panzoom';



function SubwayMap() {

  
// useState들의 집합
  const { 
    open, setOpen,
    openInfo, setOpenInfo,
    startMarker, setStartMarker,
    endMarker, setEndMarker,
    hoveredStation, setHoveredStation,
    hoveredStationPosition, setHoveredStationPosition,
    selectedStation, setSelectedStation,
    stationInfo, setStationInfo,
    isClosing, setIsClosing,
    startStation, setStartStation,
    endStation, setEndStation,
    blur, setBlur,
  } = useStates();


  const [estimatedTime, setEstimatedTime] = useState(); //최소환승 예상시간
  const [estimatedTime2, setEstimatedTime2] = useState(); //최소시간 예상시간
  const[currentTime,setCurrentTime] = useState(); // 현재시간
  const [selectedStations, setSelectedStations] = useState([]); //최소환승
  const [selectedStations2, setSelectedStations2] = useState([]); //최소시간
  
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomChange = (event) => {
    const newZoomLevel = event.getTransform().scale;
    setZoomLevel(newZoomLevel);
  };

  const calculateSizeW = () => {
    const baseSize = 7; // 기본 크기 (단위: px)
    const zoomedSize = baseSize / zoomLevel; // 줌 레벨에 따른 크기 계산
    return `${zoomedSize}vw`; // 스타일 값 형식에 맞게 반환
  };


  const calculateSizeH = () => {
    const baseSize = 1; // 기본 크기 (단위: px)
    const zoomedSize = baseSize / zoomLevel; // 줌 레벨에 따른 크기 계산
    return `${zoomedSize}vw`; // 스타일 값 형식에 맞게 반환
  };

  //////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (startStation && endStation) {
      setSelectedStations([]);
      fetchPathData(startStation, endStation)
        .then((pathData) => {
            setCurrentTime(pathData.currentTime);
            setEstimatedTime(pathData.estimatedTime);
            setEstimatedTime2(pathData.estimatedTime2);
            setSelectedStations(pathData.selectedStations);
            setSelectedStations2(pathData.selectedStations2);
        })
            .catch((error) => console.error(error));
      }
    }, [startStation, endStation]);
    let timerId;

function handleStationHover(stationName, left, top) {
  clearTimeout(timerId); // 현재 실행중인 setTimeout 취소
  setHoveredStation(stationName);
  setHoveredStationPosition({ left: left-25, top:top-40, zIndex : 999});
  console.log(hoveredStationPosition);
}



function handleStationHoverOut(){
  timerId = setTimeout(() => {
    setHoveredStation(null);
  }, 2000); // 3초 후에 역 이름이 사라집니다.
}

const hoverClick = (stationName,lineName, left, top) => {
    setOpenInfo(true);
    setOpen(false);
    setIsClosing(false);
    setSelectedStation(stationName); 
    
    const transferLines = stations
    .filter((line) => line.stations.some((s) => s.name === stationName))
    .map((line) => line.line);

    const info = {
      name: stationName,
      line: lineName,
      transfer: transferLines,
    };

    setStationInfo(info);
    
  };



  const handleStationClick = (stationName, lineName, left, top) => {
    if (!startMarker) {
      setStartMarker({ stationName, lineName, left, top });
      setStartStation(stationName);
    }else if (!endMarker) {
      setEndMarker({ stationName, lineName, left, top });
      setEndStation(stationName);
      setOpen(true);
      setOpenInfo(false);
      setIsClosing(false);
      setBlur(true);
    }
    setSelectedStation(stationName);
    const transferLines = stations
      .filter((line) => line.stations.some((s) => s.name === stationName))
      .map((line) => line.line);

    const info = {
      name: stationName,
      line: lineName,
      transfer: transferLines,
    };

    setStationInfo(info);
  };

// 모달의 x버튼을 클릭 시 모달창 off
    const handleModalClose = () => {
      console.log(isClosing);
      if(!isClosing){
        setIsClosing(true);
        setStartMarker(null);
        setEndMarker(null);
        setBlur(false);


      }
     else{
      setIsClosing(false);

      if(open){
        setOpenInfo(false);

      }
      
     }
    }

    // 출발마커
    const drawStartMarker = startMarker !== null ? (
      <img 
      src={StartMarkerImg} 
      alt="start marker" 
      style={{
        width: '35px',  // 너비를 기준으로 크기를 조정
        height: 'auto', // 높이는 자동으로 조정
        position: 'absolute', 
        left: `${startMarker.left+6}px`, 
        top: `${startMarker.top+3}px`, 
        transform: 'translate(-50%, -100%)', 
        zIndex: 100
          // 이미지의 비율을 유지하도록 함
      }} 
    />
    ) : null;
    
    // 도착마커
    const drawEndMarker = endMarker ? (
      <img src={EndMarkerImg} alt="end marker" style={{
         width : '35px',
         height : 'auto',
         position: 'absolute', 
         left: `${endMarker.left+4}px`,
          top: `${endMarker.top-3}px`, 
          transform: 'translate(-50%, -90%)', 
          zIndex: 100 }} />
    ) : null;
      

  return (
    <div style={{backgroundColor:'black', backgroundSize:'cover', overflow:'hidden'}}>
 <PanZoom 
        onZoomChange={handleZoomChange}
        boundaryRatioVertical={0.9}
        boundaryRatioHorizontal={0.9}
        maxZoom={3}
        minZoom={0.5}
        enableDoubleClickZoom={false}
        enableMouseWheelZoom={true}
      >
      
{/* 마커 */}
    {drawStartMarker}
    {drawEndMarker}




{/* 노선도 이미지 */}
<Map/>


{/* 역버튼 클릭시, */}
      {stations.map((line) => (
        <div key={line.line}>
          <div className= {blur ? "blur" : "line-stations"}>
            {line.stations.map((station) => (
              <div
                key={station.ID}
                className={`station ${station.size} ${
                  selectedStation === station.ID ? 'selected' : ''
                }`}
                style={{ left: station.left, top: station.top }}
                onClick={() => handleStationClick(station.name, line.line, station.left, station.top)}
                onMouseOver={() => handleStationHover(station.name, station.left, station.top)}
                onMouseOut={() => handleStationHoverOut()}
              ></div>
            ))}
          </div>
        </div>
      ))}
      
{/* 역버튼 hover*/}
{hoveredStation && 
          stations.map((line) => (
        <div key={line.line}>
          <div className="line-stations">
            {line.stations.map((station) => (
              station.name === hoveredStation && (
                <div
                  key={station.ID}
                  className="station-label"
                  style={{ ...hoveredStationPosition, position: 'fixed',width: calculateSizeW(),height: calculateSizeH()}}
                  onClick={() => hoverClick(station.name, line.line, station.left, station.top)}
                >
                  <div className="content" onClick={(e) => e.stopPropagation()}></div>
                  {hoveredStation}
                </div>
              )
            ))}
          </div>
        </div>
      ))
}

</PanZoom>



{/* 출발지 목적지 둘 다 입력시 */}
{open &&  
          <div className={`modal ${isClosing ? 'hidden' : ''} `}>
            <div className="content" onClick={(e) => e.stopPropagation()}> {/*modal까지 클릭 이벤트가 버블링되는 걸 막기 위한 코드*/}
              <div className='currentTime'>
                <p>현재시간 : {currentTime} </p>     
                <button className="close-btn2" onClick={handleModalClose}> {isClosing? "\u27E9":"\u27E8"}</button>
                <div>
                <SearchBar 
                setStartMarker = {setStartMarker}
                setEndMarker={setEndMarker}

                startStation = {startStation}
                setStartStation={setStartStation}

                endStation={endStation}
                setEndStation={setEndStation}
                />
                </div>
                <OpenMintimeModal
                    estimatedTime2 = {estimatedTime2}
                    selectedStations2={selectedStations2}
                />
                <OpenMintransModal
                          estimatedTime={estimatedTime}
                          selectedStations={selectedStations}
                        />
              </div>
            </div>
          </div>
}

  {/* 역 시간표 정보 */}
      {openInfo && (
        <div style={{position: 'relative'}}>
          
          <OpenInfoModal
            handleModalClose={handleModalClose}
            stationInfo={stationInfo}
            isClosing={isClosing}
            hoverClick={hoverClick}
          />
          
          </div>
        )}
        <Nav2/>
 </div>

  );
}

export default SubwayMap;