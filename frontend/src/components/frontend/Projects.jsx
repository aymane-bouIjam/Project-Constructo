import Header from '../common/Header.jsx'
import Footer from '../common/Footer.jsx'
import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from '../common/http.jsx'
import { Link } from 'react-router-dom';

function Projects() {
    const [projects, setProjects] = useState([]);
    
    const fetchAllProjects = async () => {
        const res = await fetch(apiUrl + 'get-projects', {
            method: 'GET',
        });
        const result = await res.json();
        setProjects(result.data);
    }

    useEffect(() => {
        fetchAllProjects();
    }, []);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="section-13">
                    <div className="hero d-flex align-items-center">
                        <div className="container">
                            <div className="text-left">
                                <span>Excellence. Fiabilité. Innovation.</span>
                                <h1>Nos Projets</h1>
                                <p>Nous proposons une large gamme de projets de construction,<br /> couvrant les secteurs résidentiel, commercial et industriel.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Our Projects */}
                <section className="section-14 p-5 bg-light">
                    <div className="container">
                        <div className="section-header text-center">
                            <span>Nos Réalisations</span>
                            <hr/>
                                <h2>Nos Projets de Construction</h2>
                                <p>Nous offrons des solutions de construction complètes, intégrant des projets résidentiels, commerciaux et industriels avec expertise et innovation.</p>
                            <hr/>
                        </div>
                        <div className="row pt-4">
                            {
                                projects && projects.map(project => {
                                    return (
                                        <div key={project.id} className="col-12 col-md-6 col-xl-4">
                                            <div className="item">
                                                <div className="project-image">
                                                    <img src={fileUrl + 'uploads/projects/' + project.image} className='w-100' />
                                                </div>
                                                <div className="project-body">
                                                    <div className="project-title">
                                                        <h3>{project.title}</h3>
                                                    </div>
                                                    <div className="project-content">
                                                        <p>
                                                            {project.short_desc}
                                                        </p>
                                                    </div>
                                                    <Link to={'/project/' + project.id} className="btn btn-primary small">Lire plus</Link>
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
            <Footer />
        </>
    );
}

export default Projects;
