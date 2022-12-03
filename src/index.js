import React from 'react';
import reactDom from 'react-dom';
import App from './routes/App';
import { LenguajeContextProvider } from './context/LenguajeContext';

import '@styles/global.scss';

reactDom.render(
    <LenguajeContextProvider>
        <App />
    </LenguajeContextProvider>,
    document.getElementById('app'),
);