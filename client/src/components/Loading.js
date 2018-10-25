import React from 'react';

function Loading(props) {
  return <div className='loading'><div className={props.error ? 'loadingError' : ''}></div></div>;
}

export default Loading;