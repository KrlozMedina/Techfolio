import React from 'react';
import reactDom from 'react-dom';
import App from './App';
import Header from '@components/Header'
import '@styles/global.scss';

reactDom.render(<Header />, document.getElementById('header'));
reactDom.render(<App />, document.getElementById('app'));