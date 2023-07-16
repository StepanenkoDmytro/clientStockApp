import { useEffect, useMemo, useState } from "react";
import { IAccount, IAccountStock, IActualPricesData, IPiePrice } from "../../../markets/coinMarket/interfaces";
import { USER_AUTH_TOKEN } from "../../../../store/store";
import '../../../components/css/table-assets.css'

const StockHoldingsTable: React.FC<{ account: IAccount }> = ({ account }) => {
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const [currentStockPrices, setCurrentStockPrices] = useState<IPiePrice[]>([]);
    
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
                setCurrentStockPrices(actual.data);
            })
            .catch((error) => {
                console.error(error);
            });


    }, [account]);



    const handlePrices = (ticker: string) => {
        const priceObj = currentStockPrices?.find((item) => (item.label === ticker));
        return priceObj ? priceObj.value : 0;
    };

    const costAccount = useMemo(() => {
        return account.stocks.reduce((sum: number, el: IAccountStock) => {
            return sum + (el.buyPrice * el.countStocks);
        }, 0);
    }, [account]);

    const getShareOfStock = (stock: IAccountStock) => {
        return ((costStock(stock)) / costAccount) * 100;
    };

    const costStock = (stock: IAccountStock) => {
        return stock.buyPrice * stock.countStocks;
    };

    const profitStock = (stock: IAccountStock) => {
        return ((handlePrices(stock.symbol) - stock.buyPrice) * stock.countStocks).toFixed(2);
    }

    const growthStock = (stock: IAccountStock) => {
        return ((((handlePrices(stock.symbol) - stock.buyPrice) * stock.countStocks) / (stock.buyPrice * stock.countStocks)) * 100).toFixed(2);
    }
    return (
        <div className='table-assets'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Entry price</th>
                        <th>Price</th>
                        <th>Cost</th>
                        <th>Sector</th>
                        <th>Dividends</th>
                        <th>Share</th>
                        <th>Profit</th>
                        <th>Growth</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {account.stocks.map((stock) => (
                        <tr key={stock.symbol}>
                            <td>
                                <div className="truncate-name" title={stock.name}>
                                    {stock.name}
                                </div>
                            </td>
                            <td>{stock.countStocks}</td>
                            <td>{stock.buyPrice}$</td>
                            <td>
                                {(handlePrices(stock.symbol) > stock.buyPrice)
                                    ? <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                        <p id='positive-growth'>
                                            {handlePrices(stock.symbol).toFixed(2)}
                                        </p>
                                    </div>
                                    : <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                        <p id='negative-growth'>
                                            {handlePrices(stock.symbol).toFixed(2)}
                                        </p>
                                    </div>
                                }
                            </td>
                            <td>{(stock.buyPrice * stock.countStocks).toFixed(2)}$</td>
                            <td>
                                <div className="truncate-sector" title={stock.sector}>
                                    {stock.sector}
                                </div>
                            </td>
                            <td>{stock.dividendYield}</td>
                            <td>{getShareOfStock(stock).toFixed(2)}%</td>
                            <td>
                                {parseInt(profitStock(stock)) < 0
                                    ? <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                        <p id='negative-growth'>
                                            {profitStock(stock)}
                                        </p>
                                    </div>
                                    : <div style={{ display: 'flex' }}>


                                        <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                        <p id='positive-growth'>
                                            {profitStock(stock)}
                                        </p>
                                    </div>
                                }
                            </td>
                            <td>
                                {parseInt(growthStock(stock)) < 0
                                    ? <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                        <p id='negative-growth'>
                                            {growthStock(stock)}%
                                        </p>
                                    </div>
                                    : <div style={{ display: 'flex' }}>
                                        <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                        <p id='positive-growth'>
                                            {growthStock(stock)}%
                                        </p>
                                    </div>
                                }
                            </td>
                            <td>{stock.currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StockHoldingsTable;