import React from 'react';

const certifications = [
    {
        title: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'The Linux Foundation',
        date: 'June 2023',
    },
    {
        title: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        date: 'March 2023',
    },
    {
        title: 'Microsoft Certified: Azure Developer Associate',
        issuer: 'Microsoft',
        date: 'January 2023',
    },
];

const CertificationsPage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Certificaciones Profesionales y Técnicas</h1>
            <ul>
                {certifications.map((cert, index) => (
                    <li key={index} style={{ marginBottom: '15px' }}>
                        <h2>{cert.title}</h2>
                        <p><strong>Emitido por:</strong> {cert.issuer}</p>
                        <p><strong>Fecha:</strong> {cert.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CertificationsPage;