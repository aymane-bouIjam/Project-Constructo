import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from './modeSlice';

function Header() {
  const dispatch = useDispatch();
  const mode = useSelector((state)=>state.mode.darkMode);
  const changeMode = () =>{
      localStorage.setItem('theme', !mode);
      dispatch(toggleDarkMode());
  }
  return (
    <header>
        <div className="container header py-3">
            <Navbar expand="lg">
                <Navbar.Brand href="/" className='logo'><span>Const</span>ructo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggler'  />
                <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ms-auto">
                <Nav.Link href="/" className='nav-link'>Accueil</Nav.Link>
                  <Nav.Link href="/about" className='nav-link'>À Propos</Nav.Link>
                  <Nav.Link href="/services" className='nav-link'>Services</Nav.Link>
                  <Nav.Link href="/projects" className='nav-link'>Projets</Nav.Link>
                  <Nav.Link href="/contactUs" className='nav-link'>Contactez-Nous</Nav.Link>
                  <Nav.Link className='nav-link' onClick={changeMode}>
                   <i className={`${!mode ?  'bi bi-brightness-high-fill' : 'bi bi-moon-fill text-warning'}`}></i></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
       
    </header>
  )
}

export default Header