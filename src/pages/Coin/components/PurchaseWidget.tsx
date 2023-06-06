import { FormEvent, useState } from 'react';
import {IAccount} from '../interfaces'

interface PurchaseWidgetProps {
    accounts: IAccount[];
    onBuyCoins: (data: PurchaseData) => void;
}

export interface PurchaseData {
    amount: number;
    accountID: number;
}

export const PurchaseWidget: React.FC<PurchaseWidgetProps> = ({ accounts, onBuyCoins }) => {
    const [accountID, setAccountID] = useState(accounts[0].id);
    const [amount, setAmount] = useState(0);

    const handleAccountChange = (accountID: number) => {
        setAccountID(accountID);
    }

    const handleAmount = (amount: number) => {
        setAmount(amount);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: PurchaseData = {amount, accountID};
        onBuyCoins(data);
        setAmount(0);
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <select name='accountID' defaultValue={accountID!}
                onChange={(e) => handleAccountChange(Number(e.target.value))}>
                {accounts.map((account) => (
                    <option key={account.accountName} value={account.id}>
                        {account.accountName}
                    </option>
                ))}
            </select>
            <input type='number' name='amount' placeholder='Введіть суму купівлі' className='form-control'
                value={amount ? amount : ''}
                onChange={(e) => handleAmount(Number(e.target.value))} />
            <button type='submit' className='btn btn-success'>Accept</button>
        </form>
    );
}