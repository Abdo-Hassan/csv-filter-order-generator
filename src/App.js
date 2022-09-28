import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (updatedCsv?.length > 0) {
      // get name of order item [shoes,knife,...]
      const getOrderItem = updatedCsv?.map((order) => order[2]);

      // handle and filter duplicated order items
    }
  }, [updatedCsv]);

  return (
    <div className='App'>
      <h1>CSV filter order generator</h1>

      <UploadFile file={file} handleOnChange={handleOnChange} />
    </div>
  );
}

export default App;
