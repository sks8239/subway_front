
import React from "react";
import styled from "styled-components";
import logoimage from '../img/pinLogo.png'

const LogoDesign = styled.div`
    background-color: orange;
    width: 40px;
    height: 40px;
    /* margin: 100px; */
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 30%;
        height: auto;
    }

`;

const Logo = () => {

    return(
        <LogoDesign>
            <img src={logoimage} alt="" />
        </LogoDesign>
    )
}

export default Logo;