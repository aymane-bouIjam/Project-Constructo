import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/Auth.jsx';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import{apiUrl} from '../common/http.jsx'

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const res = await fetch(apiUrl+'authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        console.log(data)
        const result = await res.json();
        if (result.status === false) {
            toast.error(result.message);
        } else {
            const userInfo = {
                id: result.id,
                token: result.token,
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo)); 
            console.log(result);

           
            if (result.needs_password_change === true) {
                toast.info('Veuillez changer votre mot de passe temporaire.');
                navigate('/admin/change-password'); 
            } else if (result.needs_password_change === false) {
                login(userInfo);
                navigate('/admin/Dashboard'); 
            }
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
                                    <h4 className="mb-4">Authentification d'Admin</h4>
                                    <div className="mb-4">
                                        <input
                                            {...register('email', {
                                                required: 'Ce champ est obligatoire',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Veuillez entrer une adresse email valide',
                                                },
                                            })}
                                            type="text"
                                            className={`form-control form-control-md ${errors.email && 'is-invalid'}`}
                                            name="email"
                                            placeholder="Votre Email"
                                        />
                                        {errors.email && <p className="fs-6 invalid-feedback">{errors.email?.message}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            {...register('password', {
                                                required: 'Ce champ est obligatoire',
                                            })}
                                            type="password"
                                            className={`form-control form-control-md ${errors.password && 'is-invalid'}`}
                                            name="password"
                                            placeholder="Votre Mot de passe"
                                        />
                                        {errors.password && <p className="fs-6 invalid-feedback">{errors.password?.message}</p>}
                                    </div>
                                    <button type="submit" className="btn btn-primary small">Connexion</button>
                                </form>
                                <div className="mt-3 text-center">
                                    <a 
                                        href="#!" 
                                        onClick={() => navigate('/admin/forgot-password')}
                                    >
                                        Mot de passe oublié ?
                                    </a>
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

export default Login;
