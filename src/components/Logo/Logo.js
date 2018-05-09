import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo =()=>{
  return(
    <div className='mt0 ma4'>
    <Tilt className="Tilt br3 shadow-3" options={{ max : 65 }} style={{ height: 125, width: 125 }} >
    <div className="Tilt-inner pa3"> <img alt='logo' src={brain}/> </div>
    </Tilt>
    </div>
  );
}


export default Logo;
