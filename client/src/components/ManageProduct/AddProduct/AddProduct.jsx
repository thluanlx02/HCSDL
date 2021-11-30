import './AddProduct.css'
import React from 'react';
import ReactDOM from 'react-dom';

const AddProduct = ({ isShowing, hide, callB, handleInputChange, manlList ,error}) => isShowing ? ReactDOM.createPortal(

    <React.Fragment>
        <div id="modal-add-product">
            <div className="modal-content" >
                <div className="modal-header">
                    <h5>Add Product</h5>
                    <p style={{color:'red'}}>{error}</p>
                    <button type="button" className="close" onClick={hide}>X</button>
                </div>
                <form>
                <div className="modal-body form-group">
                    <label className="mt-2">SoLo:</label>
                    <input required type="number"  name='SoLo'className="form-control" onChange={handleInputChange}/>
                    <div class="form-group">
                    <label for="MaNguyenLieu" className="mt-2">Chọn mã nguyên liệu:</label>
                    <select  name="MaNguyenLieu" id="MaNguyenLieu" className="form-control" onChange={handleInputChange} required>
                        <option value="">Chọn mã nguyên liệu</option>
                        {manlList.map((item,index)=>
                         <option value={item.MaNguyenLieu}>{item.MaNguyenLieu} : {item.Ten}</option>
                        )}
                        
                    </select>
                    </div>
                    <label className="mt-2">SoLuong:</label>
                    <input type="number" className="form-control" name="SoLuong" onChange={handleInputChange} />
                    <label className="mt-2">DonGia:</label>
                    <input type="number" className="form-control" name="DonGia" onChange={handleInputChange} />

                </div>
                <div className="modal-footer">
                    <button type='reset' onClick={callB}>ADD</button>
                </div>
                </form>
              
                
            </div>
        </div>
       
                
    </React.Fragment>, document.body
) : null;

export default AddProduct;