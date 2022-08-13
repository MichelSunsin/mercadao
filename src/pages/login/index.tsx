import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'components';
import Buyer from './Buyer';
import Seller from './Seller';

import './styles.scss';

type TStage = 'initial' | 'login' | 'buy' | 'sell';

function Login() {
  const [stage, setStage] = useState<TStage>('initial');
  const { register, handleSubmit } = useForm();

  const handleReturnToInitialPage = () => setStage('initial');

  const onSubmit = (data: any) => {
    console.log(data);
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
            <label htmlFor="user">Usuário</label>
            <input type="text" className="mrc-input" {...register('user')} />
            <label htmlFor="passwrod">Senha</label>
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
            <Button>Login</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
