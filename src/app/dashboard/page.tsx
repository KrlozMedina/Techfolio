// src/pages/dashboard.tsx (o donde tengas tus rutas)
import React from "react";

const Dashboard = () => {
  const stats = [
    { title: "Proyectos activos", value: 4 },
    { title: "Completados", value: 10 },
    { title: "En progreso", value: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panel de administración</h1>
        <p className="text-gray-600">Resumen de tu portafolio</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Últimos proyectos</h2>
        <ul className="space-y-3">
          <li className="border-b pb-2">🚀 Sistema de control domótico</li>
          <li className="border-b pb-2">📊 Dashboard de IoT</li>
          <li className="border-b pb-2">💡 Gestión de energía solar</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
