import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './Routes';
import AuthProvider from './Contexts';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} theme="dark" />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
