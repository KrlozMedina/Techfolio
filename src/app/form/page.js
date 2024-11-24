'use client'
// import Head from 'next/head'
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', age: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el envío por defecto del formulario

    const res = await fetch('/api/v1/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convierte los datos del formulario en JSON
    });

    if (res.ok) {
      console.log('Datos enviados con éxito');
    } else {
      console.error('Error al enviar los datos');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="age">Enter Age</label>
        <input
          type="text"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleInputChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}