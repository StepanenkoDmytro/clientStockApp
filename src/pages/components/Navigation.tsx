import { NavLink } from 'react-router-dom';
import './navigation.css'
import { userStore } from '../../store/store';
import { IUser } from '../markets/coinMarket/interfaces';
import { useStore } from 'effector-react';

export default function Navigation() {
    const user: IUser | null = useStore(userStore);
    const marketItems = [
        {
            link: '/page/coin-market',
            title: 'Coin Market'
        },
        {
            link: '/page/stock-market',
            title: 'Stock Market'
        }
    ]
    const menuItems = [
        {
            link: '/page/porfolio',
            icon: '/icons/portfolioOverviewIcon.svg',
            title: 'Portfolio Overview'
        },
        {
            link: '/page/crypto',
            icon: '/icons/cryptoPortfolioIcon.svg',
            title: 'Crypto Portfolio'
        },
        {
            link: '/page/stock',
            icon: '/icons/stockPortfolioIcon.svg',
            title: 'Stock Portfolio'
        },
        // {
        //     link: '/account/transfer',
        //     icon: '/icons/transfersMoneyIcon.svg',
        //     title: 'Transfers Money'
        // },
        {
            link: '/page/transactions',
            icon: '/icons/transactionsIcon.svg',
            title: 'Transactions'
        },
        {
            link: '/page/user',
            icon: '/icons/userSettingsIcon.svg',
            title: 'User Settings'
        }
    ]
    return (
        <div className='user-menu-container'>
            <div>
                <div className='preview-name'>
                    {user?.imageID !== 0 ? (
                        <img src={`http://localhost:8000/images/${user?.imageID}`} alt='mdo ' width='64 ' height='64 ' style={{ float: 'left', borderRadius: '15%', marginRight: '3%' }} />
                    )
                        : (
                            <img src='/src/img/non-user-photo.png' alt='mdo ' width='64 ' height='64 ' style={{ float: 'left', borderRadius: '15%', marginRight: '3%' }} />
                        )}

                    <div>
                        <h3>{user?.username}</h3>
                        <p>{'1000$'}</p>
                    </div>
                </div>
                <p>Markets:</p>
                <ul className='nav flex-column'>
                    {marketItems.map((item) => <li className='nav-item' key={item.title}>
                        <NavLink to={item.link}
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link "}>
                            {/* <img src={item.icon} className='menu-icon' /> */}
                            {item.title}
                        </NavLink>
                    </li>)}
                </ul>
                <p>Account:</p>
                <ul className='nav flex-column'>
                    {menuItems.map((item) => <li className='nav-item' key={item.title}>
                        <NavLink to={item.link}
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            {/* <img src={item.icon} className='menu-icon' /> */}
                            {item.title}
                        </NavLink>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}