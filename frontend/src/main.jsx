import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './components/backend/context/Auth.jsx';
import { Provider } from 'react-redux';
import store from './components/common/store.js';

createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>

)
