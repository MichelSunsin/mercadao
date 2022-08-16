import AuthProvider from 'context/auth/AuthProvider';
import CartProvider from 'context/cart/CartProvider';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/Routes';

import 'App.scss';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
