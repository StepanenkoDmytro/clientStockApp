import { useEffect, useState } from "react";
import Gauge from "../../../components/d3/GaugeChart";
import { USER_AUTH_TOKEN } from "../../../../store/store";

export interface FearGreeIndexData {
    now: number;
    previousClose: number;
    oneWeekAgo: number;
    oneMonthAgo: number;
}

const FearGreeIndex: React.FC<{}> = () => {
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const [fgi, setFgi] = useState<FearGreeIndexData>();
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/coins/fear-and-greed-index`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            }
        })
            .then((response) => response.json())
            .then((data: FearGreeIndexData) => {
                console.log(data);
                setFgi(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {fgi && <Gauge data={fgi} />}
        </div>
    );
}

export default FearGreeIndex;