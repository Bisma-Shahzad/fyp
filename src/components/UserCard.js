import { Button } from "@mui/material";
import BSButton from "./BSButton";
import './Navbar/Navbar.css'

function UserCard(a) {
  return <>
    <div className="prod-div" onClick={a.onClick} style={{cursor: 'pointer'}}>
            <div className="img-div">
                <img src={a.src} />
            </div>
            <div className="prod-desc">
                <h4 className="prod-name">{a.title}</h4>

                <h5 className="prod-rate">Rs.{a.price}<span style={{ color: '#acaeb1', fontWeight: 'normal', fontSize: '15px' }}>(per hour)</span></h5>
            </div>
        </div>
    {/* <div className="prod-div first-prod-div" onClick={props.onClick}>
      <div className="img-div">
        <img src={props.src} alt={props.title} />
      </div>
      <div className="prod-desc">
        <h4 className="prod-name">{props.title}</h4>
        <h5 className="prod-rate">
          Price: Rs{props.price}
          <span className="rate-label">(per hour)</span>
        </h5>
      </div>
    </div> */}
  </>
}

export default UserCard;