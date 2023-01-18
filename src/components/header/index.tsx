import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase-utils';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { BsFillCartFill, BsTruck } from 'react-icons/bs';
import { RiFileList3Fill } from 'react-icons/ri';
import { IoBagAdd } from 'react-icons/io5';

import { useAuth } from 'hooks';

import './styles.scss';

type HeaderProps = {
  setIsCartOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ setIsCartOpen }: HeaderProps) {
  const navigate = useNavigate();
  const { state } = useAuth();

  return (
    <div className="header">
      <div className="align-left">
        <button onClick={() => navigate('/home')}>
          Mercadão de Garça <BsTruck />
        </button>
      </div>
      <div className="align-right">
        {setIsCartOpen && (
          <>
            {state.user?.deliveryAddress ? (
              <button
                type="button"
                onClick={() => setIsCartOpen((prevState) => !prevState)}
              >
                <BsFillCartFill />
              </button>
            ) : (
              <button type="button" onClick={() => navigate('/product')}>
                <IoBagAdd />
              </button>
            )}

            <button type="button" onClick={() => navigate('/order')}>
              <RiFileList3Fill />
            </button>
          </>
        )}
        <button type="button" onClick={async () => await signOut(auth)}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

export default Header;
