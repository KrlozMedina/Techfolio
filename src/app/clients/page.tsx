'use client';

import Image from 'next/image';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Spinner from '@/components/atom/feedback/Spinner';
// import { useLanguage } from '@/hooks';
import { useTranslation } from '@/hooks/useTranslation';
// import { useLanguage } from '@/hooks/useLanguage';

interface Client {
  id: number;
  displayName: string;
  displayDescription: string;
  logo: string;
}

const LIMIT = 5;

const ClientsPage: React.FC = () => {
  // const { isSpanish } = useLanguage();
  // const lang = isSpanish ? 'es' : 'en';
  const { t, language } = useTranslation();

  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchClients = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/v2/clients?lang=${language}&page=${page}&limit=${LIMIT}`);
      if (!res.ok) throw new Error('Failed to fetch clients');
      const data = await res.json();

      setClients(prev => [...prev, ...data.data]);
      setHasMore(data.hasMore);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [language, page, hasMore, loading]);

  // Scroll infinito
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        fetchClients();
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchClients, loading]);

  // Reset al cambiar idioma
  useEffect(() => {
    setClients([]);
    setPage(1);
    setHasMore(true);
  }, [language]);

  return (
    <div className="clients-page">
      <h1 className="title">{t.clients.title}</h1>
      <div className="clients-list">
        {clients.map(client => (
          <div key={client.id} className="client-card">
            <Image
              src={client.logo}
              alt={`${client.displayName} logo`}
              width={150}
              height={150}
              className="client-logo"
              loading="lazy"
            />
            <h2 className="client-name">{client.displayName}</h2>
            <p className="client-description">{client.displayDescription}</p>
          </div>
        ))}
      </div>

      {loading && <Spinner language={language} />}
      <div ref={observerRef}></div>
    </div>
  );
};

export default ClientsPage;




// import Image from 'next/image';
// import React from 'react';

// interface Client {
//   name: string;
//   logo: string;
//   description: string;
// }

// const clients: Client[] = [
//   {
//     name: 'Client A',
//     logo: '/assets/logos/client-a.png',
//     description: 'Desarrollo de una plataforma de comercio electrónico personalizada.',
//   },
//   {
//     name: 'Client B',
//     logo: '/assets/logos/client-b.png',
//     description: 'Implementación de una solución de análisis de datos en tiempo real.',
//   },
//   {
//     name: 'Client C',
//     logo: '/assets/logos/client-c.png',
//     description: 'Diseño y desarrollo de una aplicación móvil para gestión de tareas.',
//   },
// ];

// const ClientsPage: React.FC = () => {
//   return (
//     <div className="clients-page">
//       <h1 className="title">Clientes con los que he trabajado</h1>
//       <div className="clients-list">
//         {clients.map((client, index) => (
//           <div key={index} className="client-card">
//             <Image
//               src={client.logo}
//               alt={`${client.name} logo`}
//               className="client-logo"
//               loading='lazy'
//             />
//             <h2 className="client-name">{client.name}</h2>
//             <p className="client-description">{client.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClientsPage;