'use client'

import React, { useContext } from 'react'
// import LanguageContext from '@/context/LanguageContext'
// import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import '@/styles/pages/ContactMe.css'
import emailjs from '@emailjs/browser';
import { ImWhatsapp } from 'react-icons/im'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { useTranslation } from '@/hooks/useTranslation';
// import Social from '@/components/molecules/SocialLinks/SocialLinks'
// import StatusNotice from '@/components/organisms/Notice/Notice'
// import { MaintenanceNotice } from '@/components/organisms/Notice/Notice'

// Define the context type if not already defined
interface LanguageContextType {
  isSpanish: boolean;
}

const ContactMe: React.FC = () => {
  // const { isSpanish } = useContext(LanguageContext) as LanguageContextType
  const { t } = useTranslation();

  const sendEmail = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  
    const serviceId = 'service_s7cwc3b';
    const templateId = 'template_oeicj1e';
    const publicKey = 'r80WPDf83UhY4J-em';
  
    emailjs.sendForm(serviceId, templateId, event.target as HTMLFormElement, publicKey)
      .then(response => {
        if (response.status === 200) {
          alert('Mensaje enviado correctamente');
        }
      })
      .catch(error => console.log(error));
  
    // Cast the event.target to HTMLFormElement before calling reset
    (event.target as HTMLFormElement).reset();
  }

  return (
    <>
      <p className='phrase'>
        {
          t.phrases.contact
          // isSpanish
          //   ? "Aprendí que la gente olvidará lo que dijiste, olvidará lo que hiciste... pero nunca olvidará lo que le hiciste sentir."
          //   : "I learned that people will forget what you said, they will forget what you did... but they will never forget how you made them feel."
        }
      </p>

      <p className='author'>Maya Angelou</p>

      {/* <StatusNotice type='maintenance' language={isSpanish ? 'es' : 'en'} /> */}

      <form id='contact' className='contact-form' onSubmit={sendEmail}>
        <fieldset className="main-contact-container">
          <legend className='title'>{t.contact.title}</legend>

          <section className='contact--data'>
            <span><ImWhatsapp className='icon' /> +57 3504312615</span>
            <span><MdEmail className='icon' /> kamedinal16@outlook.com</span>
            <span><MdLocationOn className='icon' /> Bogota, Colombia</span>
            <br />
            {/* <Social /> */}
          </section>

          <div className='contact--info-container'>
            <div>
              <label htmlFor="name">{t.contact.name}</label>
              <input name='user_name' type="text" required />
            </div>

            <div>
              <label htmlFor="email">{t.contact.email}</label>
              <input name='user_email' type="email" required />
            </div>

            <div>
              <label htmlFor="subject">{t.contact.subject}</label>
              <input name='subject' type="text" required />
            </div>

            <textarea name="message" id="" cols={30} rows={10}></textarea>

            <input type="submit" value={t.contact.send} />
          </div>
        </fieldset>
      </form>
    </>
  )
}

export default ContactMe
