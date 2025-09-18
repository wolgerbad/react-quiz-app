import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QuestionProvider } from './components/QuestionProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </StrictMode>
);
