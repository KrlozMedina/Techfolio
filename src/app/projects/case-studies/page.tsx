import React from 'react';

interface CaseStudy {
    id: number;
    title: string;
    problem: string;
    solution: string;
    results: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        title: 'Proyecto A',
        problem: 'Descripción del problema del Proyecto A.',
        solution: 'Descripción de la solución implementada en el Proyecto A.',
        results: 'Resultados obtenidos del Proyecto A.',
    },
    {
        id: 2,
        title: 'Proyecto B',
        problem: 'Descripción del problema del Proyecto B.',
        solution: 'Descripción de la solución implementada en el Proyecto B.',
        results: 'Resultados obtenidos del Proyecto B.',
    },
];

const CaseStudiesPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Proyectos Destacados</h1>
            {caseStudies.map((study) => (
                <div key={study.id} className="mb-8 p-4 border rounded shadow">
                    <h2 className="text-2xl font-semibold mb-2">{study.title}</h2>
                    <div className="mb-2">
                        <strong>Problema:</strong>
                        <p>{study.problem}</p>
                    </div>
                    <div className="mb-2">
                        <strong>Solución:</strong>
                        <p>{study.solution}</p>
                    </div>
                    <div>
                        <strong>Resultados:</strong>
                        <p>{study.results}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CaseStudiesPage;