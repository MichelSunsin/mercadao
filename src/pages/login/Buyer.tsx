import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import { useAuth } from 'hooks';
import { Button } from 'components';
import config from 'api/firebase-config';

import type { TFormFields } from '.';
import type { TUser } from 'types';

type BuyerProps = {
  handleReturnToInitialPage: () => void;
};

function Buyer({ handleReturnToInitialPage }: BuyerProps) {
  const { setUser } = useAuth();
  const auth = getAuth();
  const firestore = getFirestore(config);

  const { register, handleSubmit } = useForm<TFormFields>();
  const navigate = useNavigate();

  const onSubmit = async (data: TFormFields) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        document,
        birthdate,
        deliveryAddress,
      } = data;

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const newUser: TUser = {
        uid: user.uid,
        email,
        firstName,
        lastName,
        document,
        birthdate,
        deliveryAddress,
      };

      await setDoc(doc(firestore, 'users', user.uid), newUser);

      setUser(newUser);

      navigate('/home');
    } catch (error) {
      const err = error as AuthError;
      console.log(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="align-left">Cadastro de cliente</h2>
      <form id="form-buyer" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Login</label>
        <input
          type="text"
          className="mrc-input"
          placeholder="Ex: usuario, usuario@gmail.com"
          {...register('email')}
        />

        <label htmlFor="firstName">Nome</label>
        <input
          type="text"
          className="mrc-input"
          placeholder="Ex: Fulano"
          {...register('firstName')}
        />

        <label htmlFor="lastName">Sobrenome</label>
        <input
          type="text"
          className="mrc-input"
          placeholder="Ex: da Silva"
          {...register('lastName')}
        />

        <label htmlFor="document">CPF</label>
        <input
          type="text"
          className="mrc-input"
          placeholder="Ex: 22233344455"
          {...register('document')}
        />

        <label htmlFor="birthdate">Data de nascimento</label>
        <input
          type="date"
          className="mrc-input"
          placeholder="Ex: 06/12/2022"
          {...register('birthdate')}
        />

        <label htmlFor="">Endereço de entrega (completo)</label>
        <input
          type="text"
          className="mrc-input"
          placeholder="Ex: Rua dos Ipês, 10. Bairro das Oliveiras"
          {...register('deliveryAddress')}
        />

        <label htmlFor="">Senha</label>
        <input
          type="password"
          className="mrc-input"
          {...register('password')}
        />

        <label htmlFor="">Confirmar senha</label>
        <input
          type="password"
          className="mrc-input"
          {...register('passwordConfirm')}
        />
      </form>
      <div className="buttons-container-rows">
        <Button secondary onClick={handleReturnToInitialPage}>
          Voltar
        </Button>
        <Button type="submit" form="form-buyer">
          Cadastrar
        </Button>
      </div>
    </div>
  );
}

export default Buyer;
