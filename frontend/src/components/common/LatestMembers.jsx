import { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from '../common/http.jsx';
import { Link } from 'react-router-dom';

const LatestMembers = () => {
    const [members, setMembers] = useState([]);
    const linkedinIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
        </svg>
    );


    const fetchLatestMembers = async () => {
        const res = await fetch(apiUrl + 'get-latest-members', {
            method: 'GET',
        });
        const result = await res.json();
        setMembers(result.data);
    };

    useEffect(() => {
        fetchLatestMembers();
    }, []);

    return (
        <>
             <section className="section-10 p-3">
                    <div className="container">
                        <div className="section-header text-center">
                            <span>Notre Équipe</span>
                            <hr/>
                            <h2>Rencontrez Nos Derniers Membres</h2>
                            <p>Faites connaissance avec les nouvelles recrues de notre équipe, apportant de nouvelles perspectives et une expertise à nos projets.</p>
                        </div>
                        <hr/>
                        <div className="row pt-4">
                            {
                                members && members.map(member => {
                                    return (
                                        <div key={member.id} className="col-12 col-md-6 col-xl-4">
                                            <div className="item shadow">
                                                <div className="member-image">
                                                    <img src={fileUrl + 'uploads/members/' + member.image}  alt={member.name} />
                                                </div>
                                                <hr/>
                                                <div className="member-body">
                                                    <div className="member-title">
                                                        <h3>{member.name}</h3>
                                                    </div>
                                                    <hr/>
                                                    <div className="member-content">
                                                        <p>{member.job_title}</p>
                                                        <a href="#">
                                                            {linkedinIcon}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>
        </>
    );
};

export default LatestMembers;
