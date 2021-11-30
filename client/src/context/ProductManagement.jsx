import {useState, createContext, useEffect} from "react";
import {
    requireProductList,
    requireCustomerList,
    requireManlList
} from '../api/services';


export const ProductManagement = createContext();


const ProductProvider = ({children}) => {

    const [productList, setProductList] = useState([]);
    const [customerList,setCustomerList] =useState([]);
    const [manlList,setManlList] =useState([]);


    useEffect(() =>{
        requireProductList(setProductList)
        requireCustomerList(setCustomerList)
        requireManlList(setManlList)

    }, []);

    const data = {
        productList,
        setProductList,
        customerList,
        setCustomerList,
        manlList,
        setManlList
    };

    return (
        <ProductManagement.Provider value={data}>
            {children}
        </ProductManagement.Provider>
    )
}

export default ProductProvider;