import React from 'react';
import Header from '../components/organisms/Header';

import '../styles/pages/Certificates.css'

const certificatesData = [
    {
        'id': '1',
        'english': {
            'title': 'Focus- Focusing brings more results for the day to day',
            'category': 'Soft skill'
        },
        'spanish': {
            'title': 'Foco- Enfocarse trae más resultados para el día a día',
            'category': 'Habilidades blandas'
        },
        'image': 'https://i.imgur.com/X6dgFeU.png',
        'school': 'Oracle + Alura Latam',
        'date': '01/Dic/2022',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/ERqvMB0_x9dMpxDRrCanqIUBR_cGaWKOtkASDzW0-BZvgQ?e=SCgZAH'
    },
    {
        'id': '2',
        'english': {
            'title': 'Agile Fundamentals- First Steps to Agile Transformation',
            'category': 'Soft skill'
        },
        'spanish': {
            'title': 'Fundamentos de Agilidad- Primeros pasos para la transformación ágil',
            'category': 'Habilidades blandas'
        },
        'image': 'https://i.imgur.com/bg2DOv5.png',
        'school': 'Oracle + Alura Latam',
        'date': '02/Feb/2023',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/EVhQIS7PozBMv-mCPQv6i9kBWobwXKKjBzH3YnFcunOiKw?e=UbpXSk'
    },
    {
        'id': '3',
        'english': {
            'title': 'Agile Management- Leading Change in an Agile Environment',
            'category': 'Soft skill'
        },
        'spanish': {
            'title': 'Gestión ágil- Liderando el cambio en un ambiente de agilidad',
            'category': 'Habilidades blandas'
        },
        'image': 'https://i.imgur.com/uU7jOBH.png',
        'school': 'Oracle + Alura Latam',
        'date': '04/Feb/2023',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/ET0LLidciApIiTOEz4QjEc0B-URglzL74uroq_CwPkQQ_A?e=J9Z4dw'
    },
    {
        'id': '4',
        'english': {
            'title': 'Git and GitHub- control and share your code',
            'category': 'Soft skill'
        },
        'spanish': {
            'title': 'Git y GitHub- controle y comparta su código',
            'category': 'Habilidades blandas'
        },
        'image': 'https://i.imgur.com/tbQwcHi.png',
        'school': 'Oracle + Alura Latam',
        'date': '21/Ene/2023',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/EekJDUGF89pEi9BJ-4xBvkYBLu-bm-x_qym3bIsvQ_5Hzg?e=bSBAfM'
    },
    {
        'id': '5',
        'english': {
            'title': 'Habits- Being productive to meet your personal goals',
            'category': 'Soft skill'
        },
        'spanish': {
            'title': 'Hábitos- Ser productivo para cumplir sus metas personales',
            'category': 'Habilidades blandas'
        },
        'image': 'https://i.imgur.com/oYm93PX.png',
        'school': 'Oracle + Alura Latam',
        'date': '03/Dic/2022',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/EdYcklIV-i1MoBV2XSGI2-ABJVEgrLSP0ICcXtdp61goWg?e=NwKaOC'
    },
    {
        'id': '6',
        'english': {
            'title': 'HTML5 and CSS3 part 1- My first web page',
            'category': 'Web development'
        },
        'spanish': {
            'title': 'HTML5 y CSS3 parte 1- Mi primera página web',
            'category': 'Desarrollo web'
        },
        'image': 'https://i.imgur.com/hVKHywU.png',
        'school': 'Oracle + Alura Latam',
        'date': '14/Dic/2022',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/EdgRkiyYm-xOgm56a-J-NYIBQZBUqLlBjoF0CHUsO5MFBQ?e=xt8UBC'
    },
    {
        'id': '7',
        'english': {
            'title': 'HTML5 and CSS3 part 2- Positioning, lists and navigation',
            'category': 'Web development'
        },
        'spanish': {
            'title': 'HTML5 y CSS3 parte 2- Posicionamiento, listas y navegación',
            'category': 'Desarrollo web'
        },
        'image': 'https://i.imgur.com/gBjrVOl.png',
        'school': 'Oracle + Alura Latam',
        'date': '20/Dic/2022',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/Ebleth-uXI1AmU6b22-P1MsBT6S2-xS4V28vjlnFG0ZdTw?e=aln2Em'
    },
    {
        'id': '8',
        'english': {
            'title': 'HTML5 and CSS3 part 3- Working with forms and tables',
            'category': 'Web development'
        },
        'spanish': {
            'title': 'HTML5 y CSS3 parte 3- Trabajando con formularios y tablas',
            'category': 'Desarrollo web'
        },
        'image': 'https://i.imgur.com/IzU8uWs.png',
        'school': 'Oracle + Alura Latam',
        'date': '06/Ene/2023',
        'link': 'https://correoudistritaleduco-my.sharepoint.com/:b:/g/personal/camedinal_correo_udistrital_edu_co/ETDMwLHPBXNAhn_kZ8ngMY8B5xxmkDadwfP_--E1Wt3yHg?e=tOOoN6'
    },
]

const Certificates = () => {
    return (
    <section>
        <div className="background__intersection"></div>
        <Header />
        {certificatesData.map(certificate => (
            <a href={certificate.link} key={certificate.id} target="_blank">
                <img src={certificate.image} className='certificate--image' />
            </a>
        ))}
    </section>
    )
}

export default Certificates
