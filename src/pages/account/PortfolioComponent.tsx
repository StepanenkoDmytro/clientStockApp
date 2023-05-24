import { useStore } from 'effector-react';
import { saveUser, userStore } from '../../store/store';
import './porfolio.css'
import { IDataPieChart, IUser } from '../Coin/interfaces';
import { FormEvent, useState } from 'react';
import { USER_AUTH_TOKEN } from '../../App';
import PieChart from '../d3/PieChart';

export function PortfolioComponent() {
    const user: IUser | null = useStore(userStore);

    const { accounts } = user || { accounts: [] };

    const dataForPieChart: IDataPieChart[] = accounts.map((account) => ({
        label: account.accountName,
        value: account.balance / 100
    }));
    console.log(dataForPieChart);

    const [newAccountName, setNewAccountName] = useState('');

    const handlNewAccountName = (accountName: string) => {
        setNewAccountName(accountName);
    };

    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const createNewAccount = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = { newAccountName };
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

    const deleteAccount = (accountID: number) => {
        fetch(`http://localhost:8000/api/v1/account/${accountID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            }
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

            <div className='porfolio-balance'>
                <h2>{'Total balance: 0$'}</h2>
            </div>
            <hr />
            <div className='wallet'>
                <div className='wallet-title'>
                    <div className='wallets-name'>
                        <h3>Wallets:</h3>
                    </div>
                    <div className='wallets-create'>
                        <form onSubmit={(e) => createNewAccount(e)}>
                            <input type='text' name='accountName' placeholder='Введіть назву гаманця'
                                onChange={(e) => handlNewAccountName(e.target.value)} />
                            <button style={{ marginLeft: '5px' }} type='submit' className='btn btn-success'>Create</button>
                        </form>
                    </div>

                </div>

                <div className='pie-chart'>
                    <PieChart data={dataForPieChart} width={250} height={150}/>
                </div>

                <div className='wallets-dropdown'>

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
                                                    <th>Delete account</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{account.accountName}</td>
                                                    <td></td>
                                                    <td>{account.balance}$</td>
                                                    <td></td>
                                                    <td>
                                                        <button
                                                            id='button-delete'
                                                            onClick={() => deleteAccount(account.id)}>
                                                            <img src='/delete-icon.svg' />
                                                        </button>
                                                    </td>
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
        </div>
    );
}