import React  from 'react';
import './Navigation.js';
import 'tachyons';


const Navigation = ({onRouteChange, isSignIn}) => {
    if (isSignIn) {
    	return (
    		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
    		<p onClick ={() => onRouteChange('signout')} 
    		className='f3 link dim black underline pad3 pointer fl w-10'>
		     Sign Out
		     </p>
		     </nav>
		     );
    } else {
		 return (
		 	<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		 	<p onClick ={() => onRouteChange('SignIn')}  
		 	className='f3 link dim black underline pad3 pointer'>Sign In
		     </p> 
		     <p onClick ={() => onRouteChange('Register')}  
		 	className='f3 link dim black underline pad3 pointer fl w-10'>Register
		     </p>
		     </nav> 
		     );
		 }
  }

export default Navigation;