import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm =({onImageSubmit, onInputChange})=>{
  return(
    <div>
    <p className='tc f4'>
    {'This Smart Brain can detect face in your picture.  Give it a try !'}
    </p>
    <div className='center'>
    <div className='form center pa3 br3 shadow-5'>
    <input
    className='w-70 pa2'
    type='tex'
    onChange={onInputChange}/>
    <button
    className='w-30 pointer grow bg-light-green dib white'
    onClick={onImageSubmit}>DETECT</button>
    </div>
    </div>
    </div>
  );
}


export default ImageLinkForm;
