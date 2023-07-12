import { useEffect, useState } from "react";
import { USER_AUTH_TOKEN } from "../../../../App";
import { IAccount, IPieData, IPiePrice } from "../../../markets/coinMarket/interfaces";
import PieChart from "../../../components/d3/PieChart";

interface PieAssetsChartrops {
    account: IAccount;
    handleTotalBalance: (account: number) => void;
}

export const PieAssetsChart: React.FC<PieAssetsChartrops> = ({ account, handleTotalBalance }) => {
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const [priceList, setPriceList] = useState<IPiePrice[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/account/price-for-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(account),
        })
            .then((response) => response.json())
            .then((response: IPieData) => {
                console.log(response);
                handleTotalBalance(response.totalBalance);
                setPriceList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [account]);

    return (
        <PieChart data={priceList} width={500} height={300} />
    );
}