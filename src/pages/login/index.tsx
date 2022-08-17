import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from 'api';
import { useAuth } from 'hooks';
import { Button } from 'components';
import type { AxiosError } from 'axios';
import Buyer from './Buyer';
import Seller from './Seller';

import './styles.scss';

type TStage = 'initial' | 'login' | 'buy' | 'sell';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { register, handleSubmit } = useForm();

  const [stage, setStage] = useState<TStage>('initial');

  const handleReturnToInitialPage = () => setStage('initial');

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.get(`/users?login_like=${data.login}`);

      if (response.data[0]?.password === data.password) {
        setUser(response.data[0]);
        navigate('/home');
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        console.log('Usuário não encontrado');
      }
    }
  };

  return (
    <div className="login-container">
      {stage === 'initial' && (
        <div className="form-container">
          <h2>Bem-vindo ao Mercadão de Garça</h2>
          <div className="buttons-container-columns">
            <Button onClick={() => setStage('buy')}>Quero comprar!</Button>
            <Button onClick={() => setStage('sell')}>Quero vender!</Button>
          </div>
          <div className="span-footer">
            <span>
              Já possui uma conta?{' '}
              <a onClick={() => setStage('login')}>Clique aqui!</a>
            </span>
          </div>
        </div>
      )}
      {stage === 'buy' && (
        <Buyer handleReturnToInitialPage={handleReturnToInitialPage} />
      )}
      {stage === 'sell' && (
        <Seller handleReturnToInitialPage={handleReturnToInitialPage} />
      )}
      {stage === 'login' && (
        <div className="form-container">
          <h2 className="align-left">Login</h2>
          <form id="form-login" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="login">Login</label>
            <input type="text" className="mrc-input" {...register('login')} />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="mrc-input"
              {...register('password')}
            />
          </form>
          <div className="buttons-container-rows">
            <Button secondary onClick={() => setStage('initial')}>
              Voltar
            </Button>
            <Button type="submit" form="form-login">
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
