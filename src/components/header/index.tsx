import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { BsFillCartFill, BsTruck } from 'react-icons/bs';
import { RiFileList3Fill } from 'react-icons/ri';

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
            <button type="button" onClick={() => navigate('/order')}>
              <RiFileList3Fill />
            </button>

            {state.user?.deliveryAddress && (
              <button
                type="button"
                onClick={() => setIsCartOpen((prevState) => !prevState)}
              >
                <BsFillCartFill />
              </button>
            )}
          </>
        )}
        <button type="button" onClick={() => navigate('/login')}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

export default Header;
