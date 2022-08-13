import AuthProvider from 'context/auth/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/Routes';

import 'App.scss';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
