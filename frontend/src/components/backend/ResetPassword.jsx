import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import { apiUrl } from '../common/http.jsx';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token'); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await axios.post(apiUrl+'reset-password', {
                token,
                new_password: password,
                new_password_confirmation: confirmPassword,
            });

            setMessage(response.data.message);
            toast.success('Mot de passe réinitialisé avec succès!');
            setTimeout(() => {
                navigate('/admin');
            }, 2000);
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
            );
            toast.error(message);
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="container my-5 d-flex justify-content-center">
                    <div className="login-form">
                        <div className="card border-0 shadow">
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    <h4 className="mb-4">Réinitialisation</h4>
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            className="form-control form-control-md"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nouveau mot de passe"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            className="form-control form-control-md"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirmez nouveau mot de passe"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary small">Envoyer</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ResetPassword;
