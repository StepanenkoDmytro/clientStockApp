// import UserSettingsIcon from 'src/img/icons/userSettingsIcon.svg';
// import TransactionIcon from 'src/img/icons/transactionsIcon.svg';
// import TransfersMoneyIcon from 'src/img/icons/transfersMoneyIcon.svg';
// import StockPortfolioIcon from 'src/img/icons/stockPortfolioIcon.svg';
// import CryptoPortfolioIcon from 'src/img/icons/cryptoPortfolioIcon.svg';
// import PortfolioOverviewIcon from 'src/img/icons/portfolioOverviewIcon.svg';
import { NavLink } from 'react-router-dom';
import './account.css'

export function UserMenu() {
    const menuItems = [
        {
            link: '/account/porfolio',
            icon: <img src='src/img/icons/portfolioOverviewIcon.svg'/>,
            title: 'Portfolio Overview'
        },
        {
            link: '/account/crypto',
            icon: <svg><use xlinkHref="src/img/icons/transactionsIcon.svg"/></svg>,
            title: 'Crypto Portfolio'
        },
        {
            link: '/account/stock',
            icon: <svg><use xlinkHref="src/img/icons/transactionsIcon.svg"/></svg>,
            title: 'Stock Portfolio'
        },
        {
            link: '/account/transfer',
            icon: <svg><use xlinkHref="src/img/icons/transactionsIcon.svg"/></svg>,
            title: 'Transfers Money'
        },
        {
            link: '/account/transactions',
            icon: <svg><use xlinkHref="src/img/icons/transactionsIcon.svg"/></svg>,
            title: 'Transactions'
        },
        {
            link: '/account/user',
            icon: <svg><use xlinkHref="src/img/icons/transactionsIcon.svg"/></svg>,
            title: 'User Settings'
        }
    ]
    return (
        <div className='user-menu-container'>
            <div>
                <div className='preview-name'>
                    <img src='https://github.com/mdo.png ' alt='mdo ' width='64 ' height='64 ' style={{ float: 'left', borderRadius: '15%', marginRight: '3%' }} />
                    <div>
                        <h3>Username</h3>
                        <p>AccountType</p>
                    </div>
                </div>
                <ul className='nav flex-column'>
                    {menuItems.map((item) => <li className='nav-item' key={item.title}>
                        <NavLink to={item.link}
                                 className={({ isActive }) => isActive ? "nav-link active" : "nav-link "}>
                            <span dangerouslySetInnerHTML={{ __html: item.icon }} className='menu-icon' />
                            {item.title}
                        </NavLink>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}