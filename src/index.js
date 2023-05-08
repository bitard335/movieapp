import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Alert } from 'antd';

import MovieApp from './components/movieApp/movieApp';

window.addEventListener('online', checkLineStatus);
window.addEventListener('offline', checkLineStatus);

const root = ReactDOM.createRoot(document.getElementById('root'));

function checkLineStatus() {
  if (navigator.onLine) {
    root.render(<MovieApp />);
  } else {
    root.render(<Alert type="error" message="Проверьте ваше подключение к сети" />);
  }
}

checkLineStatus();
