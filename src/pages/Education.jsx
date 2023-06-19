import React, { useContext } from 'react'
import LenguajeContext from '../context/LenguajeContext'
import Page from '../components/templates/Page'

const Education = () => {
  const { isSpanish } = useContext(LenguajeContext)

  return (
    <Page>
      <p className='phrase'>
        {
          isSpanish
          ? "La educación es nuestro pasaporte para el futuro, porque el mañana pertenece a la gente que se prepara para el hoy."
          : "Education is our passport to the future, because tomorrow belongs to the people who prepare for today."
        }
      </p>

      <p className='author'>Malcolm X</p>

      
    </Page>
  )
}

export default Education
