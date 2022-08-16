import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';

type BuyerProps = {
  handleReturnToInitialPage: () => void;
};

function Buyer({ handleReturnToInitialPage }: BuyerProps) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/home');
  };

  return (
    <div className="form-container">
      <h2 className="align-left">Cadastro de cliente</h2>
      <form id="form-buyer" onSubmit={handleSubmit(onSubmit)}>
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
