import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MeshProvider } from '@meshsdk/react';
import '@meshsdk/react/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeshProvider>
      <App />
    </MeshProvider>
  </StrictMode>
);
