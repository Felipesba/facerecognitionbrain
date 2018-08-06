import React from 'react';
import './logo.js';
import './logo.css';
import 'tachyons';
import Tilt from 'react-tilt';
import brain from './brain.png';



const logo = () => {
    return (
      <div className='ma4 mt0'>
      	
      	<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
			<div className="Tilt-inner pa3">  
			<img alt='logo' style={{paddingTop: '2px'}} src={brain} height="120" width="120"/>
			</div>
		</Tilt>
      
      </div>
    );
  }

export default logo;