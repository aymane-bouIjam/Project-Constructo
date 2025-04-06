import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from '../common/http.jsx'
import { Link } from 'react-router-dom';

const LatestProjects = () => {
    const [projects, setProjects] = useState([]);

    const fetchLatestProjects = async () => {
        const res = await fetch(apiUrl + 'get-latest-projects', {
            method: 'GET',
        });
        const result = await res.json();
        setProjects(result.data);
    }

    useEffect(() => {
        fetchLatestProjects();
    }, []);

    return (
        <>
            <section className="section-5">
                <div className="container py-5">
                    <div className="section-header text-center">
                        <span>Nos Projets</span>
                        <hr/>
                        <h2>Nos Projets de Construction</h2>
                        <p>Nous proposons une gamme diversifiée de projets de construction, couvrant les secteurs résidentiel, commercial et industriel.</p>
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
        </>
    )
}

export default LatestProjects;
