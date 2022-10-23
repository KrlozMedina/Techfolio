import React, {useContext} from 'react';
import emailjs from '@emailjs/browser';
import LenguajeContext from '@context/LenguajeContext'

import '@styles/Contactme.scss'

const Contactme = () => {
    const {spanish, setSpanish} = useContext(LenguajeContext)

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
            <h2>{spanish ? "CONTACTAME" : "CONTACT ME"}</h2>

            <div className='contactme--info-container'>
                <img className='contactme-img' src="https://i.imgur.com/ZZVTY1J.png"/>

                <form className='contactme-form' onSubmit={sendEmail}>
                    <div>
                        <label htmlFor="name">{spanish ? "Nombre" : "Name"}</label>
                        <input name='user_name' type="text" />
                    </div>

                    <div>
                        <label htmlFor="email">{spanish ? "Correo electronico" : "Email"}</label>
                        <input name='user_email' type="email" />
                    </div>

                    <div>
                        <label htmlFor="subject">{spanish ? "Asunto" : "Subject"}</label>
                        <input name='subject' type="text" />
                    </div>

                    <textarea name="message" id="" cols="30" rows="10"></textarea>

                    <button>{spanish ? "Enviar mensaje" : "Send message"}</button>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Contactme
