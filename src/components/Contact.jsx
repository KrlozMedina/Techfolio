import React, {useContext} from 'react';
import emailjs from '@emailjs/browser';
import LenguajeContext from '@context/LenguajeContext'

import '@styles/Contact.scss'

const Contact = () => {
    const {isSpanish, setIsSpanish} = useContext(LenguajeContext)

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
    <div className='contact'>
        <section id="contact" className="main-contact-container">
            <h2>{isSpanish ? "CONTACTA ME" : "CONTACT ME"}</h2>

            <div className='contact--info-container'>
                <img className='contact-img' src="https://i.imgur.com/ZZVTY1J.png"/>

                <form className='contact-form' onSubmit={sendEmail}>
                    <div>
                        <label htmlFor="name">{isSpanish ? "Nombre" : "Name"}</label>
                        <input name='user_name' type="text" />
                    </div>

                    <div>
                        <label htmlFor="email">{isSpanish ? "Correo electrónico" : "Email"}</label>
                        <input name='user_email' type="email" />
                    </div>

                    <div>
                        <label htmlFor="subject">{isSpanish ? "Asunto" : "Subject"}</label>
                        <input name='subject' type="text" />
                    </div>

                    <textarea name="message" id="" cols="30" rows="10"></textarea>

                    <button>{isSpanish ? "Enviar mensaje" : "Send message"}</button>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Contact
