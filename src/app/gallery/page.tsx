'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useGallery } from './useGallery';
import style from './page.module.scss';

export default function GalleryPage() {
  const [category, setCategory] = useState<string | null>(null);
  const { images, loadMore, hasMore, isLoading } = useGallery(category);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className={style.gallery}>
      <h1>Gallery</h1>

      <div className={style.filters}>
        {['all', 'project', 'event', 'achievement'].map(c => (
          <button
            key={c}
            onClick={() => setCategory(c === 'all' ? null : c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={style.grid}>
        {images.map(img => (
          <Image
            key={img.id}
            src={img.src}
            alt={img.alt}
            width={600}
            height={400}
          />
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={style.skeleton} />
          ))}
      </div>

      <div ref={observerRef} />
    </div>
  );
}




// 'use client';

// import Image from 'next/image';
// import React from 'react';

// const GalleryPage = () => {
//   const images = [
//     { src: '/images/project1.jpg', alt: 'Project 1' },
//     { src: '/images/event1.jpg', alt: 'Event 1' },
//     { src: '/images/achievement1.jpg', alt: 'Achievement 1' },
//   ];

//   return (
//     <div className="gallery-page">
//       <h1>Gallery</h1>
//       <p>Explore images related to my projects, events, and achievements.</p>
//       <div className="gallery-grid">
//         {images.map((image, index) => (
//           <div key={index} className="gallery-item">
//             <Image
//               src={image.src}
//               alt={image.alt}
//               loading='lazy'
//             />
//           </div>
//         ))}
//       </div>
//       <style jsx>{`
//                 .gallery-page {
//                     padding: 20px;
//                     text-align: center;
//                 }
//                 .gallery-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//                     gap: 20px;
//                     margin-top: 20px;
//                 }
//                 .gallery-item img {
//                     width: 100%;
//                     height: auto;
//                     border-radius: 8px;
//                     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                 }
//             `}</style>
//     </div>
//   );
// };

// export default GalleryPage;