'use client';

import React from 'react';
import Link from 'next/link';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <header>
                <h1>Mi Perfil Profesional y Personal</h1>
                <nav>
                    <ul>
                        <li><Link href="/profile/about-me">Sobre Mí</Link></li>
                        <li><Link href="/profile/education">Educación</Link></li>
                        <li><Link href="/profile/skills">Habilidades</Link></li>
                        <li><Link href="/profile/certifications">Certificaciones</Link></li>
                        <li><Link href="/profile/experience">Experiencia Laboral</Link></li>
                        <li><Link href="/profile/achievements">Logros</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <p>Bienvenido a mi perfil. Selecciona una sección para obtener más información.</p>
            </main>
            <style jsx>{`
                .profile-page {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                header {
                    margin-bottom: 20px;
                }
                nav ul {
                    list-style: none;
                    padding: 0;
                    display: flex;
                    gap: 10px;
                }
                nav ul li {
                    margin: 0;
                }
                nav ul li a {
                    text-decoration: none;
                    color: #0070f3;
                }
                nav ul li a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;