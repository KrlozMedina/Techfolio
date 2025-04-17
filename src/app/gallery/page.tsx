'use client';

import Image from 'next/image';
import React from 'react';

const GalleryPage = () => {
    const images = [
        { src: '/images/project1.jpg', alt: 'Project 1' },
        { src: '/images/event1.jpg', alt: 'Event 1' },
        { src: '/images/achievement1.jpg', alt: 'Achievement 1' },
    ];

    return (
        <div className="gallery-page">
            <h1>Gallery</h1>
            <p>Explore images related to my projects, events, and achievements.</p>
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <Image src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
            <style jsx>{`
                .gallery-page {
                    padding: 20px;
                    text-align: center;
                }
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                .gallery-item img {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
};

export default GalleryPage;