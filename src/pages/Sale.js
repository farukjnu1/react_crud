// src/pages/Crud.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const sales_URL = 'http://localhost:5000/sales';
const saleDetails_URL = 'http://localhost:5000/saleDetails';

function Sale() {
  const [sales, setSales] = useState([]);
  const [saleDetails, setSaleDetails] = useState([]);

  //const [saleId, setSaleId] = useState('');
  let saleId = '';
  const [customerName, setCustomerName] = useState('');
  //const [date, setDate] = useState('');
  let date = '';
  const [description, setDescription] = useState('');

  //const [saleDetailId, setSaleDetailId] = useState('');
  let saleDetailId = '';
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  //const [totalPrice, setTotalPrice] = useState('');
  let totalPrice = 0;
  const [particular, setParticular] = useState('');

  const [editingSale, setEditingSale] = useState(null);
  const [editingSaleDetail, setEditingSaleDetail] = useState(null);

  const [isForm, setIsForm] = useState(false);

  // Read
  useEffect(() => {
    axios.get(sales_URL).then((res) => setSales(res.data));
  }, []);

  // Create
  const addSale = () => {
    if (!customerName) {
      console.log('customerName is required.');
      return;
    } else {
      saleId = generateGUID();
      date = new Date().toString();
      axios.post(sales_URL, { saleId, customerName, date, description }).then((res) => {
        setSales([...sales, res.data]);
        let id = res.data.id;
        setEditingSale({saleId, customerName, date, description, id});
        console.log('saved.');
        //setCustomerName('');
        //setDescription('');
      });
    } 
  };

  // Update
  const updateSale = () => {
    date = new Date().toString();
    if(!editingSale.saleId){
      alert('saleId is required.');
      return;
    } else {
      saleId = editingSale.saleId;
      axios.put(`${sales_URL}/${editingSale.id}`, { customerName, description, date, saleId }).then((res) => {
        setSales(sales.map((u) => (u.id === res.data.id ? res.data : u)));
        console.log('saved changes.');
        //setEditingSale(null);
        //setCustomerName('');
        //setDescription('');
      });
    }
  };

  // Delete
  const deleteSale = (id) => {
    axios.delete(`${sales_URL}/${id}`).then(() => {
      setSales(sales.filter((u) => u.id !== id));
    });
  };

  // Delete
  const deleteSaleDetail = (id) => {
    axios.delete(`${saleDetails_URL}/${id}`).then(() => {
      setSaleDetails(saleDetails.filter((u) => u.id !== id));
    });
  };

  const generateGUID =  () => {
    // crypto.randomUUID() is a modern, built-in method for generating UUIDs.
    // It provides cryptographically secure random values.
    return crypto.randomUUID();
  };

  // Create
  const addSaleDetail = () => {
    if (!particular && !unitPrice && !quantity) {
      alert('All fields are required.');
      return;
    } else {
      saleDetailId = generateGUID();
      totalPrice = quantity * unitPrice;
      saleId = editingSale.saleId;
      axios.post(saleDetails_URL, { saleDetailId , saleId, quantity, unitPrice, particular, totalPrice }).then((res) => {
        setSaleDetails([...saleDetails, res.data]);
        setParticular('');
        setUnitPrice('');
        setQuantity('');
        //setTotalPrice('');
        //setSaleDetailId('');
        totalPrice = 0;
        saleDetailId = '';
      });
    }

    axios.get(saleDetails_URL + '?saleId='+saleId).then((res) => setSaleDetails(res.data)); 
  };

  const getBySaleDetail = (id) => {
    saleId = id;
    //console.log(saleId);
    axios.get(saleDetails_URL + '?saleId='+saleId).then((res) => setSaleDetails(res.data)); 
  };

  const calculatePrice = () =>{
    //setTotalPrice(unitPrice * quantity);
    totalPrice = unitPrice * quantity;
  };

  const resetForm = () =>{
    setCustomerName('');
    setDescription('');
    setEditingSale(null);

    setParticular('');
    setUnitPrice('');
    setQuantity('');
    setSaleDetails([]);
  };

  return (
    
    <div style={{ padding: '5px' }}>
      <hr />  
      <a href='#' onClick={() => {setIsForm(!isForm); resetForm(); }}>
        {isForm ? 'Go to' : 'New'} Sales
      </a>
      <br />

      {/* Show/hide div based on state */}

      {isForm && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#eee' }}>
          <h2 className="text-primary">Save Sales</h2>
          <table>
            <tbody>
              <tr>
              <td>Customer</td>
              <td>
                <input
                      value={customerName}
                      onChange={(e) => { setCustomerName(e.target.value); editingSale ? updateSale() : addSale() }}
                      placeholder="Enter customer name" className='form-control'
                    />
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description" className='form-control'
                    />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button onClick={editingSale ? updateSale : addSale} className={editingSale ? "btn btn-secondary" : "btn btn-primary"}>
                  {editingSale ? 'Save changes' : 'Save'}
                </button>
              </td>
            </tr>
            </tbody>
            
          </table>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Particular</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>
                <input
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      placeholder="Enter unit-price"
                    />
              </td>
              <td>
                <input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                    />
              </td>
              <td>
                <input
                      value={totalPrice}
                      onClick={calculatePrice}
                      placeholder="Enter total-price"
                      readOnly={true}
                    />
              </td>
              <td>
                <input
                      value={particular}
                      onChange={(e) => setParticular(e.target.value)}
                      placeholder="Enter particular"
                    />
              </td>
              <td>
                <button onClick={addSaleDetail} className='btn btn-success'>Add</button>
              </td>
            </tr>
            {saleDetails.map((u) => (
              <tr key={u.id}>
                <td>{u.unitPrice}</td>
                <td>{u.quantity}</td>
                <td>{u.totalPrice}</td>
                <td>{u.particular}</td>
                <td>
                  <button onClick={() => deleteSaleDetail(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}

      {!isForm && (
        <div style={{ marginTop: '10px', padding: '10px'}}>
          <h2>List of Sales</h2>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>#</th>
                <th>#</th>
              </tr>
              
            </thead>
            <tbody>
              {sales.map((u) => (
              <tr key={u.id}>
                <td>{u.customerName}</td>
                <td>{u.date}</td>
                <td>
                  <button onClick={() => {
                  setEditingSale(u);
                  setCustomerName(u.customerName);
                  setDescription(u.description);
                  getBySaleDetail(u.saleId);
                  setIsForm(true);
                  }} className='btn btn-success'>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteSale(u.id)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
          
    </div>
  );
}

export default Sale;
