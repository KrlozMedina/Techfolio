import React, { useContext } from 'react'
import LenguajeContext from '../context/LenguajeContext'
import Page from '../components/templates/Page'
// import Contact from '../components/organisms/Contact'
import '../styles/pages/ContactMe.css'

const ContactMe = () => {
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
    <Page>
      <p className='phrase'>
        {
          isSpanish
          ? "Aprendí que la gente olvidará lo que dijiste, olvidará lo que hiciste... pero nunca olvidará lo que le hiciste sentir."
          : "I learned that people will forget what you said, they will forget what you did... but they will never forget how you made them feel."
        }
      </p>

      <p className='author'>Maya Angelou</p>

      <form id='contact' className='contact-form' onSubmit={sendEmail}>
            <fieldset className="main-contact-container" >
                <legend className='title'>{isSpanish ? "Contactarme" : "Contact me"}</legend>

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
    </Page>
  )
}

export default ContactMe
