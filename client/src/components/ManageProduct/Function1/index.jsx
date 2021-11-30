import {useEffect, useState} from 'react'
import './index.css'
import {requiretTienNLList,requireLoaiNLList,requireFunc2List} from '../../../api/services'

function Table(){
    const [list,setList] = useState([])
    const [loai,setLoai]=useState([])
    const [func2,setFunc2]=useState([])
    useEffect(()=>{
        requireLoaiNLList(setLoai)
    },[])
    
    const handleClick=(e)=>{
        e.preventDefault()
        const type=document.querySelector('#type').value
        const num=document.querySelector('#num').value
        const datas={
            type:type,
            num:Math.floor(num)
        }
        if (datas.num >0) setTimeout(()=>{
            requiretTienNLList(datas,setList)
        },10)
    }
    const handleClickFunc2=(e)=>{
        e.preventDefault()
        const timeA=document.getElementById('timeA').value
        const timeB=document.getElementById('timeB').value
        const num=document.querySelector('#num2').value

        const datas={
            timeA:timeA,
            timeB:timeB,
            num:Math.floor(num)
        }
        if (datas.num >0) setTimeout(()=>{
            requireFunc2List(datas,setFunc2)
        },10)
    }
    return (
        <div id="table-f">
            <div>
                <h5>Procedure 1</h5>
                <select id="type" >
                    {loai.map(item=>
                        <option value={item.loai}>{item.Loai}</option>)}
                </select>
                <input id="num" type="number" min="1" required defaultValue='1'/>
                <button onClick={handleClick}>Send</button>
            </div>
            <div className="body-table" style={{minHeight:'650px',marginTop:"24px"}}>
                     <table className="table table-bordered" data-aos="fade-up" style={{}} >
                        <thead style={{ position: 'sticky', top: '0', overflowY: 'hidden', backgroundColor: '#eee' }}>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá nhập</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Số lô</th>
                            </tr>
                        </thead>
                        <tbody>

                            {list.map((product, index) =>

                                <tr key={index} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.Ten}</td>
                                    <td>{product.DonGia}</td>
                                    <td>{product.Loai}</td>
                                    <td>{product.Solo}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    </div>
                    <div style={{borderTop:'2px solid black'}}>
                <h5>Procedure 2</h5>
                <input type="date" id="timeA"/>
                <input type="date" id="timeB"/>
                <input id="num2" type="number" min="1" defaultValue="1" required/>
                <button type="submit" onClick={handleClickFunc2}>Send</button>
            </div>
            <div className="body-table" style={{borderTop:'2px solid black',minHeight:'650px',marginTop:"24px"}}>
                     <table className="table table-bordered" data-aos="fade-up" style={{}} >
                        <thead style={{ position: 'sticky', top: '0', overflowY: 'hidden', backgroundColor: '#eee' }}>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Số lô</th>
                                <th scope="col">Tổng giá nhập</th>
                            </tr>
                        </thead>
                        <tbody>

                            {func2.map((product, index) =>

                                <tr key={index} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.SoLo}</td>
                                    <td>{product.Tong}</td>
                                  
                                </tr>
                            )}

                        </tbody>
                    </table>
                    </div>
        </div>
    )
}

export default Table;