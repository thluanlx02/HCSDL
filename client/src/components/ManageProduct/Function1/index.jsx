import { useEffect, useState } from 'react'
import './index.css'
import Chart from "react-google-charts";
import { requiretTienNLList, requireLoaiNLList, requireFunc2List, requiretTotalNPP,getNPP } from '../../../api/services'

function Table() {
    const [list, setList] = useState([])
    const [loai, setLoai] = useState([])
    const [nPP, setNPP] = useState([])
    const [func2, setFunc2] = useState([])
    const [total, setTotal] = useState([])
    useEffect(() => {
        requireLoaiNLList(setLoai)
        getNPP(setNPP)
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        const type = document.querySelector('#type').value
        const num = document.querySelector('#num').value
        const datas = {
            type: type,
            num: Math.floor(num)
        }
        if (datas.num > 0) setTimeout(() => {
            requiretTienNLList(datas, setList)
        }, 10)
    }
    const handleClickFunc2 = (e) => {
        e.preventDefault()
        const timeA = document.getElementById('timeA').value
        const timeB = document.getElementById('timeB').value
        const num = document.querySelector('#num2').value

        const datas = {
            timeA: timeA,
            timeB: timeB,
            num: Math.floor(num)
        }
        if (datas.num > 0) setTimeout(() => {
            requireFunc2List(datas, setFunc2)
        }, 10)
    }
    const handleClickChart = (e) => {
        e.preventDefault()
        const type = document.querySelector('#npp').value
        const datas = {
            name: type,
        }
        if (type !== '') setTimeout(() => {
            requiretTotalNPP(datas, setTotal)
        }, 10)
    }
    // console.log(('total', tatal));
    let dataChart = total ? total.map(item=>[item.Thang,item.TongTien]): [0,0]
    console.log("chart",...dataChart);
    return (
        <div id="table-f">
            <div>
                <h5>Procedure 1</h5>
                <select id="type" >
                    {loai.map(item =>
                        <option value={item.loai}>{item.Loai}</option>)}
                </select>
                <input id="num" type="number" min="1" required defaultValue='1' />
                <button onClick={handleClick}>Send</button>
            </div>
            <div className="body-table" style={{ minHeight: '650px', marginTop: "24px" }}>
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
            <div style={{ borderTop: '2px solid black' }}>
                <h5>Procedure 2</h5>
                <input type="date" id="timeA" />
                <input type="date" id="timeB" />
                <input id="num2" type="number" min="1" defaultValue="1" required />
                <button type="submit" onClick={handleClickFunc2}>Send</button>
            </div>
            <div className="body-table" style={{ borderTop: '2px solid black', minHeight: '650px', marginTop: "24px" }}>
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
            <div className="body-table" style={{ borderTop: '2px solid black', minHeight: '650px', marginTop: "24px" }}>
                <div className="chart">
                            <div className="chart-title">                <h5>Tổng tiền phải trả cho từng nhà phân phối trong năm</h5>
                <select id="npp" >
                    {nPP.map(item =>
                        <option value={item.MaSoNhaPhanPhoi}>{item.TenNhaPhanPhoi}</option>)}
                </select>
                <button type="submit" onClick={handleClickChart}>Send</button>
                
                </div>

                <Chart
                    width={'100%'}
                    height={'400px'}
                    
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Tháng', 'Tổng tiền'],
                        ...dataChart
                    ]}
                    options={{
                        hAxis: {
                            title: 'Tháng',
                        },
                        vAxis: {
                            title: 'Tổng tiền',
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
                </div>
            </div>
        </div>
    )
}

export default Table;