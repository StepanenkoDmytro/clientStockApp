import './coin.css';
import { useState, useEffect } from 'react';
import { ICoinVM, IPage, ICoinDto, ICoin } from './interfaces';



const INITIAL_PAGINATION = {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    visiblePages: [],
}

export function CoinList() {
    const [coinList, setCoinList] = useState<ICoinVM[]>([]);
    const [pagination, setPagination] = useState<IPage>(INITIAL_PAGINATION);
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/coins')
        .then(response => response.json())
        .then((response: ICoinDto) => {
            const {data, ...pages} = response;
            mapCoins(data);
            mapPagination(pages);
        })
    }, []);

    const mapCoins = (coins: ICoin[]) => {
        const coinsVM: ICoinVM[] = coins.map((coin) => ({...coin, iconUrl: 'https://cryptologos.cc/logos/thumbs/' + coin.id + '.png?v=024'} ));
        setCoinList(coinsVM);
    }
    const mapPagination = (pages: IPage) => {
        let visiblePages = [];
        if(pages.currentPage < 3) {
            visiblePages = createSequence(1, pages.currentPage + 6);
        } else if(pages.currentPage > pages.totalPages - 3) {
            visiblePages = createSequence(pages.currentPage - 3, pages.totalPages + 1);
        } else {
            visiblePages = createSequence(pages.currentPage - 3, pages.currentPage + 3);
        }
        setPagination({...pages, visiblePages});
    }

    const createSequence = (from: number, to: number) => {
        const sequence = [];
        for(let i = from; i < to; i++) {
            sequence.push(i);
        }
        return sequence;
    }

    return (
               <>
                 <div className="container">
                     <table className="table">
                         <thead className="thead-dark">
                         <tr>
                             <th scope="col"></th>
                             <th scope="col">Name</th>
                             <th scope="col">Price</th>
                             <th scope="col">Market Cap</th>
                         </tr>
                         </thead>
                         <tbody>

                             {coinList.map((coin: ICoinVM) => (
                                <tr key={coin.id}>
                                    <td className="logo-column">
                                        <img src={coin.iconUrl} alt="Logo"
                                            height="32"/>
                                    </td>
                                    <td className="content-column">
                                        <a href={"./coins/" + coin.id}>{coin.name}</a>
                                    </td>
                                    <td className="content-column">$ {coin.priceUSD}</td>
                                    <td className="content-column">$ {coin.marketCapUsd}</td>
                                </tr>
                             ))}

                         </tbody>
                     </table>
                 </div>

                 <div>
                     <footer className="panel-footer">
                        {pagination.currentPage !== 1
                            ? <>
                                <p>{'<<'}</p>
                                <p>{'<'}</p>
                              </>
                            : <p></p>
                        }

                        {pagination.totalItems !== 1
                         ? (<div>

                            Total Items: {pagination.totalItems} : Page {pagination.currentPage} of {pagination.totalPages}

                             <br/>
                             {pagination.visiblePages!.map(page => <span key={page}>{page}</span> )}
                         </div>)

                          : (<div>
                            Total Items: {pagination.totalItems} : Page {pagination.currentPage} of {pagination.totalPages}
                         </div>)
                         }

                         {pagination.currentPage !== pagination.totalPages
                            ? <>
                                <p>{'>'}</p>
                                <p>{'>>'}</p>
                                </>
                            : <p></p>
                         }
                     </footer>
                 </div>
               </>
             )
}