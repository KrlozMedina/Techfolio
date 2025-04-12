import React from 'react';

const BlogPage = () => {
    const articles = [
        {
            id: 1,
            title: 'Introducción a la Automatización',
            description: 'Descubre cómo la automatización puede mejorar tus procesos y ahorrar tiempo.',
            link: '/blog/introduccion-automatizacion',
        },
        {
            id: 2,
            title: 'Mejores Prácticas en Desarrollo Web',
            description: 'Aprende las mejores prácticas para construir aplicaciones web modernas.',
            link: '/blog/mejores-practicas-desarrollo-web',
        },
        {
            id: 3,
            title: 'Tendencias Tecnológicas 2023',
            description: 'Explora las tendencias tecnológicas más importantes de este año.',
            link: '/blog/tendencias-tecnologicas-2023',
        },
    ];

    return (
        <div className="blog-page">
            <h1 className="text-3xl font-bold mb-6">Blog de Tecnología, Desarrollo y Automatización</h1>
            <div className="articles-list">
                {articles.map((article) => (
                    <div key={article.id} className="article-card mb-4 p-4 border rounded shadow">
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p className="text-gray-600">{article.description}</p>
                        <a href={article.link} className="text-blue-500 hover:underline">
                            Leer más
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;