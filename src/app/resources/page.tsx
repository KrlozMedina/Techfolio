import React from 'react';

const ResourcesPage: React.FC = () => {
    const resources = [
        {
            title: 'React Documentation',
            description: 'Oficial documentación de React para aprender y consultar.',
            link: 'https://reactjs.org/docs/getting-started.html',
        },
        {
            title: 'TypeScript Handbook',
            description: 'Guía oficial para aprender TypeScript.',
            link: 'https://www.typescriptlang.org/docs/',
        },
        {
            title: 'MDN Web Docs',
            description: 'Recursos y documentación para desarrolladores web.',
            link: 'https://developer.mozilla.org/',
        },
        {
            title: 'FreeCodeCamp',
            description: 'Tutoriales y recursos gratuitos para aprender programación.',
            link: 'https://www.freecodecamp.org/',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Recursos Útiles</h1>
            <p>Comparte y explora recursos útiles relacionados con el desarrollo web.</p>
            <ul>
                {resources.map((resource, index) => (
                    <li key={index} style={{ marginBottom: '15px' }}>
                        <h2>{resource.title}</h2>
                        <p>{resource.description}</p>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            Visitar recurso
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResourcesPage;