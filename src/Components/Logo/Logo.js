import React, { Component } from "react";
import Tilt from 'react-parallax-tilt';
import person from './female-logo.png'
import './Logo.css'

class Logo extends Component{

    render(){
        return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" style={{width: '100px'}} tiltMaxAngleX={50} tiltMaxAngleY={50} glareEnable={true}>
                <div style={{ height: '100px', width: '100px' }}>
                    <img src={person} alt="person logo"/>
                </div>
            </Tilt>
        </div>
        )
    }
}

export default Logo;
