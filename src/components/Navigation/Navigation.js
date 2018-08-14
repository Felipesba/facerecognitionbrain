import React  from 'react';
import './Navigation.js';
import 'tachyons';


const Navigation = ({onRouteChange}) => {
    return (
      <div onClick ={() => onRouteChange('SignIn')} className='f3 link dim black underline pad3 pointer georgia tr'>
      <p>Sign Out</p>
      </div>
    );
  }

export default Navigation;