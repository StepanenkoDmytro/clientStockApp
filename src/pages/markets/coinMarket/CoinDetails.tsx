import './coin-market.css';
import { useState, useEffect } from 'react';
import { IAccount, ICoin, ICoinVM, ICoinDetails, CandlesData } from './interfaces';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { tokenStore, updateAccount, userAccountsStore } from '../../../store/store';
import { PurchaseData, PurchaseWidget } from './components/PurchaseWidget';
import CandlestickChart, { CandlestickData } from '../../components/d3/CandlesChart';


export function CoinDetails() {
    const [coin, setCoin] = useState<ICoinVM | null>(null);
    const [candlesData, setCandlesData] = useState<CandlestickData[]>([]);

    const token = useStore(tokenStore);
    const accounts = useStore(userAccountsStore);
    const cryptoAccounts = accounts.filter((account) => account.accountType === 'CryptoWallet');

    let { coinId } = useParams();
    useEffect(() => {
        if (!coin) {
            fetch(`http://localhost:8000/api/v1/coins/${coinId}`)
                .then(response => response.json())
                .then((coinDetails: ICoinDetails) => {
                    const { coin, candles } = coinDetails;
                    const updatedCoin = mapCoin(coin);
                    setCoin(updatedCoin);
                    console.log(candles);
                    const candlesDto = mapToCandlestickData(candles);
                    setCandlesData(candlesDto);
                })
            // .then(coin => {
            //     const updatedCoin = mapCoin(coin);
            //     setCoin(updatedCoin);
            // })
        }

    }, [coinId]);
    const mapCoin = (coin: ICoin) => {
        const coinVM: ICoinVM = {
            ...coin,
            iconUrl: `https://cryptologos.cc/logos/thumbs/${coin.id}.png?v=024`,
        };
        return coinVM;
    };

    const mapToCandlestickData = (candlesData: CandlesData[]): CandlestickData[] => {
        return candlesData.map((candleData) => ({
            date: new Date(candleData.date),
            open: candleData.open,
            high: candleData.high,
            low: candleData.low,
            close: candleData.close,
        }));
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
                <div className='coin-market-container'>
                    <div className='coin-image'>
                        <img src={coin.iconUrl} alt='Logo'
                            height='96' />
                    </div>
                    <div className='coin-info'>
                        <h1>{coin.name}</h1>
                        <p>$ {coin.priceUSD}</p>

                    </div>
                    {cryptoAccounts && cryptoAccounts.length ? (
                        <PurchaseWidget accounts={cryptoAccounts} onBuyCoins={handleBuyCoins} />
                    ) : (<p></p>)}
                    <div style={{background: 'white'}}>
                        {/* <CandlestickChart data={candlesData} width={1000} height={400} /> */}
                    </div>
                </div>
            )}
        </>
    )
}
