import React from "react";
import './index.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Sidebar(props){
    const location = useLocation();
    const homeClass = location.pathname === "/" ? "active" : "";
    const customer = location.pathname.match(/^\/customer/) ? "active" : "";
    const food = location.pathname.match(/^\/food/) ? "active" : "";
    return (
        <div className="sidebar">
                <ul>
                    <li><h2>AmazingFood</h2></li>
                    <li className={homeClass}><Link to="/"><i className="far fa-chart-bar"></i>Product</Link></li>
                   
                    <li className={customer}><Link to="/customer"><i className="fas fa-users"></i>Customer</Link></li>

                    <li className={food}><Link to="/food"><i className="fas fa-users"></i>Food</Link></li>
                </ul>
            </div>
    )
}

export default Sidebar;