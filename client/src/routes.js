
// import Admin from "./components/Dashboard/index"
import AdminProduct from './components/ManageProduct/ManageProduct'
import AdminCustomer from './components/ManageCustomer/ManageCustomer'
// import Statistics from './components/Statistics'
// eslint-disable-next-line import/no-anonymous-default-export
export default  [


    // {
    //     path: '/DashBoard',
    //     exact: true,
    //     public: true,
    //     component: <Admin />
    // },
    {
        path: '/',
        exact: true,
        public: true,
        component: <AdminProduct />
    },
    {
        path: '/customer',
        exact: true,
        public: true,
        component: <AdminCustomer />
    }, 
    // {
    //     path: '/statistics',
    //     exact: true,
    //     public: true,
    //     component: <Statistics />
    // }

];
