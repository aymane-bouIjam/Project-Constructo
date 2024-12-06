import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/frontend/Home.jsx'
import About from './components/frontend/About.jsx'
import Services from './components/frontend/Services.jsx'
import ServiceDetail from './components/frontend/ServiceDetail.jsx'
import Projects from './components/frontend/Projects.jsx'
import ContactUs from './components/frontend/ContactUs.jsx'
import Login from './components/backend/Login.jsx'
import Dashboard from './components/backend/Dashboard.jsx'
import {default as ShowServices} from './components/backend/services/Show.jsx'
import {default as CreateService} from './components/backend/services/Create.jsx'
import {default as EditService} from './components/backend/services/Edit.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.scss'
import RequireAuth from './components/common/RequireAuth.jsx'

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/service/:id' element={<ServiceDetail/>}/>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contactUs' element={<ContactUs/>}/>
            <Route path='/admin' element={<Login/>}/>
            <Route path='/admin/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/>
            <Route path='/admin/services' element={<RequireAuth><ShowServices/></RequireAuth>}/>
            <Route path='/admin/services/create' element={<RequireAuth><CreateService/></RequireAuth>}/>
            <Route path='/admin/services/edit/:id' element={<RequireAuth><EditService/></RequireAuth>}/>
        </Routes>
     </BrowserRouter>
     <ToastContainer position='top-center' />
    </>
  )
}

export default App
