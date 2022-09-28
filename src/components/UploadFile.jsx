import React from 'react';
import { CSVLink } from 'react-csv';

const UploadFile = ({
  handleOnChange,
  file,
  commonOrderItem,
  averagePerOrder,
  commonOrderBrand,
}) => {
  return (
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

          {file && (
            <div className='csv-files-wrapper'>
              <CSVLink
                data={[[commonOrderItem, averagePerOrder]]}
                filename={`0_${file?.name}`}
                separator={','}
                className='csv-file'>{`0_${file?.name}`}</CSVLink>

              <CSVLink
                data={[[commonOrderItem, commonOrderBrand]]}
                separator={','}
                className='csv-file'
                filename={`1_${file?.name}`}>{`1_${file?.name}`}</CSVLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
