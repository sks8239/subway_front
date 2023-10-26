import {useState} from 'react';


const useStates = () => {

    const [selectedStation, setSelectedStation] = useState(null);
    const [open, setOpen] = useState(false);
    const [stationInfo, setStationInfo] = useState({});

    const [isClosing, setIsClosing] = useState(false);
    const [startStation, setStartStation] = useState(null);
    const [endStation, setEndStation] = useState(null);

    const [openInfo, setOpenInfo] = useState(false);
    const [hoveredStation, setHoveredStation] = useState(null);
    const [hoveredStationPosition, setHoveredStationPosition] = useState({left: 0, top: 0});
    
    const [startMarker, setStartMarker] = useState(null);
    const [endMarker, setEndMarker] = useState(null);

    const [blur, setBlur] = useState(false);
// 
    const [buttonText, setButtonText] = useState("\u27E9"); // modal 여닫힘 시, 버튼 변경

    return{
        open, setOpen,
        openInfo, setOpenInfo,
        hoveredStation, setHoveredStation,
        hoveredStationPosition, setHoveredStationPosition,
        selectedStation, setSelectedStation,
        stationInfo, setStationInfo,
        isClosing, setIsClosing,
        startStation, setStartStation,
        endStation, setEndStation,
        startMarker, setStartMarker,
        endMarker, setEndMarker,
        blur, setBlur,
        // 
        buttonText, setButtonText,
    };
}

export default useStates;