import React from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

import '@styles/Contactme.scss'
import sendMe from '@images/SendMe.png'

const Contactme = () => {
    const sendEmail = (event) => {
        event.preventDefault();

        emailjs.sendForm('service_77nat4q', 'template_oeicj1e', event.target, 'p65YoBfR9VhH5xx58')
        .then(response => {
            if (response.status === 200) {
                alert('Mensaje enviado correctamente')
            }
        })
        .catch(error => console.log(error))

        event.target.reset();
    }

  return (
    <div className='contactme'>
        <section id="contactme" className="main-contactme-container">
            <h2>CONTACTARME</h2>

            <div className='contactme--info-container'>
                <img className='contactme-img' src={sendMe}/>

                <form className='contactme-form' onSubmit={sendEmail}>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input name='user_name' type="text" />
                    </div>

                    <div>
                        <label htmlFor="email">Correo electronico</label>
                        <input name='user_email' type="email" />
                    </div>

                    <div>
                        <label htmlFor="subject">Asunto</label>
                        <input name='subject' type="text" />
                    </div>

                    <textarea name="message" id="" cols="30" rows="10"></textarea>

                    <button>Enviar mensaje</button>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Contactme
