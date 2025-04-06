import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/Auth';
import{apiUrl} from '../common/http.jsx'
import Header from '../common/Header';
import Footer from '../common/Footer';

function ChangePassword() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

        if (!token) {
            toast.error("You must be logged in to change your password.");
            navigate('/admin');
            return;
        }

        const res = await fetch(apiUrl+'change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (result.status === false) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            navigate('/admin/dashboard');
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h4 className="mb-4">Changer le Mot de Passe</h4>

                                    <div className="mb-4">
                                        <label htmlFor="old_password" className="form-label">Ancien</label>
                                        <input
                                            {...register('old_password', { required: "Old password is required" })}
                                            type="password"
                                            className={`form-control form-control-md ${errors.old_password && 'is-invalid'}`}
                                            name="old_password"
                                            placeholder="Votre ancien mot de passe"
                                        />
                                        {errors.old_password && <p className="fs-6 invalid-feedback">{errors.old_password.message}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="new_password" className="form-label">Nouveau</label>
                                        <input
                                            {...register('new_password', { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                            type="password"
                                            className={`form-control form-control-md ${errors.new_password && 'is-invalid'}`}
                                            name="new_password"
                                            placeholder="Votre nouveau mot de passe"
                                        />
                                        {errors.new_password && <p className="fs-6 invalid-feedback">{errors.new_password.message}</p>}
                                    </div>

                                    <button type="submit" className="btn btn-primary">Valider</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ChangePassword;
