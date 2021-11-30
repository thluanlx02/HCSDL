import { Button, Dialog, DialogTitle, DialogActions,
     DialogContent, DialogContentText } from "@material-ui/core";
import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import PopUp from './PopUp'
import axios from 'axios'
import CreateItem from "./CreateItem";
import EditItem from "./EditItem";
import './Food.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const url = 'http://localhost:4000/';
const Food = () => {
        const [product, setProduct] = useState([]);
        const [search, setSearch] = useState();
        const [sortState, setSortState] = useState(0);
        const [viewProduct, setViewProduct] = useState([]);
        useEffect(() => {
            loadProducts()
        }, []);
       
        const loadProducts = async () => {
          const result = await axios.get(url + "food")
          setProduct(result.data.recordset)
          setViewProduct(result.data.recordset)
        };
       
        const deleteFood = (productId) =>
        {
          axios.delete(url + 'food/delete/'+productId)
          .then((result) => {
            loadProducts();
          })
          .catch((err) => {
            console.log(err)
          });
        };
        
        const sortChange = () => {
            let sortProduct = product.map(item => ({...item}))
            if(!sortState) {
                setSortState(1)
                sortProduct.sort((a, b) => {
                   return a.TenMonAn.localeCompare(b.TenMonAn) 
                })
                setViewProduct(sortProduct)
            }
            else if (sortState === 1) {
                setSortState(2)
                sortProduct.sort((a, b) => {
                   return -1*a.TenMonAn.localeCompare(b.TenMonAn) 
                })
                setViewProduct(sortProduct)
            }
            else {
                setSortState(0)
                setViewProduct(product)
            }
        }
        const editFood = (productId) => {
            setIdItem(productId)
            setOpenPopupEdit(true)
        };

        const filterSearch = () => {
            if(search) {
                const filterProduct = product.filter(element => {
                    return element.TenMonAn.toLowerCase().includes(search.toLowerCase())
                })
                setViewProduct(filterProduct) 
            }
            else {
                setViewProduct(product)
            }
        };
       
    const [openPopupAdd, setOpenPopupAdd] = useState(false)
    const [openPopupEdit, setOpenPopupEdit] = useState(false)
    const [idItem, setIdItem] = useState(0)
    const [open, setOpen] = useState(false)
    return (
        <div className="page">
            <div className="container">    
            <div className="py-4">
            <div className="button-action mb-2">
                <h5>Product detail</h5>
                <div className="input-group rounded" style={{ width: '300px' , height: '20px' }}>
                        <input type="search" className="form-control rounded" placeholder="Search for..." aria-label="Search"
                            aria-describedby="search-addon" onChange={(e) => { setSearch(e.target.value)}} />
                        <span onClick={filterSearch} className="input-group-text border-0 icon-searchs" id="search-addon">
                            <i className="bi bi-search"></i>
                        </span>
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    style={{ border: '2px solid', fontWeight: 'bold' }}
                    startIcon= {<AddIcon />}
                    onClick={() => { setOpenPopupAdd(true); }}
                >Add Item </Button>
            </div>
                <table className="table table-borderless tabless">
                <thead>    
                    <tr>
                    <th scope="col">#No</th>
                    <th scope="col" onClick={sortChange}>
                        Product Name
                        {sortState === 1 ? <i className="bi-caret-up-fill"></i> : null }
                        {sortState === 2 ? <i className="bi-caret-down-fill"></i> : null }
                    </th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Product Description</th>
                    <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {viewProduct.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.TenMonAn}</td>
                        <td>{item.GiaNiemYet}</td>
                        <td>{item.MoTa}</td>
                        <td className=" mr-2 iconss" onClick={() => editFood(item.MaSoMonAn)}>
                            <i className="far fa-edit" aria-hidden="true"></i> 
                        </td>
                        <td className="iconss" onClick={() => {
                            setOpen(true)
                            setIdItem(item.MaSoMonAn)
                        }}>
                            <i className="far fa-trash-alt" aria-hidden="true"></i> 
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
            <PopUp 
                title="Create New Product"
                openPopup={openPopupAdd}
                setOpenPopup={setOpenPopupAdd}
            >
            <ToastContainer />
            <CreateItem func={loadProducts} />
            </PopUp>
            <PopUp 
                title="Update Product"
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
            >
            <ToastContainer />
            <EditItem func={loadProducts} 
                item={product.filter(item => item.MaSoMonAn === idItem)[0]} />
            </PopUp>
            <Dialog
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Confirm Item Delete"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`Are you sure you want to delete this item?`}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button
                    type="button"
                    onClick={() => {
                    deleteFood(idItem)
                    setOpen(false);
                    }}
                    color="primary"
                >
                    Yes
                </Button>
                <Button
                    type="button"
                    onClick={() => { setOpen(false) }}
                    color="secondary"
                    autoFocus
                >
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>  
    )
}

export default Food
