import React from 'react'
import axios from 'axios'

import '@styles/Contactme.scss'
import sendMe from '@images/SendMe.png'

const Contactme = () => {
    // let name =  this.name;
    // console.log('email', name)

  return (
    <div className='contactme'>
        <section id="contactme" className="main-contactme-container">
            <h2>CONTACTARME</h2>

            <div className='contactme--info-container'>
                <img className='contactme-img' src={sendMe}/>

                <form className='contactme-form' action="submit">
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input name='name' type="text" />
                    </div>

                    <div>
                        <label htmlFor="email">Correo electronico</label>
                        <input name='email' type="email" />
                    </div>

                    <div>
                        <label htmlFor="subject">Asunto</label>
                        <input name='subject' type="text" />
                    </div>

                    <textarea name="" id="" cols="30" rows="10"></textarea>

                    <button>Enviar mensaje</button>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Contactme
