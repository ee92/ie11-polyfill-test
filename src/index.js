import 'react-app-polyfill/ie11';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import '@ui5/webcomponents-base/dist/features/browsersupport/IE11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
