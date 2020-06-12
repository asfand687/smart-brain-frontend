import React from 'react';
import './FaceRecognition.css';
import ErrorImage from './404-errors.png';

const FaceRecognition = ({ imageUrl, box, error }) => {
  return (
    <div className='flex-center'>
      <div className='absolute mt2'>
        <img
          src={error ? ErrorImage : imageUrl}
          alt='face-recognition'
          width='500px'
          height='auto'
          id='inputimage'
        />
        {box ? (
          box.map((item) => (
            <div
              key={item.bottomRow}
              className='bounding-box'
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
              }}
            ></div>
          ))
        ) : (
          <div></div>
        )}
        {/* <div
          className='bounding-box'
          style={{
            top: box1 ? box1.topRow : '',
            right: box1 ? box1.rightCol : '',
            bottom: box1 ? box1.bottomRow : '',
            left: box1 ? box1.leftCol : '',
          }}
        ></div>
        <div
          className='bounding-box'
          style={{
            top: box2 ? box2.topRow : '',
            right: box2 ? box2.rightCol : '',
            bottom: box2 ? box2.bottomRow : '',
            left: box2 ? box2.leftCol : '',
          }}
        ></div> */}
      </div>
    </div>
  );
};

export default FaceRecognition;
