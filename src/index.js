import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../src/Store/Store'; // Asegúrate de importar el store correctamente

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>  {/* Aquí está el Provider */}
    <App />
  </Provider>
);
