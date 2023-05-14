import './coin.css';
import { useState, useEffect } from 'react';
import { ICoin, ICoinVM } from './interfaces';
import { useParams } from 'react-router-dom';


export function CoinDetails() {
    const [coin, setCoin] = useState<ICoinVM | null>(null);

    let { coinId } = useParams();
    useEffect(() => {

        fetch('http://localhost:8000/api/v1/coins/' + coinId)
            .then(response => response.json())
            .then(coin => {
                const updatedCoin = mapCoin(coin);
                setCoin(updatedCoin);
            });
    }, [coinId]);
    const mapCoin = (coin: ICoin) => {
        const coinVM: ICoinVM = {
            ...coin,
            iconUrl: 'https://cryptologos.cc/logos/thumbs/' + coin.id + '.png?v=024',
        };
        return coinVM;
    };

    return (
        <>
            {coin && (
                <div className="container">
                    <div className="coin-image">
                        <img src={coin.iconUrl} alt="Logo"
                            height="96" />
                    </div>
                    <div className="coin-info">
                        <h1>{coin.name}</h1>
                        <p>$ {coin.priceUSD}</p>
                    </div>
                </div>
            )}
        </>
    )
}