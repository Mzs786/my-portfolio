import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Service worker registration
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register({
    onSuccess: () => console.log('Service worker registered successfully'),
    onUpdate: () => {
      console.log('New content available; please refresh!');
      // Add logic to show update notification to user
    }
  });
} else {
  serviceWorker.unregister();
}