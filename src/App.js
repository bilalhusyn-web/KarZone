import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './Pages/web_pages/Navbar'
import Footer from './Pages/web_pages/Footer'
import PageNotFound from './Pages/web_pages/ErrorsPages/PageNotFound';
import Home from './Pages/web_pages/Home';
import ToastContainers from './Services/ToastContainer';
import Login from './Pages/web_pages/Login';
import AdminLogin from './Pages/admin_pages/AdminLogin';
import { useContext } from 'react';
import { Store } from './Services/Store';
import Dashboard from './Pages/admin_pages/Dashboard';
function App() {
const {state,dispatch}=useContext(Store)
const {Admin}=state
console.log(Admin)
  return (
   <>
   <BrowserRouter>
   
    {/* ToastContainer */}
    <ToastContainers/>

    {/* Navbar */}
   {Admin?null:<Navbar/>}

    {/* Routes */}
   <Routes>

    {/* Web Routes */}
   <Route path='/' element={<Home/>} />   
   <Route path='*' element={<PageNotFound/>} />

    {/* User Routes */}
   <Route path='/user/login' element={<Login/>} />   

    {/* Admin Routes */}
   <Route path='/admin' element={<AdminLogin/>} />   
   <Route path='/admin/dashboard' element={<Dashboard/>} />   

   </Routes>

   {/* Footer */}
   {Admin?null:<Footer/>}
      </BrowserRouter>
   </>
  );
}

export default App;
