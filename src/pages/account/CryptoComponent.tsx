import { useStore } from 'effector-react';
import { userStore } from '../../store/store';
import './account.css'
import './crypto.css'
import { IAccount, IUser } from '../Coin/interfaces';
import { FormEvent, useState } from 'react';
import { USER_AUTH_TOKEN } from '../../App';

export function CryptoComponent() {
    const user: IUser | null = useStore(userStore);
    const { accounts } = user || { accounts: [] };
    const [activeAccount, setActiveAccount] = useState<IAccount | null>(accounts.length > 0 ? accounts[0] : null);

    const handleActiveAccount = (account: IAccount) => {
        setActiveAccount(account);
    }

    const [depositAmount, setDepositAmount] = useState(0);

    const handleDepositAmount = (deposit: number) => {
        setDepositAmount(deposit);
    }

    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const handleDeposit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const accountId = activeAccount?.id;

        const formData = {accountId, depositAmount};
        console.log(formData);

        fetch(`http://localhost:8000/api/v1/account/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((response: IAccount) => {
                console.log(response);
                setActiveAccount(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className='crypto-container'>
            <div className='changer-acc'>
                <select onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                    {accounts.map((account) => (
                        <option key={account.accountName} value={JSON.stringify(account)}>
                            {account.accountName}
                        </option>
                    ))}
                </select>
            </div>
            <h1>{activeAccount?.accountName}</h1>
            <h6>{activeAccount?.accountType}</h6>
            <h4>{activeAccount?.balance}$</h4>
            <hr />

            <form onSubmit={(event) => handleDeposit(event)}>
                <input type="number" name="depositAmount" placeholder="Введіть суму депозиту" className="form-control" 
                onChange={(e) => handleDepositAmount(Number(e.target.value))}/>
                <button type="submit" className="btn btn-success">Accept</button>
            </form>

            <hr />
            <ul>
                {activeAccount?.coins.map((coin) => (
                    <li key={coin.idCoin}><p>Coin name: {coin.name} AmountCOIN: {coin.amountCOIN} AmountUSD: {coin.amountUSD}</p></li>
                ))}
            </ul>
        </div>
    );
}