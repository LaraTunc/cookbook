import React from 'react';
import ReactDom from 'react-dom';
import App from './src/app.jsx';

import server from './db';

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
