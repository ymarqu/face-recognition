import React, { Component } from 'react';
import './App.css';
import Navagation from './Components/Navagation/Navagation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecongition from './Components/FaceRecongition/FaceRecongition';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      borderBox: {},
      display: 'none'
    }
  };

  onInputChange = (e) => {
    this.setState({display: 'none'})
    this.setState({input: e.target.value})
  }

  onSubmit = () => {
    this.getImageRec(this.state.input);
  }

  getBoxCoordinates = (data) => {

    let { top_row, left_col, right_col, bottom_row } = data;

    let right = 100 - (right_col * 100);
    let top = top_row * 100;
    let left = left_col * 100;
    let bottom = 100 - (bottom_row  * 100);
    let lineHeight = (bottom_row - top_row) * 100;
    let lineWidth = (right_col - left_col) * 100;


    let dataObj = {right, top, left, bottom, lineHeight, lineWidth};
    this.setState({borderBox: dataObj});
    this.setState({display: 'block'})

  }


getImageRec = (imageURL) => {
const PAT = '';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '';
const IMAGE_URL = imageURL;

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {
      this.getBoxCoordinates(result.outputs[0].data.regions[0].region_info.bounding_box)
    })
    .catch(error => console.log('error', error));
}

  render(){



  return (
    <div className="App">
    <ParticlesBg type="cobweb" bg={true} />
     <Navagation />
     <Logo />
     <Rank />
     <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
       <FaceRecongition url={this.state.input} boxLines={this.state.borderBox} boxDisplay={this.state.display}/>
    </div>
   );
  }
}
export default App;
