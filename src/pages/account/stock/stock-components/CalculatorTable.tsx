const CalculatorTable: React.FC<{}> = ({ }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th
                        style={{ width: '150px' }}
                    />
                    <th
                        style={{ width: '100px' }}
                    />
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><p>USD:</p></td>
                    <td id='stock-profit-positive'>
                        <p>100$</p>
                    </td>
                </tr>
                <tr>
                    <td><p>EUR:</p></td>
                    <td id='stock-profit-negative'>
                        <p>89.57€</p>
                    </td>
                </tr>
                <tr>
                    <td><p>UAH:</p></td>
                    <td id='stock-profit-positive'>
                        <p>200₴</p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default CalculatorTable;