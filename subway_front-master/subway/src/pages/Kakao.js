import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

const { kakao } = window;
const mapStyle = {
  width: '100vw',
  height: '100vh',
  zIndex: 11999,
  position: 'fixed',
  top: '8vh'
  // top: 0
};

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
    return function () {
    infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
    return function () {
    infowindow.close();
    };
}

const KakaoMap = () => {
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(
          "http://openapi.seoul.go.kr:8088/6a664d4c486d696c353144645a5a59/json/bikeList/2/998/",
        );
        setData(response.data.rentBikeStatus);
        console.log(response.data.rentBikeStatus)
        console.log("upload 완료")
      } catch (e) {
        console.log(e);
      }
      // setLoading(false);
    };
    fetchData();
  },[]);

  
  useEffect(() => {
        
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.531837141995744, 126.97243966282926),
      level: 5,

    };

    //map
    const map = new kakao.maps.Map(container, options);
    
    if (data && data.row) {
      data.row.forEach((el) => {
        let iwContents = 
        `<div style="padding-left : 3px;">
          <div >
            ${el.stationName.substr(4, el.stationName.length)} 
            <br/>
            남은 대수 : <span style="background-color:yellow; width: 40px;">${el.parkingBikeTotCnt}대 </span> 
            </div>
          </div>`;
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          //마커가 표시 될 지도
          map: map,
          //마커가 표시 될 위치
          position: new kakao.maps.LatLng(el.stationLatitude, el.stationLongitude),
        });

        // 마커에 표시할 인포윈도우를 생성합니다
        let infowindow = new kakao.maps.InfoWindow({
          content: iwContents  // 인포윈도우에 표시할 내용

        });
    
        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
        
      });
    }

  }, [data]);

  return(
    <>

      <div>

        <div style={mapStyle} id="map" />
      </div>
        <Nav/>

    </>
  );
}

export default KakaoMap;