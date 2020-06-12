import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const doSearch = (e) => {
    onInputChange(e.target.value);
  };
  return (
    <div>
      <p>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='flex-center'>
        <div className='form pa4 br3 shadow-5 flex-center'>
          <input
            type='text'
            className='fa3 pa2 center w-70'
            onChange={(e) => doSearch(e)}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
