import React from 'react';
import 'tachyons';
import './Rank.js';

const Rank = ({name, entries}) => {
    return (
        <div className = 'white f3'>
        {`${name} , Seu Rank atual é....`}
            <div className='white f1 '>
              {entries}
            </div>
        </div>
    );
  }

export default Rank;