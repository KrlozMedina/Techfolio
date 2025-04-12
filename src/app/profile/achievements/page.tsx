import React from 'react';

const AchievementsPage = () => {
    const achievements = [
        {
            title: 'Premio al Mejor Desarrollador',
            description: 'Reconocimiento otorgado por la comunidad de desarrolladores en 2022.',
            date: '2022',
        },
        {
            title: 'Contribución Destacada en Open Source',
            description: 'Aportaciones significativas a proyectos de código abierto.',
            date: '2021',
        },
        {
            title: 'Reconocimiento por Innovación Tecnológica',
            description: 'Premio recibido por desarrollar soluciones innovadoras en el sector.',
            date: '2020',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Premios y Reconocimientos</h1>
            <ul>
                {achievements.map((achievement, index) => (
                    <li key={index} style={{ marginBottom: '15px' }}>
                        <h2>{achievement.title}</h2>
                        <p>{achievement.description}</p>
                        <small>{achievement.date}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AchievementsPage;