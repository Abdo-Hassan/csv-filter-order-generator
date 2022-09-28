import React from 'react';

const UploadFile = ({ handleOnChange }) => {
  return (
    <div className='App'>
      <h1>CSV filter order generator</h1>

      <div className='container'>
        <div className='card'>
          <div className='drop_box'>
            <header>
              <h4>Upload File here</h4>
            </header>
            <p>Files Supported: CSV</p>

            <label className='btn'>
              Choose File
              <input
                hidden
                type='file'
                id='csvFileInput'
                accept='.csv'
                onChange={handleOnChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
