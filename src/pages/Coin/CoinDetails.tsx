import './coin.css';
import { useState, useEffect, FormEvent } from 'react';
import { ICoin, ICoinVM, IUser } from './interfaces';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { userStore } from '../../store/store';
import { USER_AUTH_TOKEN } from '../../App';


export function CoinDetails() {
    const [coin, setCoin] = useState<ICoinVM | null>(null);

    const user: IUser | null = useStore(userStore);
    const { accounts } = user || { accounts: [] };

    let { coinId } = useParams();
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/coins/${coinId}`)
            .then(response => response.json())
            .then(coin => {
                const updatedCoin = mapCoin(coin);
                setCoin(updatedCoin);
            });
    }, [coinId]);
    const mapCoin = (coin: ICoin) => {
        const coinVM: ICoinVM = {
            ...coin,
            iconUrl: `https://cryptologos.cc/logos/thumbs/${coin.id}.png?v=024`,
        };
        return coinVM;
    };
    const [accountID, setAccountID] = useState(accounts.length > 0 ? accounts[0].id : null);
    const [amount, setAmount] = useState(0);

    const handleAccountID = (accountID: number) => {
        setAccountID(accountID);
    }

    const handleAmount = (amount: number) => {
        setAmount(amount);
    }
    const token = localStorage.getItem(USER_AUTH_TOKEN);

    const handleBuyCoins = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = { accountID, coinId, amount };
        console.log(formData);

        fetch(`http://localhost:8000/api/v1/coins/${coinId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            {coin && (
                <div className='container'>
                    <div className='coin-image'>
                        <img src={coin.iconUrl} alt='Logo'
                            height='96' />
                    </div>
                    <div className='coin-info'>
                        <h1>{coin.name}</h1>
                        <p>$ {coin.priceUSD}</p>
                    </div>
                    {user ? (
                        <form onSubmit={(event) => handleBuyCoins(event)}>
                            <select name='accountID' onChange={(e) => handleAccountID(Number(e.target.value))}>
                                {accounts.map((account) => (
                                    <option key={account.accountName} value={account.id}>
                                        {account.accountName}</option>
                                ))}
                            </select>
                            <input type='number' name='amount' placeholder='Введіть суму купівлі' className='form-control'
                                onChange={(e) => handleAmount(Number(e.target.value))} />
                            <button type='submit' className='btn btn-success'>Accept</button>
                        </form>
                    ) : (<p></p>)}
                </div>
            )}
        </>
    )
}
