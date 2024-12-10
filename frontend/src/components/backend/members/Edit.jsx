import Header from '../../common/Header.jsx'
import Footer from '../../common/Footer.jsx'
import Sidebar from '../../common/Sidebar.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, fileUrl, token } from '../../common/http.jsx'
import { toast } from 'react-toastify'
import React, { useState, useRef } from 'react';

const EditMember = () => {
    const [member, setMember] = useState('');
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const params = useParams();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + 'members/' + params.id, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();
            console.log(result);
            setMember(result.member);
            setImageId(result.member.image_id);
            return {
                name: result.member.name,
                job_title: result.member.job_title,
                linkedin_url: result.member.linkedin_url,
                status: result.member.status
            }
        }
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newData = { ...data, "image_id": imageId };

        const res = await fetch(apiUrl + 'members/' + params.id, {
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
            navigate('/admin/members');
        } else {
            toast.error(result.message);
        }
    };

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);

        await fetch(apiUrl + 'temp-images', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === false) {
                    toast.error(result.errors.image[0]);
                } else {
                    setImageId(result.data.id);
                }
            });
    };

    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className='h5'>Membres / Modifier</h4>
                                        <Link to="/admin/members" className="btn btn-primary">Retourner</Link>
                                    </div>
                                    <hr />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className='form-label'>Nom</label>
                                            <input
                                                {...register('name', {
                                                    required: "Nom est obligatoire"
                                                })}
                                                type='text' className={`form-control ${errors.name && 'is-invalid'}`} placeholder='Nom' />
                                            {
                                                errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="job_title" className='form-label'>Titre du poste</label>
                                            <input
                                                {...register('job_title', {
                                                    required: "Titre du poste est obligatoire"
                                                })}
                                                type='text' className={`form-control ${errors.job_title && 'is-invalid'}`} placeholder='Titre du poste' />
                                            {
                                                errors.job_title && <p className='invalid-feedback'>{errors.job_title?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="linkedin_url" className='form-label'>Lien LinkedIn</label>
                                            <input
                                                {...register('linkedin_url')}
                                                type='text' className='form-control' placeholder='Lien LinkedIn' />
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
                                            <input type='file' className='form-control mb-3' onChange={handleFile} />
                                            {
                                                member.image && <img width='300' src={`${fileUrl}uploads/members/${member.image}`} />
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <button type='submit' className='btn btn-primary' disabled={isDisable}>Modifier</button>
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
}

export default EditMember;

