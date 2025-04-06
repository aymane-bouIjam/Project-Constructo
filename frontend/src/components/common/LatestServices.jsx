import { useEffect, useState } from 'react';
import { apiUrl, fileUrl} from '../common/http.jsx'
import { Link } from 'react-router-dom';
const LatestServices = ()=>{
    const  [services, setServices] = useState([]);
    const fetchLatestServices = async() =>{
        const res = await fetch(apiUrl+'get-latest-services',{
            'method' : 'GET',
        });
        const result = await res.json();
        setServices(result.data)
    }
    useEffect(()=>{
        fetchLatestServices()
    },[])

    return(
        <>
              <section className="section-3">
                <div className="container py-5">
                    <div className="section-header text-center" id='services'>
                        <span>Nos Services</span>
                        <hr/>
                        <h2>Nos services de construction</h2>
                        <p>Nous offrons une gamme diversifiée de services de construction, couvrant les projets résidentiels, commerciaux et industriels.</p>
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
        </>
    )
}
export default LatestServices