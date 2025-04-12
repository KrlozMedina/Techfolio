import React from 'react';

const SkillsPage = () => {
    return (
        <div className="skills-page">
            <h1>Mis Habilidades</h1>
            
            <section>
                <h2>Lenguajes de Programación</h2>
                <ul>
                    <li>JavaScript</li>
                    <li>TypeScript</li>
                    <li>Python</li>
                    <li>Java</li>
                </ul>
            </section>
            
            <section>
                <h2>Tecnologías</h2>
                <ul>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>Docker</li>
                </ul>
            </section>
            
            <section>
                <h2>Habilidades Blandas</h2>
                <ul>
                    <li>Comunicación efectiva</li>
                    <li>Trabajo en equipo</li>
                    <li>Resolución de problemas</li>
                    <li>Adaptabilidad</li>
                </ul>
            </section>
        </div>
    );
};

export default SkillsPage;