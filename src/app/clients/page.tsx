import React from 'react';

interface Client {
    name: string;
    logo: string;
    description: string;
}

const clients: Client[] = [
    {
        name: 'Client A',
        logo: '/assets/logos/client-a.png',
        description: 'Desarrollo de una plataforma de comercio electrónico personalizada.',
    },
    {
        name: 'Client B',
        logo: '/assets/logos/client-b.png',
        description: 'Implementación de una solución de análisis de datos en tiempo real.',
    },
    {
        name: 'Client C',
        logo: '/assets/logos/client-c.png',
        description: 'Diseño y desarrollo de una aplicación móvil para gestión de tareas.',
    },
];

const ClientsPage: React.FC = () => {
    return (
        <div className="clients-page">
            <h1 className="title">Clientes con los que he trabajado</h1>
            <div className="clients-list">
                {clients.map((client, index) => (
                    <div key={index} className="client-card">
                        <img src={client.logo} alt={`${client.name} logo`} className="client-logo" />
                        <h2 className="client-name">{client.name}</h2>
                        <p className="client-description">{client.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientsPage;