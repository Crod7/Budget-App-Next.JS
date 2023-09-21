import React from 'react';
import LoadingElement from './LoadingElement';

function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-50">
      <LoadingElement />
    </div>
  );
}

export default LoadingScreen;
