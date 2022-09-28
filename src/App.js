import { useEffect, useState } from 'react';
import './App.css';
import UploadFile from './components/UploadFile';

function App() {
  const [file, setFile] = useState();
  const [updatedCsv, setUpdatedCsv] = useState([]);
  const [commonOrderItem, setCommonOrderItem] = useState('');
  const [commonOrderBrand, setCommonOrderBrand] = useState('');
  const [averagePerOrder, setAveragePerOrder] = useState(0);

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

  const filterOrderItems = (type, orderItemOrBrand) => {
    let distributionItem = {};
    let maxItemRepeated = 0;
    let itemResult = [];

    let distributionBrand = {};
    let maxBrandRepeated = 0;
    let brandResult = [];

    if (type === 'commonItem') {
      orderItemOrBrand.forEach(function (a) {
        distributionItem[a] = (distributionItem[a] || 0) + 1;
        if (distributionItem[a] > maxItemRepeated) {
          maxItemRepeated = distributionItem[a];
          itemResult = [a];
          return;
        }
        if (distributionItem[a] === maxItemRepeated) {
          itemResult.push(a);
        }
      });
      setCommonOrderItem(itemResult.join(''));
    } else {
      orderItemOrBrand.forEach(function (a) {
        distributionBrand[a] = (distributionBrand[a] || 0) + 1;
        if (distributionBrand[a] > maxBrandRepeated) {
          maxBrandRepeated = distributionBrand[a];
          brandResult = [a];
          return;
        }
        if (distributionBrand[a] === maxBrandRepeated) {
          brandResult.push(a);
        }
      });
      setCommonOrderBrand(brandResult.join(''));
    }
  };

  useEffect(() => {
    if (updatedCsv?.length > 0) {
      // get name of order item [shoes,knife,...]
      const getOrderItem = updatedCsv?.map((order) => order[2]);

      // handle and filter duplicated order items
      filterOrderItems('commonItem', getOrderItem);
    }
  }, [updatedCsv]);

  useEffect(() => {
    if (commonOrderItem) {
      // get total of orders
      const totalOrders = updatedCsv?.length;

      // filter with common duplicate order item
      const filterOrders = updatedCsv?.filter(
        (order) => order[2] === commonOrderItem
      );

      // get name of order item brand [Air , Puma,....]
      const getOrderBrand = filterOrders?.map((order) => order[4]);

      // handle and filter duplicated order items
      filterOrderItems('commonBrand', getOrderBrand);

      // total quantity of the item
      const totalQuantityOfItem = filterOrders
        ?.map((item) => item[3])
        .reduce(function (accumulator, currentValue) {
          return accumulator + Number(currentValue);
        }, 0);

      const averagePerOrder = totalQuantityOfItem / totalOrders;
      setAveragePerOrder(averagePerOrder);
    }
  }, [updatedCsv, commonOrderItem]);

  return (
    <div className='App'>
      <h1>CSV filter order generator</h1>

      <UploadFile
        file={file}
        handleOnChange={handleOnChange}
        commonOrderItem={commonOrderItem}
        averagePerOrder={averagePerOrder}
        commonOrderBrand={commonOrderBrand}
      />
    </div>
  );
}

export default App;
