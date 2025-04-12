import React from 'react';

const ExperiencePage = () => {
    const experiences = [
        {
            company: 'Tech Solutions Inc.',
            role: 'Frontend Developer',
            duration: 'Jan 2020 - Present',
            description: 'Developed and maintained user interfaces using React and TypeScript. Collaborated with designers and backend developers to deliver high-quality web applications.',
        },
        {
            company: 'Web Innovators',
            role: 'Junior Developer',
            duration: 'Jun 2018 - Dec 2019',
            description: 'Assisted in building responsive websites and web applications. Gained experience in JavaScript, HTML, and CSS.',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Experiencia Profesional</h1>
            {experiences.map((exp, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h2>{exp.role} - {exp.company}</h2>
                    <p><strong>Duración:</strong> {exp.duration}</p>
                    <p>{exp.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ExperiencePage;