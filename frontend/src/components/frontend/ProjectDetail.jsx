import Header from "../common/Header.jsx"
import Footer from "../common/Footer.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import { apiUrl, fileUrl } from "../common/http.jsx"
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ProjectDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState([])
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(true);
    
    const fetchProject = async () => {
        const res = await fetch(apiUrl + 'get-project/' + params.id, {
            method: 'GET',
        });
        const result = await res.json();
        setProject(result.data)
    }
    const fetchAllProjects = async () => {
        const res = await fetch(apiUrl + 'get-projects', {
            method: 'GET',
        });
        const result = await res.json();
        setProjects(result.data)
    }
    useEffect(() => {
        fetchProject()
        fetchAllProjects()
    }, [params.id])

    const handleClose = () => {
        setShowModal(false);
        navigate(-1);
    }
    return (
        <>
        <main>
            <Modal show={showModal} onHide={handleClose}>
               
                <Modal.Body className="card shadow border-0">
                <Modal.Header closeButton>
                </Modal.Header>
                        <div className="card-body p-4 ">
                            <div className="d-flex flex-column align-items-center">
                                <img  src={`${fileUrl}uploads/projects/${project.image}`} alt="image"  className="img-fluid"/>
                            </div>
                            <hr/>
                                <h3 className="py-5 text-center">{project.title}</h3>
                                <hr/>
                            <div dangerouslySetInnerHTML={{__html:project.content}} className="text-justify">
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

export default ProjectDetail
