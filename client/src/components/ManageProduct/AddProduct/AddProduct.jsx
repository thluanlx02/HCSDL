import './AddProduct.css'
import React from 'react';
import ReactDOM from 'react-dom';

const AddProduct =({ isShowing, hide,callB,handleInputChange }) => isShowing ? ReactDOM.createPortal(

    <React.Fragment>
     <div id="modal-add-product">
            <div className="modal-content" >
                <div className="modal-header">
                    <h5>Add Product</h5>
                    <button type="button" className="close" onClick={hide}>X</button>
                </div>
                <div className="modal-body">
                    <label className="mt-2">SoLo:</label>
                    <input type="text" className="form-control"  name='SoLo' onChange={handleInputChange}/>
                     {/*<div className="product-type mt-2" >
                    <p >Type:</p>

                    <input type="radio" id="drink" name="product_type" value="Drink"  defaultChecked={product.Product_Type==='Drink'}  onChange={handleInputChange}/>
                    <label htmlFor="Drink">Drink</label>

                    <input type ="radio" id="fastfood" name="product_type" value="FastFood"defaultChecked={product.Product_Type==='FastFood'} onChange={handleInputChange}/>
                    <label htmlFor="FastFood">FastFood</label>

                    <input type ="radio" id="sweets" name="product_type" value="Sweets" defaultChecked={product.Product_Type==='Sweets'}onChange={handleInputChange}/>
                    <label htmlFor="Sweets">Sweets</label>
                    
                    <input type ="radio" id="canning" name="product_type" value="Canning" defaultChecked={product.Product_Type==='Canning'}onChange={handleInputChange}/>
                    <label htmlFor="Canning">Canning</label>
                    
                    <input type ="radio" id="frozenfood" name="product_type" value="FrozenFood" onChange={handleInputChange}/>
                    <label htmlFor="FrozenFood">FrozenFood</label>
                    
                    </div> */}
                    <label className="mt-2">MaNguyenLieu:</label>
                    <input type="text" className="form-control"  name='MaNguyenLieu' onChange={handleInputChange}/>
                    <label className="mt-2">SoLuong:</label>
                    <input type ="number" className="form-control"  name="SoLuong" onChange={handleInputChange}/>
                    <label className="mt-2">DonGia:</label>
                    <input type ="number" className="form-control" name="DonGia" onChange={handleInputChange}/>
                    
                    </div>
                    <div className="modal-footer">
                        <button  onClick={callB}>ADD</button>
                    </div>
                </div>
            </div>
    </React.Fragment>, document.body
  ) : null;

  export default AddProduct;