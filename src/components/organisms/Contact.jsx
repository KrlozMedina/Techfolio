import React, {useContext} from 'react';
import emailjs from '@emailjs/browser';
import LenguajeContext from '../../context/LenguajeContext'

// import '@styles/Contact.scss'
import '../../styles/components/organisms/Contact.css'

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
        <form id='contact' className='contact-form' onSubmit={sendEmail}>
            <fieldset className="main-contact-container" >
                <legend>{isSpanish ? "CONTACTA ME" : "CONTACT ME"}</legend>

                <img className='contact-img' src="https://i.imgur.com/ZZVTY1J.png"/>
                
                <div className='contact--info-container'>
                    <div>
                        <label htmlFor="name">{isSpanish ? "Nombre" : "Name"}</label>
                        <input name='user_name' type="text" required/>
                    </div>

                    <div>
                        <label htmlFor="email">{isSpanish ? "Correo electrónico" : "Email"}</label>
                        <input name='user_email' type="email" required />
                    </div>

                    <div>
                        <label htmlFor="subject">{isSpanish ? "Asunto" : "Subject"}</label>
                        <input name='subject' type="text" required />
                    </div>

                    <textarea name="message" id="" cols="30" rows="10"></textarea>

                    <input type="submit" value={isSpanish ? "Enviar" : "Send"}/>
                </div>
            </fieldset>
        </form>
    )
}

export default Contact