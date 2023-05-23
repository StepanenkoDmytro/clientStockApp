import { NavLink } from 'react-router-dom';
import './account.css'
import { userStore } from '../../store/store';
import { IUser } from '../Coin/interfaces';
import { useStore } from 'effector-react';

export function UserMenu() {
    const user: IUser | null = useStore(userStore);
    const menuItems = [
        {
            link: '/account/porfolio',
            icon: '/public/icons/portfolioOverviewIcon.svg',
            title: 'Portfolio Overview'
        },
        {
            link: '/account/crypto',
            icon: '/public/icons/cryptoPortfolioIcon.svg',
            title: 'Crypto Portfolio'
        },
        {
            link: '/account/stock',
            icon: '/public/icons/stockPortfolioIcon.svg',
            title: 'Stock Portfolio'
        },
        {
            link: '/account/transfer',
            icon: '/public/icons/transfersMoneyIcon.svg',
            title: 'Transfers Money'
        },
        {
            link: '/account/transactions',
            icon: '/public/icons/transactionsIcon.svg',
            title: 'Transactions'
        },
        {
            link: '/account/user',
            icon: '/public/icons/userSettingsIcon.svg',
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
                <ul className='nav flex-column'>
                    {menuItems.map((item) => <li className='nav-item' key={item.title}>
                        <NavLink to={item.link}
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link "}>
                            <img src={item.icon} className='menu-icon' />
                            {item.title}
                        </NavLink>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}