import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './Routes';
import AuthProvider from './Contexts';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
