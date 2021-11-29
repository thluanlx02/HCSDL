/* eslint-disable jsx-a11y/anchor-is-valid */
import './ManageCustomer.css'
import { requireCustomerList, deleteCustomer, createNewCustomer, updateCustomer } from '../../api/services'
import { ProductManagement } from '../../context/ProductManagement';
import React, { useContext, useEffect, useState } from 'react';
import AddCustomer from "./AddCustomer/AddCustomer"
import EditCustomer from "./EditCustomer/EditCustomer"
import useModal from './useModal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';





function ManageCustomer() {
    const [data, setData] = useState({
        TenTaiKhoan: '',
        MatKhau: '',
        TenNguoiSuDung: '',
        DiemThuong: '',
        SoHuuBoi: '',
        MaSoTaiKhoan: ''
    })
    const [id, setId] = useState(0);
    const [mess, setMess] = useState('Empty')

    const [open, setOpen] = useState(false);
    const [filterSearch, setFilterSearch] = useState('');
    const [filter, setFilter] = useState('');

    const [page, setPage] = useState(1);
    const { customerList, setCustomerList } = useContext(ProductManagement);
    const [isShowingEditModal, setIsShowingEditModal] = useState(false);
    const { isShowing, toggle } = useModal();
    let num = customerList ? customerList.length : 0;
    let numPage = num % 10 === 0 ? num / 10 : Math.floor(num / 10) + 1;

    useEffect(() => {

        if (isShowing || isShowingEditModal) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }

    }, [isShowing, customerList, filterSearch, isShowingEditModal,mess]);

    const handleChange = (event) => {
        setTimeout(() => {
            setFilter(event.target.value);
        }, 10)
        console.log(filter);
    };
    const handleInputChange = (event) => {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        if (name === 'DiemThuong') value = Math.floor(value)
        setData({
            ...data,
            [name]: value,

        });
    }
    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id);
    };
    const handelSubmitDelete = () => {
        deleteCustomer(id,setMess);
        setTimeout(() =>
            requireCustomerList(setCustomerList)
            , 100)
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const toggleEdit = () => {
        setIsShowingEditModal(!isShowingEditModal);
    }
    const handleToggleEdit = (_id) => {

        const product = customerList.filter(item => item.MaSoTaiKhoan === _id)[0]
        setData({
            ...product
        })
        console.log("data", data);
        toggleEdit();
        setId(_id);
    }
    const handleEditChange = () => {
        const dataEdit = {
            data: data,
        }
        toggleEdit();
        updateCustomer(dataEdit,setMess);
        setTimeout(() =>
            requireCustomerList(setCustomerList), 100)

    }



    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const handleChangeSearch = (event) => {
        const target = event.target;
        const value = target.value;
        setTimeout(() => {
            setFilterSearch(value);
        }, 10)
        console.log(value);
    }

    const callB = () => {
        toggle();
        createNewCustomer(data,setMess);
        setTimeout(() =>
            requireCustomerList(setCustomerList), 100)
    }
    const closeMess = () => {
        setTimeout(() => {
            setMess("Empty")
        }, 10);
    }

    return (
        <div id="customer">
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
                    <h2>Customer</h2>
                    <div onClick={toggle}><i className="far fa-plus-square"></i> <h4>Add new customer</h4></div>
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
                            <MenuItem value={'TenNguoiSuDung'}>Tên người dùng</MenuItem>
                            <MenuItem value={'TenTaiKhoan'}>Tên tài khoản</MenuItem>
                            <MenuItem value={'SoHuuBoi'}>Chủ sở hữu</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="input-group rounded" style={{ width: '200px' }}>
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" onChange={handleChangeSearch} />
                        <span className="input-group-text border-0" id="search-addon" onClick={handleChangeSearch} >
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className="list-product-container">
                    <table className="table table-bordered" data-aos="fade-up" >
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Tên người sử dụng</th>
                                <th scope="col">Tên tài khoản</th>
                                <th scope="col">Mật khẩu</th>
                                <th scope="col">Điểm thưởng</th>
                                <th scope="col">Được sở hửu bởi</th>
                                <td colSpan="2"></td>
                            </tr>
                        </thead>
                        <tbody>

                        {customerList.map((product, index) =>
                                ((( filter === "" || filter === 'All') && ( product.TenNguoiSuDung.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1
                                || product.TenTaiKhoan.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1
                                || product.SoHuuBoi.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1
                               
                                ))
                                ||((filter === 'TenNguoiSuDung') && (product.TenNguoiSuDung.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1))
                                || ((filter === 'TenTaiKhoan') && (product.TenTaiKhoan.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1))
                                || ((filter === 'SoHuuBoi') && (product.SoHuuBoi.toLocaleLowerCase().indexOf(filterSearch.trim().toLocaleLowerCase()) !== -1))
                                
                                )
                                && ( filterSearch.replace(/\s/g, '') || index >= (page - 1) * 10)
                                && ( filterSearch.replace(/\s/g, '') || index < page * 10)

                                && <tr key={index} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.MaSoTaiKhoan}</td>
                                    <td>{product.TenNguoiSuDung}</td>
                                    <td>{product.TenTaiKhoan}</td>
                                    <td>{product.MatKhau}</td>
                                    <td>{product.DiemThuong}</td>
                                    <td>{product.SoHuuBoi}</td>
                                    <td
                                        onClick={() => handleClickOpen(product.MaSoTaiKhoan)}
                                    ><i className="far fa-trash-alt"></i></td>
                                    <td onClick={() => handleToggleEdit(product.MaSoTaiKhoan)}><i className="far fa-edit"></i></td>

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
            <AddCustomer
                isShowing={isShowing}
                hide={toggle}
                callB={callB}
                handleInputChange={handleInputChange}
            />
            <EditCustomer
                isShowing={isShowingEditModal}
                hide={toggleEdit}
                handleEditChange={handleEditChange}
                handleInputChange={handleInputChange}
                customer={customerList.filter(item => item.MaSoTaiKhoan === id)[0]}
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
                    <Button
                        onClick={handelSubmitDelete}
                    >Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ManageCustomer;