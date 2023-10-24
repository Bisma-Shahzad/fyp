import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIdData, userLogout } from "../../config/firebasemethods";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography } from "@mui/material";
import BSScreenHeader from "../../components/BSScreenHeader";
import EditIcon from '@mui/icons-material/Edit';
import BSIconButton from "../../components/BSIconButton";
import BSButton from "../../components/BSButton";
import CircularProgress from '@mui/material/CircularProgress';


export default function Booking() {
    const dataFromRedux = useSelector((a) => a.Login);
    console.log(dataFromRedux);
    const [listData, setListData] = useState([]);
    const [loader, setLoader] = useState(false)

    let getdata = () => {
        setLoader(true)
        getIdData("transporterbooking", dataFromRedux.id)
            .then((res) => {
                console.log(res)
                const newArray = Object.values(res).map(obj => ({
                    ac: obj.ac,
                    bluetooth: obj.bluetooth,
                    carName: obj.carName,
                    cost: obj.cost,
                    description: obj.description,
                    gps: obj.gps,
                    id: obj.id,
                    image: obj.image,
                    modelname: obj.modelname,
                    usbPort: obj.usbPort,
                    userName: obj.userName,
                    userid: obj.userid,
                    available: obj.available,
                    customerid: obj.customerid,
                    customeruserName: obj.customeruserName,

                }))

                console.log(newArray);
                setListData(newArray);
                setLoader(false)
            })
            .catch((err) => {
                console.log('no data found')
                setLoader(false)
            });
    };

    useEffect(() => {
        getdata();
    }, []);
    console.log(listData)

    let nav = useNavigate()

    let details = (e) => {
        nav('/bookingform', {
            state: e
          })
    }

    let logout = () => {
    userLogout()
    .then((res) => {
        console.log("Logged out")
        nav("/")
    }).catch((err) => {
        console.log(err)
    })
}

    return <>
    <BSScreenHeader title="Bookings"
    firstSidebutton={<BSButton title="Logout" variant="contained" onClick={logout} />}  />
    
      <Paper elevation={3} fullwidth="true" sx={{
        height: '50px', margin: '10px', textAlign: 'center', display: 'flex',
        alignItems: 'center'
      }}>
        <Grid container sx={{}} >
          <Grid item md={4} xs={3}>
            <Typography variant="h6">Car Name</Typography>
          </Grid>
          <Grid item md={4} xs={3}>
            <Typography variant="h6">Customer Name</Typography>
          </Grid>
          <Grid item md={4} xs={3}>
            <Typography variant="h6">Cost</Typography>
          </Grid>
          <Grid item md={1} xs={1}>
              
            </Grid>
        </Grid>
      </Paper >
      {loader ? <div>
        <h1>Loading...</h1>
            </div> :
      listData.map((x, i) => {
        return (<Paper elevation={3} fullwidth="true" sx={{
          height: '50px', margin: '10px', textAlign: 'center', display: 'flex',
          alignItems: 'center'
        }}>
          <Grid container >
            <Grid item md={4} xs={3} >
              {x.carName}
            </Grid>
            <Grid item md={4} xs={3}>
              {x.customeruserName}
            </Grid>
            <Grid item md={3} xs={3}>
              {x.cost}
              </Grid>
            {/* //   ? <BSIconButton size="large" icon={<CircleIcon />} sx={{ color: 'green' }} arialabel='active' /> : 
            //   <BSIconButton size="large" icon={<CircleIcon />} sx={{ color: 'red' }} arialabel="inactive" /> } */}
            
            <Grid item md={1} xs={1}>
              {<BSIconButton size="large" icon={<EditIcon />} onClick={() => details(x)} arialabel="edit" />}
            </Grid>
          </Grid>
        </Paper >)
      })
    }
    </>
}