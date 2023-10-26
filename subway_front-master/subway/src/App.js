import {Fragment} from 'react';
import './App.css';
import SubwayMap from './SubwayMap';
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat"

import KakaoMap from "./pages/Kakao";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  return (
  <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/SubwayMap" element={<SubwayMap/>}/>
          <Route path="/Chat" element={<Chat/>}/>
          <Route path="/KakaoMap" element={<KakaoMap/>}/>
        </Routes>
        {/* <Nav/> */}

      </Router>

  </>
  );
};

export default App;
