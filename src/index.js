import React from 'react';
import reactDom from 'react-dom';
import App from './App';
import Header from '@components/Header'
import '@styles/global.scss';

// ReactDom.render(<h1>Hola Mundo</h1>, document.getElementById('root'));
reactDom.render(<Header />, document.getElementById('header'));
reactDom.render(<App />, document.getElementById('app'));