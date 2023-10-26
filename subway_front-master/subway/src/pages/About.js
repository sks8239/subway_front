// eslint-disable-next-line
import React from "react";
import Nav from "../components/Nav";
import styled from "styled-components";

const Introduce = styled.div`
    height: 100vh;
    background-color: white;
    color: black;
    margin: 0;
    padding :80px ;
    h1{
        padding: 0;
        margin: 0;
    }
`;

const About = () => {
    return (
        <div>

            <Introduce >
                <div className="hello">
                    <h1>안녕하세요</h1>
                    <p> About Page입니다. </p>
                </div>
            </Introduce>
            <Nav/>
        </div>

    )
}
export default About;

