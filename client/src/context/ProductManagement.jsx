import {useState, createContext, useEffect} from "react";
import {
    requireProductList,
    requireCustomerList
} from '../api/services';


export const ProductManagement = createContext();


const ProductProvider = ({children}) => {

    const [productList, setProductList] = useState([]);
    const [customerList,setCustomerList] =useState([])

    useEffect(() =>{
        requireProductList(setProductList)
        requireCustomerList(setCustomerList)

    }, []);

    const data = {
        productList,
        setProductList,
        customerList,
        setCustomerList
    };

    return (
        <ProductManagement.Provider value={data}>
            {children}
        </ProductManagement.Provider>
    )
}

export default ProductProvider;