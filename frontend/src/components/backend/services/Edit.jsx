import Header from '../../common/Header.jsx'
import Footer from '../../common/Footer.jsx'
import Sidebar from '../../common/Sidebar.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, fileUrl, token } from '../../common/http.jsx'
import { toast } from 'react-toastify'
import { Placeholder } from 'react-bootstrap'
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Edit = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [service, setService] = useState('');
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState('');
    const [fileName, setFileName] = useState('');
    const params = useParams();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: ''
    }), [placeholder]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + 'services/' + params.id, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();

            setContent(result.service.content);
            setService(result.service);
            return {
                title: result.service.title,
                slug: result.service.slug,
                short_desc: result.service.short_desc,
                status: result.service.status
            }
        }
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (uploadStatus === 'uploading') {
            toast.warning("Veuillez attendre la fin du téléchargement de l'image");
            return;
        }

        const newData = { ...data, "content": content, "image": imageId };

        try {
            setIsDisable(true);
            const res = await fetch(apiUrl + 'services/' + params.id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                },
                body: JSON.stringify(newData)
            });

            const result = await res.json();
            if (result.status === true) {
                toast.success(result.message);
                navigate('/admin/services');
            } else {
                toast.error(result.message || "Erreur lors de la modification du service");
                setIsDisable(false);
            }
        } catch (error) {
            toast.error("Erreur lors de la soumission du formulaire: " + error.message);
            setIsDisable(false);
        }
    };

    const handleFile = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        
        const file = e.target.files[0];
        setFileName(file.name);
        setUploadStatus('uploading');
        setUploadProgress(0);
        setUploadError('');
        
        const formData = new FormData();
        formData.append("image", file);

        try {
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    const newProgress = prev + Math.random() * 15;
                    return newProgress > 90 ? 90 : newProgress;
                });
            }, 300);
            
            const response = await fetch(apiUrl + 'temp-images', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                },
                body: formData
            });
            
            clearInterval(progressInterval);
            
            const result = await response.json();
            
            if (result.status === false) {
                setUploadStatus('error');
                setUploadProgress(0);
                setUploadError(result.errors?.image?.[0] || "Erreur pendant le téléchargement");
                toast.error(result.errors?.image?.[0] || "Erreur pendant le téléchargement");
            } else if (result.data && result.data.id) {
                setUploadStatus('success');
                setUploadProgress(100);
                setImageId(result.data.id);
                toast.success("Image téléchargée avec succès");
            } else {
                setUploadStatus('error');
                setUploadProgress(0);
                setUploadError("Format de réponse inattendu du serveur");
                toast.error("Format de réponse inattendu du serveur");
            }
        } catch (error) {
            setUploadStatus('error');
            setUploadProgress(0);
            setUploadError(error.message || "Erreur pendant le téléchargement");
            toast.error("Erreur pendant le téléchargement: " + error.message);
        }
    };

    const renderUploadStatus = () => {
        switch (uploadStatus) {
            case 'uploading':
                return (
                    <div className="mt-2">
                        <div className="d-flex align-items-center">
                            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                                <span className="visually-hidden">Téléchargement...</span>
                            </div>
                            <span>Téléchargement en cours: {fileName}</span>
                        </div>
                        <div className="progress mt-2" style={{ height: "6px" }}>
                            <div 
                                className="progress-bar progress-bar-striped progress-bar-animated" 
                                role="progressbar" 
                                style={{ width: `${uploadProgress}%` }}
                                aria-valuenow={uploadProgress} 
                                aria-valuemin="0" 
                                aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                );
            case 'success':
                return (
                    <div className="mt-2 text-success d-flex align-items-center">
                        <i className="bi bi-check-circle me-2"></i>
                        <span>Image téléchargée avec succès: {fileName}</span>
                    </div>
                );
            case 'error':
                return (
                    <div className="mt-2 text-danger d-flex align-items-center">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        <span>{uploadError || "Erreur pendant le téléchargement"}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-3">
                            {<Sidebar />}
                        </div>
                        <div className="col-md-9">
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className='h5'>Services / Modifier</h4>
                                        <Link to="/admin/services" className="btn btn-primary">Retourner</Link>
                                    </div>
                                    <hr />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className='form-label'>Titre</label>
                                            <input
                                                {...register('title', {
                                                    required: "Le titre est obligatoire"
                                                })}
                                                type='text' className={`form-control ${errors.title && 'is-invalid'}`} placeholder='Titre' />
                                            {
                                                errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="slug" className='form-label'>Référence</label>
                                            <input
                                                {...register('slug', {
                                                    required: "La référence est requise"
                                                })}
                                                type='text' className={`form-control ${errors.slug && 'is-invalid'}`} placeholder='Référence' />
                                            {
                                                errors.slug && <p className='invalid-feedback'>{errors.slug?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="short_desc" className='form-label'>Description</label>
                                            <textarea
                                                {...register('short_desc')}
                                                className='form-control' rows='4' placeholder='Description'></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="content"
                                                className='form-label'>Contenu</label>
                                            <JoditEditor
                                                ref={editor}
                                                value={content}
                                                config={config}
                                                tabIndex={1}
                                                onBlur={newContent => setContent(newContent)}
                                                onChange={newContent => {}}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="status" className='form-label'>Statut</label>
                                            <select
                                                {...register('status')}
                                                className='form-control'>
                                                <option value="1">Active</option>
                                                <option value="0">Bloqué</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className='form-label'>Image</label>
                                            <input 
                                                type='file' 
                                                className='form-control mb-3' 
                                                onChange={handleFile} 
                                                disabled={uploadStatus === 'uploading'} />
                                            {renderUploadStatus()}
                                            {
                                                service.image && (
                                                    <div className="mt-3">
                                                        <p>Image actuelle:</p>
                                                        <img width='300' src={fileUrl + 'uploads/services/' + service.image} alt="Current service image" />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <button 
                                                type='submit' 
                                                className='btn btn-primary' 
                                                disabled={isDisable || uploadStatus === 'uploading'}>
                                                {isSubmitting || isDisable ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Traitement...
                                                    </>
                                                ) : (
                                                    'Modifier'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Edit;