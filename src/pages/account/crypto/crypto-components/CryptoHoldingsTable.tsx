import { useEffect, useMemo, useState } from "react";
import { IAccount, IAccountCoin, IActualPricesData, IPiePrice } from "../../../markets/coinMarket/interfaces";
import { USER_AUTH_TOKEN } from "../../../../store/store";

const CryptoHoldingsTable: React.FC<{ account: IAccount }> = ({ account }) => {
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const [currentCryptoPrices, setCurrentCryptoPrices] = useState<IPiePrice[]>([]);

    useEffect(() => {

        fetch(`http://localhost:8000/api/v1/account/actual-prices-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(account)
        })
            .then((response) => response.json())
            .then((actual: IActualPricesData) => {
                console.log(actual);
                setCurrentCryptoPrices(actual.data);
            })
            .catch((error) => {
                console.error(error);
            });


    }, [account]);
    
    const handlePrice = (ticker: string) => {
        const priceObj = currentCryptoPrices?.find((item) => (item.label === ticker));
        return priceObj ? priceObj.value : 0;
    };

    const costAccount = useMemo(() => {
        return account.coins.reduce((sum: number, el: IAccountCoin) => {
            return sum + (el.countCoin * handlePrice(el.symbol))
        }, 0);
    }, [account]);

    const profitCoin = (coin: IAccountCoin) => {
        return ((handlePrice(coin.symbol) * coin.countCoin) - (coin.avgPrice * coin.countCoin)).toFixed(2);
    }

    return (
        <div className='table-assets'>
            <table className='table'>
                <thead className='thead-dark'>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Count coins</th>
                        <th>Average price</th>
                        <th>Price</th>
                        <th>Cost</th>
                        <th>Share</th>
                        <th>Profit</th>
                        <th>Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {account.coins.map((coin) => (
                        <tr key={coin.idCoin} style={{ width: '20px' }}>
                            <td style={{ width: '20px' }}>
                                <img src={`https://cryptologos.cc/logos/thumbs/${coin.idCoin}.png?v=024`} alt='Logo'
                                    height='24' />
                            </td>
                            <td>{coin.name}</td>
                            <td>{coin.countCoin}</td>
                            <td>{coin.avgPrice}$</td>
                            <td>
                                {(handlePrice(coin.symbol) > coin.avgPrice)
                                    ? <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                        <p id='positive-growth'>
                                            {handlePrice(coin.symbol).toFixed(2)}
                                        </p>
                                    </div>
                                    : <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                        <p id='negative-growth'>
                                            {handlePrice(coin.symbol).toFixed(2)}
                                        </p>
                                    </div>
                                }
                            </td>
                            <td>
                                {(handlePrice(coin.symbol) * coin.countCoin).toFixed(2)}$
                            </td>
                            <td>
                                {((handlePrice(coin.symbol) * coin.countCoin / costAccount) * 100).toFixed(2)}%
                            </td>
                            <td>
                                {parseInt(profitCoin(coin)) < 0
                                    ? <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                        <p id='negative-growth'>
                                            {profitCoin(coin)}
                                        </p>
                                    </div>
                                    : <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                        <p id='positive-growth'>
                                            {profitCoin(coin)}
                                        </p>
                                    </div>
                                }
                            </td>
                            <td>
                                {parseInt(profitCoin(coin)) < 0
                                    ? <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                        <p id='negative-growth'>
                                            {((parseInt(profitCoin(coin)) / (coin.avgPrice * coin.countCoin)) * 100).toFixed(2)}%
                                        </p>
                                    </div>
                                    : <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                        <p id='positive-growth'>
                                            {((parseInt(profitCoin(coin)) / (coin.avgPrice * coin.countCoin)) * 100).toFixed(2)}%
                                        </p>
                                    </div>
                                }

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CryptoHoldingsTable;