import './AddCustomer.css'
import React from 'react';
import ReactDOM from 'react-dom';

const AddProduct =({ isShowing, hide,callB,handleInputChange }) => isShowing ? ReactDOM.createPortal(

    <React.Fragment>
     <div id="modal-add-product">
            <div className="modal-content" >
                <div className="modal-header">
                    <h5>Add Customer</h5>
                    <button type="button" className="close" onClick={hide}>X</button>
                </div>
                <div className="modal-body">
                <label className="mt-2">Mã số tài khoản:</label>
                    <input type="text" className="form-control" placeholder="MS tài khoản" name='MaSoTaiKhoan' onChange={handleInputChange}/>
                    <label className="mt-2">Tên tài khoản:</label>
                    <input type="text" className="form-control" placeholder="Tên tài khoản" name='TenTaiKhoan' onChange={handleInputChange}/>
                    
                    <label className="mt-2">Tên người sử dụng:</label>
                    <input type="text" className="form-control" placeholder="Tên người sủ dụng" name='TenNguoiSuDung' onChange={handleInputChange}/>

                    <label className="mt-2">Mật khẩu:</label>
                    <input type ="email" className="form-control" placeholder="Mật khẩu" name="MatKhau" onChange={handleInputChange}/>
                    <label className="mt-2">Điểm thưởng:</label>
                    <input type ="text" className="form-control" placeholder="Điểm thưởng" name="DiemThuong" onChange={handleInputChange}/>
                    <label className="mt-2">Được sở hữu bởi:</label>
                    <input type ="text" className="form-control" placeholder="Sở hữu bởi" name="SoHuuBoi" onChange={handleInputChange} />
                   
                    </div>
                    <div className="modal-footer">
                        <button  onClick={callB}>ADD</button>
                    </div>
                </div>
            </div>
    </React.Fragment>, document.body
  ) : null;

  export default AddProduct;