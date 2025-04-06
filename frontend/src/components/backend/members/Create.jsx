import Header from '../../common/Header.jsx';
import Footer from '../../common/Footer.jsx';
import Sidebar from '../../common/Sidebar.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../common/http.jsx';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

const CreateMember = () => {
    const [imageId, setImageId] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState('');
    const [fileName, setFileName] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (uploadStatus === 'uploading') {
            toast.warning("Veuillez attendre la fin du téléchargement de l'image");
            return;
        }
        
        if (!imageId && uploadStatus !== 'success') {
            toast.warning("Veuillez télécharger une image");
            return;
        }
        
        const newData = { ...data, 'image_id': imageId };

        try {
            const res = await fetch(apiUrl + 'members', {
                method: 'POST',
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
                navigate('/admin/members');
            } else {
                toast.error(result.message || "Erreur lors de la création du membre");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Erreur lors de la soumission du formulaire: " + error.message);
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
                <div className='container my-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Sidebar />
                        </div>
                        <div className='col-md-9'>
                            <div className='card shadow border-0'>
                                <div className='card-body p-4'>
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='h5'>Membres / Créer</h4>
                                        <Link to='/admin/members' className='btn btn-primary'>Retourner</Link>
                                    </div>
                                    <hr />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <label htmlFor='name' className='form-label'>Nom</label>
                                            <input
                                                {...register('name', {
                                                    required: 'Ce champs est obligatoire'
                                                })}
                                                type='text' className={`form-control ${errors.name && 'is-invalid'}`} placeholder='Nom' />
                                            {
                                                errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='job_title' className='form-label'>Titre du poste</label>
                                            <input
                                                {...register('job_title', {
                                                    required: 'Ce champs est obligatoire'
                                                })}
                                                type='text' className={`form-control ${errors.job_title && 'is-invalid'}`} placeholder='Titre du poste' />
                                            {
                                                errors.job_title && <p className='invalid-feedback'>{errors.job_title?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='linkedin_url' className='form-label'>Lien LinkedIn</label>
                                            <input
                                                {...register('linkedin_url')}
                                                type='text' className='form-control' placeholder='Lien LinkedIn' />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='status' className='form-label'>Statut</label>
                                            <select
                                                {...register('status')}
                                                className='form-control'>
                                                <option value='1'>Active</option>
                                                <option value='0'>Bloqué</option>
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='image' className='form-label'>Image</label>
                                            <input
                                                type='file' 
                                                className='form-control' 
                                                onChange={handleFile} 
                                                disabled={uploadStatus === 'uploading'} />
                                            {renderUploadStatus()}
                                        </div>
                                        <div className='mb-3'>
                                            <button 
                                                type='submit' 
                                                className='btn btn-primary'
                                                disabled={isSubmitting || uploadStatus === 'uploading'}>
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Traitement...
                                                    </>
                                                ) : (
                                                    'Ajouter'
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

export default CreateMember;