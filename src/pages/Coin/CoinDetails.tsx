import './coin.css';
import { useState, useEffect } from 'react';
import { IAccount, ICoin, ICoinVM } from './interfaces';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { tokenStore, updateAccount, userAccountsStore } from '../../store/store';
import { PurchaseData, PurchaseWidget } from './components/PurchaseWidget';


export function CoinDetails() {
    const [coin, setCoin] = useState<ICoinVM | null>(null);

    const token = useStore(tokenStore);
    const accounts = useStore(userAccountsStore);

    let { coinId } = useParams();
    useEffect(() => {
        if (!coin) {
            fetch(`http://localhost:8000/api/v1/coins/${coinId}`)
                .then(response => response.json())
                .then(coin => {
                    const updatedCoin = mapCoin(coin);
                    setCoin(updatedCoin);
                })
        }

    }, [coinId]);
    const mapCoin = (coin: ICoin) => {
        const coinVM: ICoinVM = {
            ...coin,
            iconUrl: `https://cryptologos.cc/logos/thumbs/${coin.id}.png?v=024`,
        };
        return coinVM;
    };

   

    const handleBuyCoins = (data: PurchaseData) => {

        const formData = { ...data, coinId };
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
            .then((account: IAccount) => {
                updateAccount(account)
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
                    {accounts && accounts.length ? (
                       <PurchaseWidget accounts={accounts} onBuyCoins={handleBuyCoins}/>
                    ) : (<p></p>)}
                </div>
            )}
        </>
    )
}
