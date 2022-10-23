import React from 'react';
import reactDom from 'react-dom';
import App from './routes/App';
// import Header from '@components/Header';
import { LenguajeContextProvider } from './context/LenguajeContext';

import '@styles/global.scss';

// reactDom.render(
//     <LenguajeContextProvider>
//         <Header />
//     </LenguajeContextProvider>,
//     document.getElementById('header')
// );

reactDom.render(
    <LenguajeContextProvider>
        {/* <Header /> */}
        <App />
    </LenguajeContextProvider>,
    document.getElementById('app'),
    // document.getElementById('header')
);