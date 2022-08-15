import React from 'react'
import '@styles/Contactme.scss'

const Contactme = () => {
  return (
    <div className='contactme'>
        <section id="contactme" className="main-contactme-container">
            <h2>ENVIAME UN MENSAJE</h2>

            <div className='contactme--info-container'>
                <p className='contactme-info'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas molestiae dolores non nobis illum in autem. Possimus et labore eum ea ducimus temporibus ex doloremque quaerat assumenda. Eaque, a.
                </p>

                <form className='contactme-form' action="submit">
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input name='name' type="text" />
                    </div>

                    <div>
                        <label htmlFor="email">Correo electronico</label>
                        <input name='email' type="email" />
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
