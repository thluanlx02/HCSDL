import './EditCustomer.css'
import React from 'react';
import ReactDOM from 'react-dom';

const AddProduct =({ isShowing, hide,handleEditChange,handleInputChange,customer }) => isShowing ? ReactDOM.createPortal(

    <React.Fragment>
     <div id="modal-add-product">
            <div className="modal-content" >
                <div className="modal-header">
                    <h5>Edit Customer</h5>
                    <button type="button" className="close" onClick={hide}>X</button>
                </div>
                <div className="modal-body">
                <label className="mt-2">Mã số tài khoản:</label>
                    <input type="text" readOnly className="form-control" placeholder="Mã số tài khoản" defaultValue={customer.MaSoTaiKhoan} name='MaSoTaiKhoan' onChange={handleInputChange}/>
                    <label className="mt-2">Tên tài khoản:</label>
                    <input type="text" className="form-control" placeholder="Tên tài khoản"  defaultValue={customer.TenTaiKhoan}  name='TenTaiKhoan' onChange={handleInputChange}/>
                    
                    <label className="mt-2">Tên người sử dụng:</label>
                    <input type="text" className="form-control" placeholder="Tên người sủ dụng" defaultValue={customer.TenNguoiSuDung}  name='TenNguoiSuDung' onChange={handleInputChange}/>

                    <label className="mt-2">Mật khẩu:</label>
                    <input type ="email" className="form-control" placeholder="Mật khẩu" defaultValue={customer.MatKhau} name="MatKhau" onChange={handleInputChange}/>
                    <label className="mt-2">Điểm thưởng:</label>
                    <input type ="text" className="form-control" placeholder="Điểm thưởng" defaultValue={customer.DiemThuong}  name="DiemThuong" onChange={handleInputChange}/>
                    <label className="mt-2">Được sở hữu bởi:</label>
                    <input type ="text" className="form-control" placeholder="Sở hữu bởi" defaultValue={customer.SoHuuBoi}  name="SoHuuBoi" onChange={handleInputChange} />
                   
                    </div>
                    <div className="modal-footer">
                        <button  onClick={handleEditChange}>Edit</button>
                    </div>
                </div>
            </div>
    </React.Fragment>, document.body
  ) : null;

  export default AddProduct;