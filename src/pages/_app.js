import '../styles/global.scss'
// import type { AppProps } from 'next/app'
import { LenguajeContextProvider } from '../context/LenguajeContext';

export default function App({ Component, pageProps }) {
  return(
    <LenguajeContextProvider>
      <Component {...pageProps} />
    </LenguajeContextProvider>
  )
}
