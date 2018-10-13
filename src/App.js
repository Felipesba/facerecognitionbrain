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
// import Clarifai  from 'clarifai';

// const app = new Clarifai.App({
//  apiKey: 'ded6164b7fcc43f3964b287c80f54311'
// });

const particlesOptions = {
   particles: {
             number: {
                value: 10,
                density: {
                  enable: true,
                  value_area: 200
                  }
              }  
           }
         }

const initialState = {
      input: '',
      imageURL: '',
      box: {},
      route: 'SignIn',
      isSignIn: false,
      users: 
          {
            id: '',
            name: '',
            email: '',
            password: '',
            entries: 0 ,
            joined: ''
          }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({users: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
      }
    }) 
  }

//Codigo para testar o servidor 
// componentDidMount() { 
//   fetch('http://localhost:3000/')
//     .then(response => response.json())
//     .then(console.log)
// }

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
          // app.models
          // .predict(Clarifai.FACE_DETECT_MODEL, 
          //     this.state.input)

      fetch('https://shielded-bastion-82878.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},        
            body: JSON.stringify({
            input: this.state.input
            })
      })       
          
        .then(response => response.json())

        .then(response => { 
            if (response) {
              fetch('https://shielded-bastion-82878.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},        
                body: JSON.stringify({
                    id: this.state.users.id
                })
              })
                .then(response => response.json())
                .then(count => {
                  this.setState(Object.assign(this.state.users, {entries: count}))
                })
            }
              this.displayFaceBox(this.calculateFaceLocation(response))
        })
          .catch(err => console.log(err))
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
        this.setState(initialState)
    } else if (route === 'home')
      { 
      this.setState({isSignIn: true})
      }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
          <Particles className='particles' 
            params={particlesOptions} 
          />
       <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange} />
       {
        this.state.route === 'home' 
          ? <div> 
              <Logo/>
              <Rank name={this.state.users.name} entries={this.state.users.entries}/>
              <ImageLinkForm OnInputChange={this.OnInputChange} OnSubmit={this.OnSubmit}/>
              <FaceRecognition box={this.state.box} imageURL={this.state.input}/>
            </div> 
          : ( this.state.route === 'SignIn'
                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )  
        } 
      </div>
    );
  }
}

export default App;
