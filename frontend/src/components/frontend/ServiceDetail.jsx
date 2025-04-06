import Header from "../common/Header.jsx"
import Footer from "../common/Footer.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import { apiUrl, fileUrl } from "../common/http.jsx";
import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react"

const ServiceDetail = ()=>{
    const params = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState([])
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(true);

    const fetchService = async ()=>{
        const res = await fetch(apiUrl+'get-service/'+params.id,{
            'method' : 'GET',
        });
        const result = await res.json();
        setService(result.data)
    }
    const fetchAllServices = async ()=>{
        const res = await fetch(apiUrl+'get-services',{
            'method' : 'GET',
        });
        const result = await res.json();
        setServices(result.data)
    }
    useEffect(()=>{
        fetchService()
        fetchAllServices()
    },[params.id]);

  
    const handleClose = () => {
        setShowModal(false);
        navigate("/services");
    }

    return(
        <>
        <main>
            <Modal show={showModal} onHide={handleClose}>
               
                <Modal.Body className="card shadow border-0">
                <Modal.Header closeButton>
                </Modal.Header>
                        <div className="card-body p-4 ">
                            <div className="d-flex flex-column align-items-center">
                                <img  src={`${fileUrl}uploads/services/${service.image}`} alt="image"  className="img-fluid"/>
                            </div>
                            <hr/>
                                <h3 className="py-5 text-center">{service.title}</h3>
                                <hr/>
                            <div dangerouslySetInnerHTML={{__html:service.content}} className="text-justify">
                            </div>
                        </div>
                        <Modal.Footer>
                        </Modal.Footer>
                </Modal.Body>
               
            </Modal>
        </main>
        </>
    )
}
export default ServiceDetail