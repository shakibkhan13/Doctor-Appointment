
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider from './context/AdminContext'
import DoctorContextProvider from './context/DoctorContext'
import AppContextProvider from './context/AppContext'
import App from './App'
import './index.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
);
