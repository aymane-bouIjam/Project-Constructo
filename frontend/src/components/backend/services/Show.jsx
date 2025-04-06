import Header from '../../common/Header.jsx'
import Footer from '../../common/Footer.jsx'
import Sidebar from '../../common/Sidebar.jsx'
import {useState, useEffect} from 'react'
import {apiUrl, token} from '../../common/http.jsx'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Show = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'id',
        direction: 'ascending'
    });
    const [itemsPerPage] = useState(3);

    const mode = useSelector((state) => state.mode.darkMode);
    
    const fetchServices = async () => {
        const res = await fetch(apiUrl+'services', {
            'method': 'GET',
            'headers': {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setServices(result.services);
        setFilteredServices(result.services);
    }

    const deleteService = async (id) => {
        if(confirm("Veuillez confirmer la suppression de ce service!")) {
            const res = await fetch(apiUrl+'services/'+id, {
                'method': 'DELETE',
                'headers': {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();
            if(result.status === true) {
                const newServices = services.filter(service => service.id !== id);
                setServices(newServices);
                setFilteredServices(newServices);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        }
    }

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        let sortableServices = [...filteredServices];
        if (sortConfig.key) {
            sortableServices.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setFilteredServices(sortableServices);
    }, [sortConfig]);

    useEffect(() => {
        const results = services.filter(service => {
            return (
                service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.slug.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredServices(results);
        setCurrentPage(1);
    }, [searchTerm, services]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
        }
        return '';
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const paginationStyle = mode ? {
        pageItem: "page-item",
        pageLink: "page-link bg-dark text-light border-secondary",
        activePageLink: "page-link bg-primary text-light border-secondary", 
    } : {
        pageItem: "page-item",
        pageLink: "page-link",
        activePageLink: "page-link"
    };

    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-3 mb-4">
                            {<Sidebar />}
                        </div>
                        <div className="col-md-9">
                            <div className={`card shadow border-0`}>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className='h5'>Services</h4>
                                        <Link to="/admin/services/create" className="btn btn-primary">Créer</Link>
                                    </div>
                                    <hr/>
                                    
                                    <div className="mb-3 d-flex justify-content-end">
                                        <div className="position-relative" style={{ maxWidth: '300px' }}>
                                            <input
                                                type="text"
                                                className={`form-control ${mode ? "bg-dark text-light border-secondary" : ""}`}
                                                placeholder="Rechercher ..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                style={{ paddingRight: '35px' }}
                                            />
                                            <div style={{ 
                                                position: 'absolute', 
                                                right: '10px', 
                                                top: '50%', 
                                                transform: 'translateY(-50%)', 
                                                pointerEvents: 'none',
                                                color: mode ? '#fff' : '#000'
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <table className={`table table-striped text-center table-responsive table-hover ${mode ? "table-dark" : "table-light"}`}>
                                        <thead>
                                            <tr>
                                                <th onClick={() => requestSort('id')} style={{cursor: 'pointer'}}>
                                                    ID{getSortIndicator('id')}
                                                </th>
                                                <th onClick={() => requestSort('title')} style={{cursor: 'pointer'}}>
                                                    Titre{getSortIndicator('title')}
                                                </th>
                                                <th onClick={() => requestSort('slug')} style={{cursor: 'pointer'}}>
                                                    Référence{getSortIndicator('slug')}
                                                </th>
                                                <th onClick={() => requestSort('status')} style={{cursor: 'pointer'}}>
                                                    Statut{getSortIndicator('status')}
                                                </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems.length > 0 ? (
                                                    currentItems.map((service) => {
                                                        return (
                                                            <tr key={service.id}>
                                                                <td>{service.id}</td>
                                                                <td>{service.title}</td>
                                                                <td>{service.slug}</td>
                                                                <td>{
                                                                    (service.status == 1) ? 'Active' : 'Blocked'
                                                                }</td>
                                                                <td className='text-center'>
                                                                    <Link to={`/admin/services/edit/${service.id}`} className="btn btn-primary small">Modifier</Link>
                                                                    <button className="btn btn-secondary ms-3 small" onClick={() => deleteService(service.id)}>Supprimer</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5">Aucun service trouvé</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    
                                    {totalPages > 1 && (
                                        <nav className="mt-4" aria-label="Services pagination">
                                            <ul className="pagination justify-content-center">
                                                <li className={`${paginationStyle.pageItem} ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button 
                                                        className={paginationStyle.pageLink}
                                                        onClick={() => paginate(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Précédent
                                                    </button>
                                                </li>
                                                
                                                {[...Array(totalPages).keys()].map(number => (
                                                    <li key={number + 1} className={`${paginationStyle.pageItem} ${currentPage === number + 1 ? 'active' : ''}`}>
                                                        <button 
                                                            className={currentPage === number + 1 ? paginationStyle.activePageLink : paginationStyle.pageLink}
                                                            onClick={() => paginate(number + 1)}
                                                        >
                                                            {number + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                
                                                <li className={`${paginationStyle.pageItem} ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button 
                                                        className={paginationStyle.pageLink}
                                                        onClick={() => paginate(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Suivant
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                    
                                    <div className="text-center mt-2">
                                        <small>Affichage de {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredServices.length)} sur {filteredServices.length} services</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Show;