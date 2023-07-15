import './coin-market.css';
import '../../components/css/table-assets.css'
import { useState, useEffect } from 'react';
import { ICoinVM, IPage, ICoinDto, ICoin } from './interfaces';
import { $search } from '../../../store/store';
import HeadOfBlock from '../../components/HeadOfBlock';

export const INITIAL_PAGINATION = {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    visiblePages: [],
}

export function CoinList() {

    const [coinList, setCoinList] = useState<ICoinVM[]>([]);
    const [pagination, setPagination] = useState<IPage>(INITIAL_PAGINATION);
    const [filter, setFilter] = useState<string>($search.getState());

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/coins?page=${pagination.currentPage}&filter=${filter}`)
            .then(response => response.json())
            .then((response: ICoinDto) => {
                const { data, ...pages } = response;
                mapCoins(data);
                mapPagination(pages);
            })
    }, [pagination.currentPage, filter]);

    let timeOut: number | null = null;
    $search.watch(state => {
        if (state !== filter && state.length > 2) {
            if (!!timeOut) {
                clearTimeout(timeOut);
                timeOut = null;
            }
            timeOut = setTimeout(() => {
                setFilter(state);
            }, 400);

        }
    });

    const handlePageChange = (currentPage: number) => {

        setPagination({
            ...pagination,
            currentPage
        });
    }

    const mapCoins = (coins: ICoin[]) => {
        const coinsVM: ICoinVM[] = coins.map((coin) => ({ ...coin, iconUrl: `https://cryptologos.cc/logos/thumbs/${coin.id}.png?v=024` }));
        setCoinList(coinsVM);
    }
    const mapPagination = (pages: IPage) => {
        let visiblePages = [];
        if (pages.currentPage <= 3) {
            let endIndex = Math.min(8, pages.totalPages + 1);
            visiblePages = createSequence(1, endIndex);
        } else if (pages.currentPage > pages.totalPages - 3) {
            visiblePages = createSequence(pages.currentPage - 3, pages.totalPages + 1);
        } else {
            visiblePages = createSequence(pages.currentPage - 3, pages.currentPage + 4);
        }
        setPagination({ ...pages, visiblePages });
    }

    const createSequence = (from: number, to: number) => {
        const sequence = [];
        for (let i = from; i < to; i++) {
            sequence.push(i);
        }
        return sequence;
    }

    return (
        <div className="coin-market-container">
            <div className='table-container'>
                <div className="table-assets">
                    <HeadOfBlock name={'Crypto market:'}/>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '20px' }}></th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>

                            {coinList.map((coin: ICoinVM) => (
                                <tr key={coin.id}>
                                    <td>
                                        <img src={coin.iconUrl} alt="Logo"
                                            height="18" />
                                    </td>
                                    <td>
                                        <a href={"./coin-market/" + coin.id}>{coin.name}</a>
                                    </td>
                                    <td>$ {coin.priceUSD}</td>
                                    <td>$ {coin.marketCapUsd}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                <div>
                    <footer className='footer'>
                        <div>
                            {pagination.totalItems !== 1 ? (
                                <div className='pag-container'>
                                    <div style={{ color: 'gray' }}>
                                        Total Items: {pagination.totalItems} : Page {pagination.currentPage} of {pagination.totalPages}
                                    </div>

                                    <div className='pagination-container'>
                                        {pagination.currentPage !== 1 ? (
                                            <div>
                                                <span onClick={() => handlePageChange(1)}>
                                                    {'<<'}
                                                </span>
                                                <span onClick={() => handlePageChange(pagination.currentPage - 1)}>
                                                    {'<'}
                                                </span>
                                            </div>
                                        ) : (
                                            <span></span>
                                        )}

                                        {pagination.visiblePages!.map((page) => (
                                            <div key={page}>
                                                <span className={pagination.currentPage === page ? 'active' : ''}
                                                    onClick={() => handlePageChange(page)}>
                                                    {page}
                                                </span>
                                            </div>
                                        ))}

                                        {pagination.currentPage !== pagination.totalPages ? (
                                            <div>
                                                <span onClick={() => handlePageChange(pagination.currentPage + 1)}>{'>'}</span>
                                                <span onClick={() => handlePageChange(pagination.totalPages)}>{'>>'}</span>
                                            </div>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ color: 'gray' }}>
                                    Total Items: {pagination.totalItems} : Page {pagination.currentPage} of {pagination.totalPages}
                                </div>
                            )}
                        </div>
                    </footer>

                </div>
            </div>
        </div>
    )
}