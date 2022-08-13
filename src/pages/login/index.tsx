import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components';

import './styles.scss';

type TStage = 'initial' | 'login' | 'buy' | 'sell';

function Login() {
  const [stage, setStage] = useState<TStage>('initial');
  const { register, handleSubmit } = useForm();

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
        <div className="form-container">
          <h2 className="align-left">Cadastro de cliente</h2>
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
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

            <label htmlFor="CPF">CPF</label>
            <input
              type="text"
              className="mrc-input"
              placeholder="Ex: 22233344455"
              {...register('CPF')}
            />

            <label htmlFor="birthdate">Data de nascimento</label>
            <input
              type="text"
              className="mrc-input"
              placeholder="Ex: 06/12/2022"
              {...register('birthdate')}
            />

            <label htmlFor="">Endereço de entrega (completo)</label>
            <input
              type="text"
              className="mrc-input"
              placeholder="Ex: Rua dos Ipês, 10. Bairro das Oliveiras"
              {...register('address')}
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
            <Button secondary onClick={() => setStage('initial')}>
              Voltar
            </Button>
            <Button type="submit" form="form">
              Cadastrar
            </Button>
          </div>
        </div>
      )}
      {stage === 'sell' && (
        <div className="form-container">
          <h2 className="align-left">Cadastro de prestador de serviço</h2>
          <div className="buttons-container-rows">
            <Button onClick={() => setStage('initial')}>Voltar</Button>
            <Button>Cadastrar</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
