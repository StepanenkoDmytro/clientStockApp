import { useStore } from 'effector-react';
import './user.css'
import { userStore } from '../../../store/store';
import { IUser } from '../../markets/coinMarket/interfaces';

export function UserContainer() {
    const user: IUser | null = useStore(userStore);

    


    return (
        <div className='user-container'>

            <div className='profile-info'>
                

                <div className='user-details'>
                    <div>
                        <h4>Contact information:</h4> <hr />
                        <p>{'Dmytro Stepanenko'}</p>
                        <p>{user?.email}</p>
                        <p>{'0982846242'}</p>
                        <p><a href='#'>{'Edit'}</a>{' | '} <a href='#'>{'Change password'}</a></p>
                    </div>
                    <div>
                        <h4>Address information:</h4> <hr />
                        <p>{'Country: Ukraine'}</p>
                        <p>{'City: Dnipro'}</p>
                        <p><a href='#'>{'Edit address'}</a></p>
                    </div>

                </div>
            </div>
            <hr />
        </div>
    );
}