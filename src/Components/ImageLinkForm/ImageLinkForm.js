import React, { Component } from "react";
import '../../App.css';
import './ImageLinkForm.css';

class ImageLinkForm extends Component{

    render(){

        const { onInputChange, onSubmit} = this.props;

        return(
            <div>
                <p className="f3">
                    {'This Magic Brain will detect faces in your pictures. Give it a try'}
                </p>
                <div className="center">
                    <div className="form center pa4 br3 shadow-5">
                    <input onChange={onInputChange} className="f4 pa2 w-70 center" type="text" />
                    <button onClick={onSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageLinkForm;
