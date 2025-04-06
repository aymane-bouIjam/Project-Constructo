import React, { useState } from 'react';
import Header from "../common/Header";
import Footer from "../common/Footer";
import { toast } from 'react-toastify';
import{apiUrl} from '../common/http.jsx'

function ContactUS() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl+'send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Message envoyé avec succès !');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(result.error || "Échec de l'envoi du message.");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };

  return (
    <>
      <Header />
      <section className="section-17">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-left">
              <span>Compétence. Confiance. Performance.</span>
              <h1>Contactez-Nous</h1>
              <p>Nos experts dévoués sont à votre disposition pour répondre à<br/> toutes vos questions et vous accompagner tout au long de votre projet.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-18 p-5 bg-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Nous Contacter</h2>
            <hr/>
              <p>Contactez-nous en remplissant le formulaire et nous reviendrons vers vous rapidement.</p>
            <hr/>
          </div>
          <div className="row pt-4">
            <div className="col-xl-3">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <h3>Call us</h3>
                  <a href="#">(888-000-0000)</a><br/>
                  <a href="#">(222-123-12345)</a>
                  <div className="email my-4">
                    <h3>Email us</h3>
                    <a href="#">contact@constructo.com</a>
                  </div>
                  <h3>Adresse</h3>
                  <span>Villa 36, Avenue Hassan II, Quartier des Orangers, Marrakech, 40000</span>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="card shadow">
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="name" className="form-label">Nom</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Votre Nom"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Votre email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="phone" className="form-label">Téléphone</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Votre Téléphone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="subject" className="form-label">Sujet</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Sujet"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control form-control-lg"
                        placeholder="Votre Message"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary large">Envoyer</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactUS;