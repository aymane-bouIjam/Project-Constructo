import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/frontend/Home.jsx';
import About from './components/frontend/About.jsx';
import Services from './components/frontend/Services.jsx';
import ServiceDetail from './components/frontend/ServiceDetail.jsx';
import Projects from './components/frontend/Projects.jsx';
import ProjectDetail from './components/frontend/ProjectDetail.jsx';
import ContactUs from './components/frontend/ContactUs.jsx';
import Login from './components/backend/Login.jsx';
import Dashboard from './components/backend/Dashboard.jsx';
import { default as ShowServices } from './components/backend/services/Show.jsx';
import { default as CreateService } from './components/backend/services/Create.jsx';
import { default as EditService } from './components/backend/services/Edit.jsx';
import { default as ShowProjects } from './components/backend/projects/Show.jsx';
import { default as CreateProject } from './components/backend/projects/Create.jsx';
import { default as EditProject } from './components/backend/projects/Edit.jsx';
import { default as ShowMembers } from './components/backend/members/Show.jsx';
import { default as CreateMember } from './components/backend/members/Create.jsx';
import { default as EditMember } from './components/backend/members/Edit.jsx';
import ChangePassword from './components/backend/ChangePassword.jsx';
import ResetPassword from './components/backend/ResetPassword.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/common/RequireAuth.jsx';
import ForgotPassword from './components/backend/ForgotPassword.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import "./assets/css/style.scss";


function App() {
  const mode = useSelector((state)=>state.mode.darkMode);
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', mode ? 'dark' : 'light');
  },[mode]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route path='/'  element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/service/:id' element={<ServiceDetail />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/project/:id' element={<ProjectDetail />} />
            <Route path='/contactUs' element={<ContactUs />} />
            <Route path='/admin' element={<Login />} />
            <Route path='/admin/forgot-password' element={<ForgotPassword />} />
            <Route path='/admin/reset-password' element={<ResetPassword />} />
            <Route path='/admin/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path='/admin/services' element={<RequireAuth><ShowServices /></RequireAuth>} />
            <Route path='/admin/services/create' element={<RequireAuth><CreateService /></RequireAuth>} />
            <Route path='/admin/services/edit/:id' element={<RequireAuth><EditService /></RequireAuth>} />
            <Route path='/admin/projects' element={<RequireAuth><ShowProjects /></RequireAuth>} />
            <Route path='/admin/projects/create' element={<RequireAuth><CreateProject /></RequireAuth>} />
            <Route path='/admin/projects/edit/:id' element={<RequireAuth><EditProject /></RequireAuth>} />
            <Route path='/admin/members' element={<RequireAuth><ShowMembers /></RequireAuth>} />
            <Route path='/admin/members/create' element={<RequireAuth><CreateMember /></RequireAuth>} />
            <Route path='/admin/members/edit/:id' element={<RequireAuth><EditMember /></RequireAuth>} />
            <Route path='/admin/change-password' element={<ChangePassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' autoClose={2000} />
    </>
  );
}

export default App;
