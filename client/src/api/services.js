import axios from "axios";

const url = 'http://localhost:4000/';

const requireProductList = callback =>{
    axios.get(url + 'get/products')
      .then(res => {
        const data = res.data;
        console.log("get data:",data);
        callback(data);
      })
      .catch(error => console.log(error));
};

const createNewProduct =(data,callback)=>{
  axios.post(url +'insert/product',data)
    .then(res=>{
      callback(res.data.message);
    })

    .catch(err=>{
      if (err) callback(err.response.data.message)
    })
}

const deleteProduct =(data,callback)=>{
  
  console.log("delete",data);

  axios.post(url +'delete/product',data)
  .then(res=>{
    callback(res.data.message);
  })

  .catch(err=>{
    if (err) callback(err.response.data.message)
  })
}
const updateProduct=(data,callback)=>{
  console.log("edit",data.data);
  axios.post(url + 'edit/product', data.data)
  .then(res=>{
    callback(res.data.message);
  })
  .catch(err=>{
    if (err) {console.log({err})
    callback(err.response.data.message);}
  })
}
 

//Customer
const requireCustomerList = callback =>{
  axios.get(url + 'get/customers')
    .then(res => {
      const data = res.data;
      console.log("get cus:",data);
      callback(data);
    })
    .catch(error => console.log(error));
};

const createNewCustomer =(data,callback)=>{
axios.post(url +'insert/customer',data)
.then(res=>{
  callback(res.data.message);
})
.catch(err=>{
  if (err) callback(err.response.data.message)
})
}

const deleteCustomer =(_data,callback)=>{

const data={
  id: _data
}

axios.post(url +'delete/customer',data)
.then(res=>{
  callback(res.data.message);
})

.catch(err=>{
  if (err) callback(err.response.data.message)
})
}
const updateCustomer=(data,callback)=>{
console.log("edit",data.data);
axios.post(url + 'edit/customer', data.data)
.then(res=>{
  callback(res.data.message);
})

.catch(err=>{
  if (err) callback(err.response.data.message)
})

}
export {
  requireProductList,
  createNewProduct,
  deleteProduct,
  updateProduct,
  requireCustomerList,
  createNewCustomer,
  deleteCustomer,
  updateCustomer

};