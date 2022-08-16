import React from 'react';
import reactDom from 'react-dom';
import App from './App';
import Header from '@components/Header'
import '@styles/global.scss';
import '@styles/_vars.scss';



// ReactDom.render(<h1>Hola Mundo</h1>, document.getElementById('root'));
reactDom.render(<Header />, document.getElementById('header'));
reactDom.render(<App />, document.getElementById('app'));





import ThemeContextWrapper from '@hooks/themes/themeContextWrapper';

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <App />
    </React.StrictMode>{' '}
  </ThemeContextWrapper>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();