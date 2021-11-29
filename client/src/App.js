import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Sidebar from './components/Sidebar'
import ProductManagement from "./context/ProductManagement";
import routes from "./routes";
function App() {
  return (

    <ProductManagement>
    <BrowserRouter>
    <Sidebar/>
      <Routes>
      {
        [
        ...routes.map((route, index) => 
          <Route exact path={route.path} element={route.component} key={index}></Route>
        )
        ]
      }
      </Routes>
      </BrowserRouter>
      </ProductManagement>
  );
}

export default App;

