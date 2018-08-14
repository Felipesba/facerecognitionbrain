import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons'
import Navigation from './components/Navigation/Navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/imagelinkform.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import Rank from './components/Rank/Rank.js';
import Clarifai  from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'ded6164b7fcc43f3964b287c80f54311'
});

const particlesOptions = {
   particles: {
             number: {
                value: 30,
                density: {
                  enable: true,
                  value_area: 100
                  }
              }  
           }
         }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'SignIn',
    }
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  //console.log(width,height);
    return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height)
   }
}

displayFaceBox = (box) => {
  console.log(box);
    this.setState({box: box});
}


  OnInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  OnSubmit = (event) => {
      this.setState({imageURL: this.state.input})
    //console.log(event.target.value);
          app.models
          .predict(Clarifai.FACE_DETECT_MODEL, 
              this.state.input)
          //.then(response => this.calculateFaceLocation(response))
          .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          .catch(err => console.log(err));
        };


  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
          <Particles className='particles' 
            params={particlesOptions} 
          />
       <Navigation onRouteChange={this.onRouteChange} />
       {
        this.state.route === 'home' 
          ? <div> 
              <Logo/>
              <Rank/>
              <ImageLinkForm OnInputChange={this.OnInputChange} OnSubmit={this.OnSubmit}/>
              <FaceRecognition box={this.state.box} imageURL={this.state.input}/>
            </div> 
          : ( this.state.route === 'SignIn'
                ? <SignIn onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            )  
        } 
      </div>
    );
  }
}

export default App;
