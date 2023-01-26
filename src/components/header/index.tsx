import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase-utils';
import { FiLogOut } from 'react-icons/fi';
import { BsFillCartFill, BsTruck } from 'react-icons/bs';
import { RiFileList3Fill } from 'react-icons/ri';
import { IoBagAdd } from 'react-icons/io5';

import { useAuth, useCart } from 'hooks';

import './styles.scss';

type HeaderProps = {
  setIsCartOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ setIsCartOpen }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = useAuth();
  const {
    state: { productCount },
  } = useCart();

  return (
    <div className="header">
      <div className="align-left">
        <button onClick={() => navigate('/home')}>
          Mercadão de Garça <BsTruck />
        </button>
      </div>
      <div className="align-right">
        {state.user?.deliveryAddress && location.pathname !== '/order' && (
          <button
            type="button"
            onClick={() => setIsCartOpen?.((prevState) => !prevState)}
          >
            <BsFillCartFill />
            {productCount > 0 && (
              <div className="notification-badge" role="status">
                {productCount}
              </div>
            )}
          </button>
        )}{' '}
        {!state.user?.deliveryAddress && (
          <button
            type="button"
            onClick={() => navigate('/product', { replace: true })}
          >
            <IoBagAdd />
          </button>
        )}
        <button type="button" onClick={() => navigate('/order')}>
          <RiFileList3Fill />
        </button>
        <button type="button" onClick={async () => await signOut(auth)}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

export default Header;
