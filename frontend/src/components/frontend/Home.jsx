import Header from '../common/Header.jsx'
import Footer from '../common/Footer.jsx'
import AboutImg from '../../assets/images/about.webp'
import HeroVideo from '../../assets/images/hero.mp4';
import AvatarImg1 from '../../assets/images/avatar1.jpg'
import AvatarImg2 from '../../assets/images/avatar2.jpg'
import AvatarImg3 from '../../assets/images/avatar3.jpg'
import AvatarImg4 from '../../assets/images/avatar4.jpg'
import AvatarImg5 from '../../assets/images/avatar5.jpg'
import AvatarImg6 from '../../assets/images/avatar6.jpg'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect } from 'react';
import LatestServices from '../common/LatestServices.jsx';
import LatestProjects from '../common/LatestProjects.jsx';
import { Link } from 'react-router-dom';

    const Home = () => {
      
        const star = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    return (
        <>
        <Header/>
        <main>
            {/* Hero section */}
            <section className="section-1">
                <div className="hero">
                    <div className="container-fluid d-flex flex-column align-items-center justify-content-center  py-5">
                        <div className="hero-video">
                            <video autoPlay muted loop>
                                <source src={HeroVideo} type='video/mp4' />
                            </video>
                        </div>
                        <div className="overlay"></div>
                        <div className="text-center">
                            <span>Bienvenue chez Constructo</span>
                            <h1>Concrétiser vos rêves avec <br/> précision et excellence</h1>
                            <p>Nous excellons dans la transformation des visions en réalité grâce à un artisanat exceptionnel et une attention <br/> méticuleuse. Avec des années d'expérience et un engagement envers la qualité</p>
                            <div className=" hero-btn mx-auto w-50 d-flex justify-content-evenly py-3">
                                    <Link to="/contactUs" className='btn btn-primary large' >Contactez Nous</Link>
                                    <Link to="/projects" className='btn btn-secondary large'>Voir Projets</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      
            {/* Our Services */}
            <LatestServices/>
            {/* Why choose us */}
            <section className="section-4 bg-light">
                <div className="container py-5">
                    <div className="section-header text-center">
                        <span>Pourquoi nous choisir</span>
                        <h2>Notre engagement envers l'excellence</h2>
                        <p>Grâce à notre collaboration étroite avec les clients et les partenaires, nous mettons à profit notre expertise industrielle.</p>
                    </div>
                    <div className="row py-4">
                        <div className="col-md-6 col-xl-4">
                            <div className="card shadow border-0 p-4">
                                <div className="card-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
                                    </svg>
                                </div>
                                <div className="card-title mt-3">
                                    <h3>Solutions de pointe</h3>
                                </div>
                                <hr/>
                                <p>Les petites actions créent de grands impacts. Tout commence et se termine avec chaque employé s'engageant à adopter des pratiques de travail plus sûres quotidiennement, garantissant ainsi leur retour en sécurité.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4">
                            <div className="card shadow border-0 p-4">
                                <div className="card-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-cone-striped" viewBox="0 0 16 16">
                                    <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9s-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12m-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4s1.2-.036 1.725-.098m4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257z"/>
                                    </svg>
                                </div>
                                <div className="card-title mt-3">
                                <h3>Stratégies Innovantes</h3>
                                </div>
                                <hr/>
                                <p>Chaque détail compte. Notre équipe met en avant des stratégies innovantes qui améliorent l'efficacité et la sécurité sur le chantier. Cet engagement garantit que chaque projet achevé selon normes plus élevées.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4">
                            <div className="card shadow border-0 p-4">
                                <div className="card-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
                                    </svg>
                                </div>
                                <div className="card-title mt-3">
                                    <h3>Engagement Qualité</h3>
                                </div>
                                <hr/>
                                <p>L'excellence à chaque étape. Nous privilégions la qualité dans tous nos processus, de la planification à l'exécution. Cette approche garantit que nos projets surpassent les normes rigoureuses de l'industrie.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Our Project */}
            <LatestProjects/>
            {/* Testimonials */}
            <section className="section-6 bg-light">
                <div className="container py-5">
                    <div className="section-header text-center">
                        <span>Témoignages</span>
                        <h2>Ce que disent nos clients</h2>
                        <p>Grâce à notre expertise et notre dévouement, nous avons réalisé avec succès de nombreux projets toujours avec une satisfaction client inégalée.</p>
                    </div>
                    <Swiper
                                modules={[Pagination]}
                                spaceBetween={30}
                                breakpoints={{
                                    // Extra small devices (phones, less than 768px)
                                    0: { slidesPerView: 1, spaceBetween: 20 },
                                    
                                    // Medium devices (tablets, 768px and up)
                                    768: { slidesPerView: 1, spaceBetween: 40 },

                                    // Large devices (desktops, 992px and up, if needed)
                                    992: { slidesPerView: 2, spaceBetween: 50 },

                                    // Extra large devices (large desktops, 1200px and up)
                                    1200: { slidesPerView: 2, spaceBetween: 50 },
                                    1250: { slidesPerView: 3, spaceBetween: 50 },
                                }}
                                pagination={{ clickable: true }}
                            >
                        <SwiperSlide>
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="rating">{star}{star}{star}{star}{star}</div>
                                    <div className="content pt-4 pb-2">
                                        <p>"L'équipe a transformé notre immeuble de bureaux en un espace moderne et efficace. Respect et travail de haute qualité!"</p>
                                    </div>
                                    <hr/>
                                    <div className="d-flex">
                                        <div className='meta'>
                                            <img src={AvatarImg1} />
                                        </div>
                                        <div className='ps-3'>
                                            <div className='name'>Ahmed El Ouafi</div>
                                            <div>Directeur de Banque</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="rating">{star}{star}{star}{star}{star}</div>
                                    <div className="content pt-4 pb-2">
                                        <p>"Grâce à leur expertise, notre complexe touristique est désormais un incontournable et soigneusement pensé."</p>
                                    </div>
                                    <hr/>
                                    <div className="d-flex">
                                        <div className='meta'>
                                            <img src={AvatarImg2} />
                                        </div>
                                        <div className='ps-3'>
                                            <div className='name'>Moncef El Alami</div>
                                            <div>Directeur d'Hôtel</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="rating">{star}{star}{star}{star}{star}</div>
                                    <div className="content pt-4 pb-2">
                                        <p>"Un excellent partenaire pour nos projets industriels. Innovation et rigueur caractérisent leur approche professionnelle."</p>
                                    </div>
                                    <hr/>
                                    <div className="d-flex">
                                        <div className='meta'>
                                            <img src={AvatarImg3} />
                                        </div>
                                        <div className='ps-3'>
                                            <div className='name'>Hassan Rouchdi</div>
                                            <div>Ingénieur R&D</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="rating">{star}{star}{star}{star}{star}</div>
                                    <div className="content pt-4 pb-2">
                                        <p>"Nous sommes ravis de notre résidence. L'équipe a allié design et fonctionnalité pour créer notre maison de rêve, Parfait!."</p>
                                    </div>
                                    <hr/>
                                    <div className="d-flex">
                                        <div className='meta'>
                                            <img src={AvatarImg4} />
                                        </div>
                                        <div className='ps-3'>
                                            <div className='name'>Samira El Houari</div>
                                            <div>Propriétaire d'Immeuble</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="rating">{star}{star}{star}{star}{star}</div>
                                    <div className="content pt-4 pb-2">
                                        <p>"La rénovation de notre médina a été un grand succès. Le respect du patrimoine tout en modernisant est impressionnant."</p>
                                    </div>
                                    <hr/>
                                    <div className="d-flex">
                                        <div className='meta'>
                                            <img src={AvatarImg5} />
                                        </div>
                                        <div className='ps-3'>
                                            <div className='name'>Mourad Ait Ali</div>
                                            <div>Historien</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="rating">{star}{star}{star}{star}{star}</div>
                                    <div className="content pt-4 pb-2">
                                        <p>"La zone industrielle développée a attiré de nombreuses entreprises, créant des emplois et dynamisant l'économie locale."</p>
                                    </div>
                                    <hr/>
                                    <div className="d-flex">
                                        <div className='meta'>
                                            <img src={AvatarImg6} />
                                        </div>
                                        <div className='ps-3'>
                                            <div className='name'>Youness Chraibi</div>
                                            <div>Économiste</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    )
    }

    export default Home