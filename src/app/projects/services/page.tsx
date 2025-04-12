import React from 'react';

const ServicesPage = () => {
    const services = [
        { id: 1, name: 'Desarrollo Web', description: 'Creación de sitios web modernos y responsivos.' },
        { id: 2, name: 'Aplicaciones Móviles', description: 'Desarrollo de aplicaciones móviles para iOS y Android.' },
        { id: 3, name: 'Consultoría Técnica', description: 'Asesoramiento en tecnología y mejores prácticas.' },
        { id: 4, name: 'Diseño UI/UX', description: 'Diseño de interfaces atractivas y fáciles de usar.' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Servicios Ofrecidos</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {services.map((service) => (
                    <li key={service.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                        <h2>{service.name}</h2>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesPage;