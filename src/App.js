import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons'
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/imagelinkform.js'
import Rank from './components/Rank/Rank.js';


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
  render() {
    return (
      <div className="App">
          <Particles className='particles' 
            params={particlesOptions} 
          />
       <Navigation/>
       <Logo/>
       <Rank/>
       <ImageLinkForm/>
        {
        // <FaceRecognition/>
        // <App/>
        }
      </div>
    );
  }
}

export default App;
