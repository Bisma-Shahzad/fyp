import { useEffect, useState } from "react";
import { signUpUser } from "../config/firebasemethods";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import "../components/Navbar/Navbar.css";
import { Spinner } from "react-bootstrap";
import "../components/Navbar/NewNavbar.css";

function Signup() {
  const [model, setModel] = useState({});
  const [valueEmail, onChangeTextEmail] = useState("");
  const [userName, onChangeUserName] = useState("");
  const [contact, onChangeContact] = useState("");
  const [valuePass, onChangeTextPass] = useState("");
  const [valueConfirmPass, onChangeTextConfirmPass] = useState("");
  const [error, onChangeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

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

  let nav = useNavigate();

  useEffect(() => {
    setModel({
      ...model,
      userName: userName,
      email: valueEmail,
      password: valuePass,
      confirmPassword: valueConfirmPass,
      contact: contact,
    });
  }, [userName, valueEmail, valuePass, valueConfirmPass, contact]);

  let createUser = () => {
    console.log(model);
    if (
      !model.userName ||
      !model.confirmPassword ||
      !model.contact ||
      !model.email ||
      !model.password
    ) {
      alert("Please fill all the required inputs");
    } else {
      if (!isValidEmail(valueEmail)) {
        alert("Enter valid email");
      } else {
        if (valuePass === valueConfirmPass) {
          if (hasValidPassword(valuePass)) {
            console.log("valueEmail: ", valueEmail);
            console.log("valuePass: ", valuePass);
            console.log("valueConfirmPass: ", valueConfirmPass);
            console.log("Match");
            setLoading(true);

            signUpUser(model)
              .then((res) => {
                console.log(res); // or any other value
                setLoading(false);
                nav("/login");
                console.log("Signup button at signup screen");
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
                alert(err);
              });
          } else {
            console.log("Not Match");
            alert("Password must be at least 6 characters long ");
          }
        } else {
          console.log("Not Match");
          alert("Password and confirm Password do not match");
        }
      }
    }
  };

  const handleLoginButton = () => {
    // or any other value
    nav("/login");
    console.log("loginButton");
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center "
        >
          <Spinner animation="border" style={{}} />
        </Box>
      ) : (
        <>
          {/* <nav>
                        <div onClick={() => nav('/')} className={`logo ${isActive ? 'hide' : ''}`}>
                            <img src={require("../Assets/Images/asdasdasdc.png")} style={{ width: '90px', height: '90px', marginTop: -13, cursor: 'pointer' }} />
                        </div>
                    </nav> */}
          <header>
            <div onClick={() => nav("/")} className={`logo `}>
              <img
                src={require("../Assets/Images/asdasdasdc.png")}
                style={{
                  width: "90px",
                  height: "90px",
                  marginTop: -9,
                  cursor: "pointer",
                }}
              />
            </div>
          </header>
          <Box
            sx={{ height: "90vh" }}
            className="d-flex justify-content-center align-items-center "
          >
            <Box>
              <Typography
                variant="h4"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Signup
              </Typography>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  onChange={(e) => onChangeUserName(e.target.value)}
                  variant="standard"
                  label="Name"
                  style={{ width: "250px" }}
                />
              </Box>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  onChange={(e) => onChangeTextEmail(e.target.value)}
                  variant="standard"
                  label="Email"
                  style={{ width: "250px" }}
                />
              </Box>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  onChange={(e) => onChangeTextPass(e.target.value)}
                  variant="standard"
                  label="Password"
                  type="password"
                  style={{ width: "250px" }}
                />
              </Box>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  onChange={(e) => onChangeTextConfirmPass(e.target.value)}
                  variant="standard"
                  label="Confirm Password"
                  type="password"
                  style={{ width: "250px" }}
                />
              </Box>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  onChange={(e) => onChangeContact(e.target.value)}
                  variant="standard"
                  label="Contact"
                  style={{ width: "250px" }}
                />
              </Box>

              {/* <Box
                    // className="p-3"
                    >
                        < BSSelect label="User Type" minWidth='200px'
                            searchList={
                                [
                                    {
                                        displayName: "Transporter",
                                        key: 1,
                                    },
                                    {
                                        displayName: "User",
                                        key: 2,
                                    },
                                ]} selectedval={(selectVal) => {
                                    setModel({ ...model, instituteType: selectVal })
                                }}
                        />
                    </Box> */}
              {/* </Grid>
                    </Grid> */}
              <Box className="p-2">
                {/* <BSButton variant="contained" onClick={createUser} title="Signup" /> */}
                <button
                  onClick={createUser}
                  style={{
                    width: "200px",
                    textAlign: "center",
                    backgroundColor: "white",
                    color: "#283043",
                    cursor: "pointer",
                    // marginRight: '40px',
                    marginLeft: "25px",
                    display: "block",
                    color: "white",
                    padding: "0.7rem",
                    /* margin: 1rem 0.5rem; */
                    /* border-radius: 0.5rem; */
                    fontSize: 15,
                    cursor: "pointer",
                    marginTop: "13px",
                    border: "none",
                    backgroundColor: "#535969",
                    borderRadius: "0.5rem",
                  }}
                >
                  SIGNUP
                </button>
              </Box>

              <Box
                className="p-2"
                style={{ textAlign: "center", marginTop: 20 }}
              >
                <Typography>
                  Already have an account{" "}
                  <Button onClick={handleLoginButton}>Login</Button>
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
export default Signup;
