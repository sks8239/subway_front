/* eslint-disable */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoimage from '../img/pinLogo.png'

const LogoDesign = styled.div`
    cursor: pointer;
    position: absolute;
    left: 1.5vw;
    background-color: orange;
    width: 35px;
    height: 35px;
    /* margin: 100px; */
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 40%;
        height: auto;
    }

`;

const Navigation = styled.div`
    width: 100vw;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    color: ${props => props.color || "white"} ;
    z-index: 2;
    box-sizing: border-box;
    background-color: #333;






    .Menu {
        // Nav2와 위치 맞춤  -오른쪽 위쪽 맞춤
        position: relative;
        top: 1vh;
        right: 2vw;
        
        display: flex;
        /* width: 18vw; */
        /* align-items: center; */
        ul{
            display: flex;
            /* justify-content: flex-end; */
            align-items: center;
            justify-content: center;
                li{
                display: flex;
                text-align: center;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                font-weight: bold;
                /* width: 100px; */
                padding: 0px;
                margin-right: 25px;
                cursor: pointer;
                transition: all .3s;

                height: 1rem;
                /* border-radius: 5px; */
                border-bottom: 3px solid rgb(255, 162, 0, 0);

                &:hover {
                    border-bottom: 3px solid rgb(255, 162, 0, 1);
                    color: #D8D8D8;
                    /* font-weight: bold; */
                    /* background-color: black;
                    color: white; */
                    /*  */
                }
            }
            }
        }

    `;






const Nav = (props) => {
    const [isHover, setisHover] = useState(false);
    const handleMouseOver = () => {
        setisHover(true)
    }
    const handleMouseOut = () => {
        setisHover(false)
    }
    
    const navigate = useNavigate();
    return(
        <>

        <Navigation color={props.color}>
        <LogoDesign onClick={()=>navigate("/")}>
            <img src={logoimage} alt="" />
        </LogoDesign>
            {/* <img src={logo}  /> */}
            {/* <div className="HomeBtn" onClick={()=>navigate("/")}></div> */}
            <div className="Menu" style={{zIndex:1}}>
                <ul>

                    <li onClick={()=>navigate("/about")} >
                        <p>About</p></li>
                    <li  onClick={()=>navigate("/SubwayMap")}>
                        <p>Subway</p></li>
                    <li onClick={()=>navigate("/Chat")} >
                        <p>Chat</p></li>
                    <li onClick={()=>navigate("/KakaoMap")} >
                        <p>따릉이</p></li>
                </ul>
            </div>
        </Navigation>
        </>
    );
}

export default Nav;
