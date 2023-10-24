import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/loginslice";

import { useEffect, useState } from "react";
import { loginTransporter, loginUser } from "../config/firebasemethods";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import '../components/Navbar/Navbar.css'
import { Spinner } from "react-bootstrap";
import { getDataFromLocalStorage, setDataToLocalStorage } from "../Utils/getAndSetInLocalStorage";
import { userDataFromAsyncStorage } from "../config/redux/reducer/AuthReducer";

function Login() {
    const location = useLocation();
    const params = location.state;
    const dispatch = useDispatch();
    let nav = useNavigate()

    // console.log('params on login', params);
    const [loader, setLoader] = useState(false)
    const [model, setModel] = useState({});
    const [valueEmail, onChangeTextEmail] = useState('');
    const [valuePass, onChangeTextPass] = useState('');

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function hasValidPassword(password) {
        // Password must be at least 8 characters long
        if (password.length <= 5) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        setModel({
            ...model,
            email: valueEmail,
            password: valuePass,
        });
    }, [valueEmail, valuePass]);

    let signIn = async () => {
        if (!model.email || !model.password) {
            alert("Please fill all the required inputs");
        } else {
            if (!isValidEmail(valueEmail)) {
                alert('Enter valid email');
            } else {
                if (hasValidPassword(valuePass)) {
                    setLoader(true);
                    try {
                        let res;
                        if (params === 'User') {
                            res = await loginUser(model);
                        } else {
                            res = await loginTransporter(model);
                        }
    
                        setLoader(false);
                        let id = res.id;
                        let userName = res.userName;
                        
                        setDataToLocalStorage('user', JSON.stringify(res));
                        setDataToLocalStorage('token', JSON.stringify(res.id));
                        
                        const storedUserData = await getDataFromLocalStorage('user');
                        dispatch(userDataFromAsyncStorage(JSON.parse(storedUserData)));
                        dispatch(add({
                            id: id,
                            userName: userName,
                        }));
                        if (params === 'User') {
                            nav('/')
                        } else {
                            nav('../cars')
                        }
                    } catch (error) {
                        setLoader(false);
                        console.error(`err of ${params === 'User' ? 'loginUser' : 'loginTransporter'}`, error);
                        alert('Incorrect Email or Password');
                    }
                } else {
                    // console.log('Not Match');
                    alert('Password must be at least 6 characters long');
                }
            }
        }
    };
    

    let handleSignupButton = () => {
        const userType = params; // or any other value
        nav('/signup', {
            state: userType
        });
        // console.log('SignupButton')
    }


    return (
        <>
            {loader ? <Box
                sx={{ height: "80vh" }}
                className="d-flex justify-content-center align-items-center "
            >
                <Spinner animation="border" style={{}} />
            </Box> : (
                <>
                    <nav>
                        <Link to="/" className="title">
                            WHEEL CONNECT
                        </Link>
                    </nav>
                    <Box
                        sx={{ height: "80vh" }}
                        className="d-flex justify-content-center align-items-center "
                    >
                        <Box>
                            <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Login</Typography>
                            <Box className="p-2" style={{ textAlign: 'center' }}>
                                <TextField
                                    onChange={(e) => onChangeTextEmail(e.target.value)}
                                    variant="standard"
                                    label="Email"
                                    // style={{textAlign: 'center'}}
                                    style={{ width: '250px' }}
                                />
                            </Box>
                            <Box className="p-2" style={{ textAlign: 'center' }}>
                                <TextField
                                    onChange={(e) => onChangeTextPass(e.target.value)}
                                    variant="standard"
                                    label="Password"
                                    type="password"
                                    style={{ width: '250px' }}
                                />
                            </Box>
                            <Box className="p-2" >
                                <button onClick={signIn} style={{
                                    width: '200px',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    color: '#283043',
                                    cursor: 'pointer',
                                    // marginRight: '40px',
                                    marginLeft: '25px',
                                    display: 'block',
                                    color: 'white',
                                    padding: '0.7rem',
                                    /* margin: 1rem 0.5rem; */
                                    /* border-radius: 0.5rem; */
                                    fontSize: 15,
                                    cursor: 'pointer',
                                    marginTop: '13px',
                                    border: 'none',
                                    backgroundColor: '#535969',
                                    borderRadius: '0.5rem'
                                }} >
                                    LOGIN
                                </button>
                            </Box>
                            <Box className="p-2" style={{ textAlign: 'center', marginTop: 20 }}>
                                <Typography>Don't have an account <Button
                                    onClick={handleSignupButton}>
                                    SignUp
                                </Button></Typography>

                            </Box>
                        </Box>
                    </Box >
                </>)}
        </>
    );
}
export default Login;