import React, { useState, useEffect } from 'react'
import './CreateItem.css'
import DescriptionIcon from "@material-ui/icons/Description";
import StoreIcon from '@material-ui/icons/Store';
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CategoryIcon from '@material-ui/icons/Category';
import axios from 'axios';
import { toast } from 'react-toastify'

const url = 'http://localhost:4000/';
const EditItem = (props) => {
    const { func, item } = props
    const [category, setCategory] = useState([])
    const [show, setShow] = useState()
    const [product, setProduct] = useState({
      name: item.TenMonAn,
      price: item.GiaNiemYet,
      description: item.MoTa,
      image: item.HinhAnh,
      quantity: item.Soluong,
      category: item.DanhMuc
    })
    const dataChangeImage = async (event) => {
      try {
        const formData = new FormData()
        formData.append("file", event.target.files[0])
        formData.append("upload_preset", "images")
        await axios.post("https://api.cloudinary.com/v1_1/restaurant211/image/upload", formData)
        .then((response) => { setProduct({ ...product, image: response.data.secure_url }) }) 
    } catch(err) {
      console.log(err)
    }
  }
    const loadCategorys = async () => {
      const result = await axios.get(url + "food/category");
      setCategory(result.data.recordset);
    };
    useEffect(() => {
      loadCategorys();
    }, []);
    const changeInput = (event) => {
      event.preventDefault()
      if(event.target.name === 'name') {
        if (show) { setShow('') }
      }
      setProduct({ ...product, [event.target.name]: event.target.value});
    }
    const EditProduct = async (event) => {
      event.preventDefault()
      try {
        const { name, price, description, image, quantity, category } = product;
        await axios.put(url + `food/edit/${item.MaSoMonAn}`, 
        { name, price, description, image, quantity, category });
        loadCategorys();
        func();
        toast.success('Update item successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      } catch (e) {
          setShow('The food name already exists!')
          console.log(e)
      }
    }
    return (
        <div className="newProductContainer">
          <form onSubmit={EditProduct} className="createProductForm" >
            <div>
              <SpellcheckIcon />
              <input type="text" name="name" defaultValue={product.name} onChange={changeInput} placeholder="Item name" required />
            </div>
            <div className="text-danger textss">{show}</div>
            <div>
              <AttachMoneyIcon />
              <input type="number" defaultValue={product.price} onChange={changeInput} name="price" min="1" placeholder="Item price" required />
            </div>
            <div>
              <StoreIcon />
              <input type="number" defaultValue={product.quantity} onChange={changeInput} name="quantity" min="1" placeholder="Stock quantity" required />
            </div>
            <div>
              <CategoryIcon />
              <input type="text" name="category" defaultValue={product.category} onChange={changeInput} placeholder="Category" required />
            </div>
            <div>
              <select defaultValue={'DEFAULT'} onChange={changeInput} name="category">
              <option value="DEFAULT" disabled="disabled">Or choose a category</option>
              {category.map((item, index) => (
              <option key={index} value={item.DanhMuc}>{item.DanhMuc}</option>
              ))}
            </select>
            </div>
            <div id="createProductFormFile">
              <input type="file" onChange={dataChangeImage} name="image" accept="image/*" multiple={false} />
            </div>
            <div>
              <DescriptionIcon />
              <textarea placeholder="Product description" defaultValue={product.description} name="description" onChange={changeInput} cols="30" rows="1">
              </textarea>
            </div>
            <button id="createProductBtn" type="submit"> UPDATE </button>
          </form>
        </div>
    )
}

export default EditItem
 