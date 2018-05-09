import React, { Component } from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';


const particlesOption={
   particles: {
     number: {
    value: 156,
    density: {
      enable: true,
      value_area: 800
    }
   }
  }
}

const initialState ={
  input:'',
  imageUrl:'',
  box:[],
  route: 'signin',
  isSignIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state= initialState
  }

  updateUser=(data)=>{
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onRouteChange=(route)=>{
    if(route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignIn: true})
    }
    this.setState({route: route})
  }

calculateFaceLocation=(data)=>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    topRow: clarifaiFace.top_row * height,
    leftCol: clarifaiFace.left_col * width,
    bottomRow: height - (clarifaiFace.bottom_row * height),
    rightCol: width - (clarifaiFace.right_col * width)
  }
}

    displayFaceBox = (box) => {
      this.setState({box: box});
    }

  onInputChange=(event)=>{
    this.setState({input: event.target.value})
  }

  onImageSubmit=()=>{
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/imageurl',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        input: this.state.input
      })
    })
    .then(res=>res.json())
    .then(res=>{
      if(res){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res=>res.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(res))
    })
    .catch(err=>console.log(err))
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
            params={particlesOption}/>
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn}/>
        { this.state.route === 'home'
        ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm  onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
        </div>
        : (this.state.route === 'signin'
        ? <SignIn onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
        : <Register onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>)
        }
      </div>
    );
  }
}

export default App;
