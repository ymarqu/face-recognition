import React, { Component } from "react";
import './FaceRecongition.css'

class FaceRecongition extends Component{

    render(){

        let { url, boxLines, boxDisplay }  = this.props;

        if(url === ''){
            return <div></div>
        }else{
        return(
            <div style={{width: '500px', height: 'auto'}} className="container center">
                <div className="line t-line" style={{ top: boxLines.top +'%', left: boxLines.left + '%', width: boxLines.lineWidth + '%', display: boxDisplay}}></div>
                <div className="line r-line" style={{top:boxLines.top +'%', right: boxLines.right + '%', height: boxLines.lineHeight + '%', display: boxDisplay}}></div>
                <div className="line b-line" style={{bottom: boxLines.bottom + '%', left: boxLines.left + '%', width: boxLines.lineWidth + '%', display: boxDisplay}}></div>
                <div className=" line l-line" style={{left: boxLines.left + '%', top: boxLines.top + '%', height: boxLines.lineHeight + '%', display: boxDisplay}}></div>
                <img className="image-display" src={url} alt="Face" />
            </div>
        )
        }
    }
}

export default FaceRecongition;
