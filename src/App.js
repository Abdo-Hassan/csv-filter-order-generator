import { useState } from 'react';
import './App.css';
import UploadFile from './components/UploadFile';

function App() {
  const [file, setFile] = useState();
  const [updatedCsv, setUpdatedCsv] = useState([]);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const csvOutput = event.target.result;
      const convertArr = csvOutput
        .split('\r')
        .map((element) => element.split(','));

      setUpdatedCsv(convertArr);
    };

    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className='App'>
      <UploadFile handleOnChange={handleOnChange} />
    </div>
  );
}

export default App;
