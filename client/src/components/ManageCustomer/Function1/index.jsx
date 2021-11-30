import { useState} from 'react'
import './index.css'
import {  requireCus_Procedure1,
    requireCus_Procedure2} from '../../../api/services'

function Table(){
    const [list,setList] = useState([])
    const [func2,setFunc2]=useState([])
    
    const handleClick=(e)=>{
        e.preventDefault()
        const num=document.querySelector('#num').value
        const datas={
            num:Math.floor(num)
        }
        if (datas.num >0) setTimeout(()=>{
            requireCus_Procedure1(datas,setList)
        },10)
    }
    const handleClickFunc2=(e)=>{
        e.preventDefault()

        const num=document.querySelector('#num2').value

        const datas={
 
            num:Math.floor(num)
        }
        if (datas.num >0) setTimeout(()=>{
            requireCus_Procedure2(datas,setFunc2)
        },10)
    }
    console.log("func2",func2);
    return (
        <div id="table-f">
            <div>
                <h5>Function</h5>
                
                <input id="num" type="number" min="1" required defaultValue='1'/>
                <button onClick={handleClick}>Send</button>
            </div>
            <div className="body-table" style={{minHeight:'600px',marginTop:"24px"}}>
                     <table className="table table-bordered" data-aos="fade-up" style={{}} >
                        <thead style={{ position: 'sticky', top: '0', overflowY: 'hidden', backgroundColor: '#eee' }}>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Được đặt bởi</th>
                                <th scope="col">Tên người sử dụng</th>
                                <th scope="col">Số đơn hàng</th>
                            </tr>
                        </thead>
                        <tbody>

                            {list.map((product, index) =>

                                <tr key={index} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.ĐuocDatBoi}</td>
                                    <td>{product.TenNguoiSuDung}</td>
                                    <td>{product.SoDonHang}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    </div>
                    <div>
                <h5>Function</h5>
                <input id="num2" type="number" min="1" defaultValue="1" required/>
                <button type="submit" onClick={handleClickFunc2}>Send</button>
            </div>
            <div className="body-table" style={{minHeight:'600px',marginTop:"24px"}}>
                     <table className="table table-bordered" data-aos="fade-up" style={{}} >
                        <thead style={{ position: 'sticky', top: '0', overflowY: 'hidden', backgroundColor: '#eee' }}>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">MSTK</th>
                                <th scope="col">Tên người dùng</th>                                
                                <th scope="col">Sở hữu bởi</th>
                                <th scope="col">Tên người dùng</th>
                            </tr>
                        </thead>
                        <tbody>

                            {func2.map((product, index) =>

                                <tr key={index} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.MaSoTaiKhoan}</td>
                                    <td>{product.TenNguoiSuDung}</td>
                                    <td>{product.SoHuuBoi}</td>
                                    <td>{product.DiemThuong}</td>
                                  
                                </tr>
                            )}

                        </tbody>
                    </table>
                    </div>
        </div>
    )
}

export default Table;