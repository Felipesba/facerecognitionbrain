import React, { Component } from 'react';
import './App.css';
import 'tachyons'
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/imagelinkform.js'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Navigation/>
       <Logo/>
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
