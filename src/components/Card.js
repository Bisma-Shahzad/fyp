import { Button } from "@mui/material";

function Card(a) {
    return <div><div style={{ height: '400px' }}>
        <h4>{a.id}</h4>
        <div style={{ padding: '10px' }}>
        <img src={a.src} style={{ width: '250px', height: '180px' }} />
        </div>
        <div style={{ padding: '10px'}}>
        <h4 style={{ width: '200px', height: '20px' }}>{a.title}</h4>

        <h5>Price: Rs{a.price}</h5>
        </div>
    </div>
    </div>
}

export default Card;