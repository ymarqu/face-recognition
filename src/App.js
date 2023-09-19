import React, { Component } from 'react';
import './App.css';
import Navagation from './Components/Navagation/Navagation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecongition from './Components/FaceRecongition/FaceRecongition';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Camera from './Components/Camera/camera';

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      borderBox: {},
      display: 'none',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      },
      imageUrl: "",
      webcamRef: React.createRef(),
      imgSrc: null
    }
  };
   base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
  }
loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
 capture =  (e) => {
    const imageSrc = this.state.webcamRef.current.getScreenshot();
    console.log(imageSrc)
    // let hope = this.base64ToBytes(imageSrc);
    // console.log(hope)
    // console.log(atob(imageSrc))
    console.log(e);
    // const imageSrc = 'https://www.ripponmedicalservices.co.uk/images/easyblog_articles/89/b2ap3_large_ee72093c-3c01-433a-8d25-701cca06c975.jpg'

    this.setState({imgSrc: imageSrc})
  };


  setImageUrl = (e) => {
    this.setState.imageURL = e.target.value
  }
  onInputChange = (e) => {
    this.setState({display: 'none'})
    this.setState({input: e.target.value})
  }

  onSubmit = () => {
    this.getImageRec(this.state.imgSrc);
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
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
const PAT = 'bcdc043094b24ecb8b3abce9e6733722';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
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
        if(result){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        console.log(result)
      // this.getBoxCoordinates(result.outputs[0].data.regions[0].region_info.bounding_box)
    })
    .catch(error => console.log('error', error));
}

componentDidMount(){
  fetch('http://localhost:3000')
  .then(res => res.json())
}

  render(){



  return (
    <div className="App">
    <ParticlesBg type="cobweb" bg={true} />
     <Navagation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
     <Logo />
     {this.state.route === 'home' ?
     <div>
     <Rank name={this.state.user.name} rank={this.state.user.entries} />
     <Camera getImageUrl={this.state.imageUrl} capture={this.capture} webcamRef={this.state.webcamRef} imgSrc={this.state.imgSrc}/>
     <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
     <FaceRecongition url={this.state.input} boxLines={this.state.borderBox} boxDisplay={this.state.display}/>
    </div>
    :
    this.state.route === 'signin' ?
    <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
     }
    </div>
   );
  }
}
export default App;
