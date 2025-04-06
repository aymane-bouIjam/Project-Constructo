import Header from '../common/Header.jsx'
import Footer from '../common/Footer.jsx'
import { useEffect, useState } from 'react';
import { apiUrl, fileUrl} from '../common/http.jsx'
import { Link } from 'react-router-dom';

function Services() {
    const  [services, setServices] = useState([]);
    const fetchAllServices = async() =>{
        const res = await fetch(apiUrl+'get-services',{
            'method' : 'GET',
        });
        const result = await res.json();
        setServices(result.data)
    }
    useEffect(()=>{
        fetchAllServices()
    },[])
  return (
    <>
        <Header/>
        <main>
            {/* Hero Section */}
            <section className="section-11">
                <div className="hero d-flex align-items-center">
                    <div className="container">
                        <div className="text-left">
                            <span>Excellence. Fiabilité. Innovation.</span>
                            <h1>Nos Services</h1>
                            <p>Nous fournissons une variété étendue de services de construction,<br/> couvrant des projets résidentiels, commerciaux et industriels.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Our Services */}
            <section className="section-12 p-4 bg-light p-5">
            <div className="container">
                <div className="section-header text-center">
                    <span>Nos Services</span>
                    <hr/>
                    <h2>Nos services de construction</h2>
                    <p>Nous assurons des solutions complètes en construction, intégrant des projets résidentiels, commerciaux et industriels avec expertise et innovation.</p>
                    <hr/>
                </div>
                <div className="row pt-4">
                        {
                            services && services.map(service =>{
                                return(
                                    <div key={service.id} className="col-12 col-md-6 col-xl-4">
                                        <div className="item">
                                            <div className="service-image">
                                                <img src={fileUrl+'uploads/services/'+service.image} className='w-100' />
                                            </div>
                                            <div className="service-body">
                                                <div className="service-title">
                                                <h3>{service.title}</h3>
                                                </div>
                                                <div className="service-content">
                                                    <p>
                                                        {service.short_desc}
                                                    </p>
                                                </div>
                                                <Link to ={'/service/'+service.id} className="btn btn-primary small">Lire Plus</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
    </>
    
  )
}

export default Services