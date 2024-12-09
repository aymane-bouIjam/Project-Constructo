import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/send-reset-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log(result)

            if (result.status === true) {
                toast.success(result.message); 
            } else {
                toast.error(result.message); 
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while sending the email.');
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="container my-5 d-flex justify-content-center">
                    <div className="forgot-password-form">
                        <div className="card border-0 shadow">
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h4 className="mb-4">Mot de passe oublié ?</h4>
                                    <div className="mb-4">
                                        <input
                                            {...register('email', {
                                                required: 'This field is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Please enter a valid email address',
                                                },
                                            })}
                                            type="email"
                                            className={`form-control form-control-md ${errors.email && 'is-invalid'}`}
                                            placeholder="Votre email"
                                        />
                                        {errors.email && <p className="fs-6 invalid-feedback">{errors.email?.message}</p>}
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
}

export default ForgotPassword;
