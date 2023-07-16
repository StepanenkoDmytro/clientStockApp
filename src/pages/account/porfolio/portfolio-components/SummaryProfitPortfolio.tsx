const SummaryProfitPortfolio: React.FC<{}> = ({}) => {
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
                                <td><p>Day profit:</p></td>
                                <td id='stock-profit-positive'>
                                    <p>10$</p>
                                </td>
                            </tr>
                            <tr>
                                <td><p>Week profit:</p></td>
                                <td id='stock-profit-negative'>
                                    <p>-100$</p>
                                </td>
                            </tr>
                            <tr>
                                <td><p>Month profit:</p></td>
                                <td id='stock-profit-positive'>
                                    <p>200$</p>
                                </td>
                            </tr>
                            <tr>
                                <td><p>Total profit:</p></td>
                                <td id='stock-profit-positive'>
                                    <p>1200$</p>
                                </td>
                            </tr>
                            <tr><hr /></tr>
                            <tr>
                                <td><p>Received dividend:</p></td>
                                <td id='stock-profit-positive'>
                                    <p>20$</p>
                                </td>
                            </tr>
                            <tr>
                                <td><p>Forecast dividend</p></td>
                                <td id='stock-profit-positive'><p>120$</p></td>
                            </tr>
                        </tbody>
                    </table>
    )
}

export default SummaryProfitPortfolio;