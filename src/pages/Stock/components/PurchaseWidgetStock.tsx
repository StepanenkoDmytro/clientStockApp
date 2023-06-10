import { FormEvent, useState } from 'react';
import { IAccount, IStock } from '../../Coin/interfaces';
import '../stockList.css';

interface PurchaseWidgetProps {
    accounts: IAccount[];
    activeStock: IStock;
    onBuyStocks: (data: PurchaseData) => void;
}

export interface PurchaseData {
    countStocks: number;
    accountID: number;
}

export const PurchaseWidgetStock: React.FC<PurchaseWidgetProps> = ({ accounts, activeStock, onBuyStocks }) => {
    const [accountID, setAccountID] = useState(accounts[0].id);
    const [countStocks, setCountStocks] = useState(0);

    const [selectedOption, setSelectedOption] = useState('Market');
    const [showInput, setShowInput] = useState(false);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setShowInput(selectedValue === 'ChoosePrice');
    };

    const handleAccountChange = (accountID: number) => {
        setAccountID(accountID);
    }

    const handleAmount = (amount: number) => {
        setCountStocks(amount);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: PurchaseData = { countStocks, accountID };
        onBuyStocks(data);
        setCountStocks(0);
    }

    return (
        <div className='purchase-container'>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <h5>Account:</h5>
                    <select className="form-select" aria-label="Default select example"
                        name='accountID' defaultValue={accountID!}
                        onChange={(e) => handleAccountChange(Number(e.target.value))}>
                        {accounts.map((account) => (
                            <option key={account.accountName} value={account.id}>
                                {account.accountName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <h5>Ціна:</h5>
                    <select className="form-select" aria-label="Default select example"
                        onChange={handleSelectChange}
                        value={selectedOption}>
                        <option value="Market">По ринку</option>
                        <option value="ChoosePrice">Вибрати ціну</option>
                    </select>
                </div>
                {showInput &&
                    <div>
                        {/* <h5>Введіть ціну купівлі:</h5> */}
                        <input className='form-control' type='number' placeholder="Оберіть ціну купівлі:" />
                    </div>
                }

                <div>
                    <input type='number' name='countStocks' placeholder='Кількість, шт' className='form-control'
                        value={countStocks ? countStocks : ''}
                        onChange={(e) => handleAmount(Number(e.target.value))} />
                </div>
                <hr />
                <p>Сума купівлі: {countStocks * activeStock.price}$</p>
                <p>Баланс акаунуту: 1000$</p>
                <button type='submit' className='btn btn-success'>Accept</button>
            </form>
        </div>
    );
}