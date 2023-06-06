import AreaChart from '../d3/AreaChart';
import LineChart from '../d3/LineChart';
import './account.css'
import './stock.css'

export function StockComponent() {
    const data = [
        { x: 0, y: 10 },
        { x: 1, y: 15 },
        { x: 2, y: 18 },
        { x: 3, y: 23 },
        { x: 4, y: 19 },
        { x: 5, y: 22 },
        { x: 6, y: 25 },
        { x: 7, y: 32 },
        { x: 8, y: 29 },
        { x: 9, y: 34 }
      ];
    return(
        <div className='stock-container'>
            <AreaChart data={data} width={300} height={200}/>
            <LineChart data={data} width={300} height={200}/>
        </div>
    );
}