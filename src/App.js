import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons'
import Navigation from './components/Navigation/Navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/imagelinkform.js'
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
      imageURL: ''
    }
  }

  OnInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  OnSubmit = (event) => {
      this.setState({imageURL: this.state.input})
    //console.log(event.target.value);
          app.models.predict(Clarifai.FACE_DETECT_MODEL, 
              this.state.input)
          .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          console.error(err);
        }
      );
  }

  render() {
    return (
      <div className="App">
          <Particles className='particles' 
            params={particlesOptions} 
          />
       <Navigation/>
       <Logo/>
       <Rank/>
       <ImageLinkForm OnInputChange={this.OnInputChange} OnSubmit={this.OnSubmit}/>
        <FaceRecognition imageURL={this.state.input}/>
      </div>
    );
  }
}

export default App;
