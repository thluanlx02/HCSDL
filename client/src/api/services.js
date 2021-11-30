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
const requireManlList = callback =>{
  axios.get(url + 'get/manl')
    .then(res => {
      const data = res.data;
      console.log("get data:",data);
      callback(data);
    })
    .catch(error => console.log(error));
};
const requireLoaiNLList = callback =>{
  axios.get(url + 'get/loaiNL')
    .then(res => {
      const data = res.data;
      console.log("get data:",data);
      callback(data);
    })
    .catch(error => console.log(error));
};
const requiretTienNLList = (data,callback) =>{
  console.log("send data",data);
  axios.post(url + 'get/tienNL',data)
    .then(res => {
      const data = res.data;
      console.log("get data:",data);
      callback(data);
    })
    .catch(error => console.log(error));
};
const requireFunc2List = (data,callback) =>{
  console.log("send data",data);
  axios.post(url + 'get/func2',data)
    .then(res => {
      const data = res.data;
      console.log("get data:",data);
      callback(data);
    })
    .catch(error => console.log(error));
};
const requireCus_Procedure1 = (data,callback) =>{
  console.log("send data",data);
  axios.post(url + 'get/cus_proc1',data)
    .then(res => {
      const data = res.data;
      console.log("get data:",data);
      callback(data);
    })
    .catch(error => console.log(error));
};
const requireCus_Procedure2 = (data,callback) =>{
  console.log("send data",data);
  axios.post(url + 'get/cus_proc2',data)
    .then(res => {
      const data = res.data;
      console.log("get data:",data);
      callback(data);
    })
    .catch(error => console.log(error));
};

const createNewProduct =(data,callback)=>{
  console.log("data insert ",data);
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
  updateCustomer,
  requireManlList,
  requireLoaiNLList,
  requiretTienNLList,
  requireFunc2List,
  requireCus_Procedure1,
  requireCus_Procedure2

};