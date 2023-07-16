import { IAccount } from "../../../markets/coinMarket/interfaces";

const CryptoWalletInfoTable: React.FC<{ account: IAccount; actualTotalBalance: number }> = ({ account, actualTotalBalance }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th style={{ width: '250px' }} />
                    <th style={{ width: '100px' }} />
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><h4>Total balance:</h4></td>
                    <td id='stock-wallet-info'>
                        <h4>{actualTotalBalance}$</h4>
                    </td>
                </tr>
                <tr>
                    <td><p>Unused USD:</p></td>
                    <td id='stock-wallet-info'><p>{account.balance}$</p></td>
                </tr>
                <tr>
                    <td><p>Account type:</p></td>
                    <td id='stock-wallet-info'><p>{account.accountType}</p></td>
                </tr>
            </tbody>
        </table>
    )
}

export default CryptoWalletInfoTable;