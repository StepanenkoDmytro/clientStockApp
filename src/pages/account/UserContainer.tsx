import { useStore } from 'effector-react';
import { userStore } from '../../store/store';
import './user.css'
import { IUser } from '../Coin/interfaces';

export function UserContainer() {
    const user: IUser | null = useStore(userStore);

    const handleClick = () => {
        const input = document.querySelector('#inputFile')!;
        input.click();
    }


    return (
        <div className='user-container'>

            <div className='profile-info'>
                <div className='user-photo' onClick={() => handleClick()}>
                    <img 
                        src={user?.imageID ? `http://localhost:8000/images/${user?.imageID}` : '/src/img/non-user-photo.png'}
                     />
                     <span> update photo </span>
                     <input type="file" name="" id="inputFile" style={{display: 'none'}}
                    //   onChange={}
                      />
                </div>

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