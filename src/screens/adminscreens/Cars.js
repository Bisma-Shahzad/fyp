import { useEffect, useState } from "react";
// import { getFbData, getIdData, userLogout } from "../../config/firebasemethods";
import { Link, useNavigate } from "react-router-dom";
// import BSScreenHeadercar from "../../component/BSScreenHeadercar";
// import BSButton from "../../component/BSButton";
import { useDispatch, useSelector } from "react-redux";
// import Card from "../../component/Card";
import { Container, Spinner } from "react-bootstrap";
import { getIdData, userLogout } from "../../config/firebasemethods";
import BSScreenHeadercar from "../../components/BSScreenHeadercar";
import BSButton from "../../components/BSButton";
import Card from "../../components/Card";
import CircularProgress from '@mui/material/CircularProgress';
import { getDataFromLocalStorage, removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { Box, TextField, Typography } from "@mui/material";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/UserCard";


export default function Cars() {
    const dataFromRedux = useSelector((a) => a.Login);
    const dispatch = useDispatch();
    let nav = useNavigate()
    const userAuth = useSelector(state => state.AuthReducer.userData);
    // console.log(dataFromRedux);
    const [listData, setListData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [searchProd, setSearchProd] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    let getdata = () => {
        let value = getDataFromLocalStorage('user');
        // console.log('userAuth?.instituteType: ', userAuth?.instituteType);
        let v = JSON.parse(value);
        // console.log('value ', v.id);

        setLoader(true)
        getIdData("cars", v.id)
            .then((res) => {
                // console.log(res)
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
                    available: obj.available
                }))

                // console.log(newArray);
                setListData(newArray);
                setLoader(false)
            })
            .catch((err) => {
                // console.log('no data found')
                setLoader(false)
            });
    };

    useEffect(() => {
        getdata();
    }, []);
    // console.log(listData)

    const handleLogoutButton = async () => {
        removeDataFromLocalStorage('token');
        removeDataFromLocalStorage('user');
        dispatch(removeUserDataFromAsyncStorage());
        nav('/')
    }

    const handleBookingClick = () => {
        nav('/transporterprofile')
    }

    const handleAddVehicleClick = () => {
        nav('../addcars')
    }

    const handleSearch = (text) => {
        setSearchProd(text)
    };

    const getProduct = (e) => {
        nav('/transportercardetail', {
            state: e
        })
        // console.log(e)
    }

    return <>
        {loader ? <Box
            sx={{ height: "80vh" }}
            className="d-flex justify-content-center align-items-center "
        >
            <Spinner animation="border" style={{}} />
        </Box> : (
            <>
                <nav>
                    <Link to="/cars" className="title">
                        WHEEL CONNECT
                    </Link>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="search-bar">
                        <SearchBargpt label="Search cars" onSearch={handleSearch} />
                    </div>
                    <ul className={menuOpen ? "open" : ""}>
                        <li>
                            <button onClick={handleAddVehicleClick} style={{ width: '140px' }}>
                                ADD VEHICLE
                            </button>

                        </li>
                        <li>
                            <button onClick={handleBookingClick} style={{ width: '100px', marginRight: '20px' }}>
                                PROFILE
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogoutButton} className={'logoutButton'} >
                                LOGOUT
                            </button>
                        </li>
                    </ul>
                </nav>
                <div style={{ marginTop: '50px' }}></div>
                <Container>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <h1 style={{ color: '#535969', borderBottom: '3px double #283043', marginBottom: '5%' }}>
                            YOUR CARS
                        </h1>
                    </div>
                    {loader ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Spinner animation="border" style={{}} />
                </div> :
                        <div>
                            {listData.length === 0 ? (
                                <div>
                                    <img src={require("../../Assets/Images/no_cars_search.png")} style={{ width: '100%', height: '100%', marginVerticle: '50px' }} />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    {listData.filter((x) => x.carName.toLowerCase().includes(searchProd)).map((x, i) => {
                                        return (
                                            <UserCard title={x.carName} src={x.image} price={x.cost}
                                                onClick={() => getProduct(x)}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </div>}
                </Container >
                <Footer />
            </>
        )}
    </>
}