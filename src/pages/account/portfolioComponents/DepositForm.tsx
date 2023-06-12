import { FormEvent, useState } from 'react';
import { IAccount } from '../../Coin/interfaces';
import { USER_AUTH_TOKEN } from '../../../App';

interface DepositFormProps {
    accountID: number;
    handleDepositAccount: (account: IAccount) => void;
}

export const DepositForm: React.FC<DepositFormProps> = ({ accountID, handleDepositAccount }) => {
  const [depositAmount, setDepositAmount] = useState(0);

  const token = localStorage.getItem(USER_AUTH_TOKEN);

  const handleDeposit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = { accountID, depositAmount };

    fetch(`http://localhost:8000/api/v1/account/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer_${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((account: IAccount) => {
        handleDepositAccount(account);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => handleDepositAmount(0));
  }

  const handleDepositAmount = (deposit: number) => {
    setDepositAmount(deposit);
}

  return (
    <form onSubmit={handleDeposit}>
      <input
        type='number'
        name='depositAmount'
        placeholder='Введіть суму депозиту'
        value={depositAmount ? depositAmount : ''}
        onChange={(e) => setDepositAmount(Number(e.target.value))}
      />
      <button style={{ marginLeft: '5px' }} type='submit' className='btn btn-success'>Accept</button>
    </form>
  );
}
