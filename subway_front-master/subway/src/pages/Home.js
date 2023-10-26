/* eslint-disable */

import Nav2 from '../components/Nav2';
import VideoWallpaper from '../components/MainText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';


function Home() {
  return (
      <>
        <VideoWallpaper />
        {/* <Nav color='white'/> */}
        <Nav2/>
      </>
  );
}

export default Home;


