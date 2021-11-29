/* eslint-disable jsx-a11y/anchor-is-valid */
import './ManageProduct.css'
import {
    requireProductList,
    createNewProduct,
    deleteProduct,
    updateProduct
} from '../../api/services'
import { ProductManagement } from '../../context/ProductManagement';
import Alert from '@mui/material/Alert';
import React, { useContext, useEffect, useState } from 'react';
import AddProduct from "./AddProduct/AddProduct"
import EditProduct from "./EditProduct/EditProduct"
import useModal from './useModal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

function ManageProduct() {
    const [data, setData] = useState({
        SoLo: '',
        MaNguyenLieu: '',
        SoLuong: '',
        DonGia: '',
    })

    const [id, setId] = useState({
        SoLo: '',
        MaNguyenLieu: ''
    });
    const [mess, setMess] = useState('Empty')
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterSearch, setFilterSearch] = useState('');
    const [page, setPage] = useState(1);
    const { productList, setProductList } = useContext(ProductManagement);
    const { isShowing, toggle } = useModal();
    const [isShowingEditModal, setIsShowingEditModal] = useState(false);
    let num = productList ? productList.length : 0;
    let numPage = num % 10 === 0 ? num / 10 : Math.floor(num / 10) + 1;

    useEffect(() => {
        if (isShowing || isShowingEditModal) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }

    }, [isShowing, isShowingEditModal, productList, filterSearch, mess]);


    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        if (name !== 'MaNguyenLieu') value = Math.floor(value);
        setData({
            ...data,
            [name]: value,

        });
    }
    const handleClickOpen = (a, b) => {
        console.log(a, b);
        setOpen(true);
        setId({
            SoLo: a,
            MaNguyenLieu: b
        });
    };
    const handelSubmitDelete = () => {
        deleteProduct(id,setMess);
        setTimeout(() =>
            requireProductList(setProductList), 100)
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleToggleEdit = (a, b) => {

        const product = productList.filter(item => item.SoLo === a && item.MaNguyenLieu === b)[0]
        setData({
            ...product
        })
        console.log("data", data);
        toggleEdit();
        setId({
            SoLo: a,
            MaNguyenLieu: b
        });
    }
    const handleEditChange = (a, b) => {
        const dataEdit = {
            data: data,
        }
        toggleEdit();
        updateProduct(dataEdit,setMess);
        setTimeout(() =>
            requireProductList(setProductList), 100)

    }

    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const handleChange = (event) => {
        setTimeout(() => {
            setFilter(event.target.value);
        }, 10)
        console.log(filter);
    };
    const toggleEdit = () => {
        setIsShowingEditModal(!isShowingEditModal);
    }

    const callB = () => {
        toggle();
        createNewProduct(data, setMess);
        setTimeout(() =>
            requireProductList(setProductList), 100)

    }
    const handleChangeSearch = (event) => {
        const target = event.target;
        const value = target.value;
        setTimeout(() => {
            setFilterSearch(value);
        }, 10)
    }
    const closeMess = () => {
        setTimeout(() => {
            setMess("Empty")
        }, 10);
    }

    return (
        <div id="product">

            <div class="mess" style={{ position: 'relative' }}>
                {mess !== 'Empty' && <Stack sx={{ width: '50%', position: 'fixed', top: '0' }} spacing={2}>
                    <Alert onClose={closeMess} severity="error">{mess}</Alert>
                </Stack>}
                {
                    mess!=='Empty'&&mess === 'Success' && <Stack sx={{ width: '50%', position: 'fixed', top: '0' }} spacing={2}>
                        <Alert onClose={closeMess}>{mess}</Alert>
                    </Stack>
                }
            </div>
            <div className="manage-product">
                <div className="header">

                    <nav className=" avatar navbar navbar-expand-lg navbar-light ">
                        <div className="container-fluid">
                            <ul className="navbar-nav">

                                <li className="nav-item dropdown dropstart ">
                                    <a
                                        className="nav-link d-flex align-items-center"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                                            className="rounded-circle"
                                            height="42"
                                            alt=""
                                            loading="lazy"
                                        />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <p className="dropdown-item" ><Link to='/admin/account'>My profile</Link></p>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </div>
                <div className="list-activity">
                    <h2>Nguyên Liệu Nhập</h2>
                    <div onClick={toggle}><i className="far fa-plus-square"></i> <h4>Add New</h4></div>
                </div>
                <div className="filter-value">

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Search By</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={filter}
                            onChange={handleChange}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'All'}>Tất cả</MenuItem>
                            <MenuItem value={'SoLo'}>Số Lô</MenuItem>
                            <MenuItem value={'MaNguyenLieu'}>Mã Nguyên Liệu</MenuItem>
                            <MenuItem value={'SoLuong'}>Số Lượng</MenuItem>
                            <MenuItem value={'DonGia'}>Đơn giá</MenuItem>
                        </Select>
                    </FormControl>

                    <div className="input-group rounded" style={{ width: '200px' }}>
                        <input type="text" className="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" onChange={handleChangeSearch} />
                        <span className="input-group-text border-0" id="search-addon">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className="list-product-container">
                    <table className="table table-bordered" data-aos="fade-up" style={{}} >
                        <thead style={{ position: 'sticky', top: '0', overflowY: 'hidden', backgroundColor: '#eee' }}>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Số Lô</th>
                                <th scope="col">Mã Nguyên Liệu</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Đơn Giá</th>
                                <td colSpan="2"></td>
                            </tr>
                        </thead>
                        <tbody>

                            {productList.map((product, index) =>
                                (((filter === "" || filter === 'All') && (product.SoLo.toString().toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1
                                    || product.MaNguyenLieu.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1
                                    || product.SoLuong.toString().toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1
                                    || product.DonGia.toString().toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1
                                ))
                                    || ((filter === 'SoLo') && (product.SoLo.toString().toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1))
                                    || ((filter === 'MaNguyenLieu') && (product.MaNguyenLieu.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1))
                                    || ((filter === 'SoLuong') && (product.SoLuong.toString().toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1))
                                    || ((filter === 'DonGia') && (product.DonGia.toString().toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1))
                                )
                                && (filterSearch.replace(/\s/g, '') || index >= (page - 1) * 10)
                                && (filterSearch.replace(/\s/g, '') || index < page * 10)

                                && <tr key={index} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.SoLo}</td>
                                    <td>{product.MaNguyenLieu}</td>
                                    <td>{product.SoLuong}</td>
                                    <td>{product.DonGia}</td>
                                    <td onClick={() => handleClickOpen(product.SoLo, product.MaNguyenLieu)}><i className="far fa-trash-alt"></i></td>
                                    <td onClick={() => handleToggleEdit(product.SoLo, product.MaNguyenLieu)}><i className="far fa-edit"></i></td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    {(filterSearch.replace(/\s/g, '') === "") && <Stack spacing={2} style={{ alignItems: 'center' }}>
                        <Pagination count={numPage} color="primary" page={page} onChange={handleChangePage} />
                    </Stack>}
                </div>
                <div className="footer"><p>@CoppyRight2021</p></div>
            </div>
            <AddProduct
                isShowing={isShowing}
                hide={toggle}
                callB={callB}
                handleInputChange={handleInputChange}
            />
            <EditProduct
                isShowing={isShowingEditModal}
                hide={toggleEdit}
                handleEditChange={handleEditChange}
                handleInputChange={handleInputChange}
                product={productList.filter(item => item.SoLo === id.SoLo && item.MaNguyenLieu === id.MaNguyenLieu)[0]}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you want to delete?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handelSubmitDelete}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ManageProduct;