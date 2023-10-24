import { Switch, Typography } from "@mui/material"
import { useState } from "react"
import { Container } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import BSButton from "../../components/BSButton"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import BSSelect from '../../components/BSSelect'
import BSInput from "../../components/BSInput"
import BSSwitch from "../../components/BSSwitch"
import { deletedata } from "../../config/firebasemethods"
import BSScreenHeader from "../../components/BSScreenHeader"

export default function BookingForm() {
    const location = useLocation()
    console.log(location.state)
    let data = location.state
    const [bookedData, setBookedData] = useState({
        ac: data.ac,
        available: data.available,
        bluetooth: data.bluetooth,
        carName: data.carName,
        cost: data.cost,
        description: data.description,
        gps: data.gps,
        id: data.id,
        image: data.image,
        modelname: data.modelname,
        usbPort: data.usbPort,
        userName: data.userName,
        userid: data.userid,
        customerid: data.customerid,
        customeruserName: data.customeruserName,
    })
    const [status, setStatus] = useState({})
    console.log(bookedData)

    let nav = useNavigate()

let confirmbooking = () => {
if(!status.statusvalue){
    deletedata('transporterbooking', bookedData.userid, bookedData.id)
}   nav('/booking')
}

    return <>
        <Container>
            <BSScreenHeader title="Booking Form" />
            <div style={{ marginTop: '20px' }}>
                <img src={data.image} style={{ width: '300px' }} />
            </div>
            <div>
                <Typography variant="h4" style={{ textTransform: 'uppercase', padding: '5px' }} >{data.carName}</Typography>
                {/* <h1>{location.state.carName}</h1> */}
                <h5 style={{ padding: '5px' }}>Model: {data.modelname}</h5>
                <p style={{ padding: '5px' }}>{data.description}</p>
            </div>
            <div style={{ marginTop: '20px', padding: '5px' }}>
                <h3 style={{ textDecoration: 'underline' }}>Features</h3>
                <div style={{ display: 'flex' }}>
                    <h5>AC</h5>
                    <h5 >{!data.ac ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                </div>
                <div style={{ display: 'flex', }}>
                    <h5>GPS</h5>
                    <h5>{!data.gps ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                </div>
                <div style={{ display: 'flex', }}>
                    <h5>Bluetooth</h5>
                    <h5>{!data.bluetooth ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                </div>
                <div style={{ display: 'flex', }}>
                    <h5>USB Port</h5>
                    <h5>{!data.usbPort ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                </div>
            </div>

            <div>
                <h4 style={{ color: 'blue', padding: '5px' }}>Cost: {data.cost}</h4>
            </div>
            <div>
            <BSSwitch label="Approved" onChange={(e) => setStatus({...status, statusvalue: e.target.checked })} />
            </div>


            <div style={{ margin: '20px', }}>
                <BSButton
                    title="CONFIRM BOOKING" variant="contained" size="small"
                onClick={confirmbooking} 
                />
            </div>
        </Container>
    </>
}