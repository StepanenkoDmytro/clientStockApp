import { useStore } from 'effector-react';
import { saveUser, userStore } from '../../store/store';
import './porfolio.css'
import { IUser } from '../Coin/interfaces';
import { FormEvent, HtmlHTMLAttributes, useState } from 'react';
import { USER_AUTH_TOKEN } from '../../App';

export function PortfolioComponent() {
    const user: IUser | null = useStore(userStore);

    const { accounts } = user || { accounts: [] };

    const [newAccountName, setNewAccountName] = useState('');

    const handlNewAccountName = (accountName: string) => {
        setNewAccountName(accountName);
    };

    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const createNewAccount = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {newAccountName};
        console.log(formData);

        fetch(`http://localhost:8000/api/v1/account/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((user: IUser) => {
                console.log(user);
                saveUser(user);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [showAccountMap, setShowAccountMap] = useState<{ [key: string]: boolean }>({});

    const handleShowAccount = (accountName: string) => {
        setShowAccountMap((prevShowAccountMap) => ({
            ...prevShowAccountMap,
            [accountName]: !prevShowAccountMap[accountName],
        }));
    };
    return (
        <div className='porfolio-container'>
            <h2>{'Total balance: 0'}</h2><hr />
            <div>
                <form onSubmit={(e) => createNewAccount(e)}>
                    <input type='text' name='accountName' placeholder='Введіть назву гаманця'
                        className='form-control' onChange={(e) => handlNewAccountName(e.target.value)}/>
                    <button type='submit' className='btn btn-success'>Create</button>
                </form>
            </div>
            <div className='dropdown'>
                <h3>Wallets</h3>
                <ul className='list-unstyled'>
                    {accounts.map((account) => (
                        <li key={account.accountName}>
                            <button
                                className={showAccountMap[account.accountName]
                                    ? 'btn btn-secondary dropdown-toggle active'
                                    : 'btn btn-secondary dropdown-toggle'}
                                type='button' id='cryptoDropdown'
                                onClick={() => handleShowAccount(account.accountName)}>
                                {account.accountName}
                            </button>

                            {showAccountMap[account.accountName] && (
                                <table>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Account name</th>
                                                <th>Account value</th>
                                                <th>Account money USD</th>
                                                <th>Account profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{account.accountName}</td>
                                                <td></td>
                                                <td>{account.balance}$</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </table>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}