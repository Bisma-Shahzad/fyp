import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";

export default function Footer() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  console.log("dataFromRedux at homescreen", userAuth);

  const handleLoginClick = () => {
    const userType = "User"; // or any other value
    nav("/login", {
      state: userType,
    });
    console.log("loginButton");
  };

  const handleListVehicle = () => {
    const userType = "Transporter"; // or any other value
    nav("/login", {
      state: userType,
    });
    console.log("loginButton");
  };

  const handleAddVehicleClick = () => {
    nav("/addcars");
  };

  const handleBookingClick = () => {
    nav("/transporterprofile");
  };

  const handleProfileClick = () => {
    nav("/profile");
    console.log("ProfileButton");
  };

  const handleLogoutButton = () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const TransporterPage = () => {
    nav("/cars")
  }

  return (
    <>
      <div className="mainFooter">
        <div>
          <li className="FooterLogo" onClick={() => nav("/")}>
            <img
              src={require("../../Assets/Images/asdasdasdc.png")}
              style={{ width: "90px", height: "90px", marginTop: -13 }}
            />
          </li>
        </div>
        <div className="Footerlistdiv">
          <ul>
            <li
              className="Footerlist"
              style={{ width: "150px", textAlign: "center" }}
              onClick={() => nav("/")}
            >
              Home
            </li>
            <li
              className="Footerlist"
              style={{ width: "150px", textAlign: "center" }}
              onClick={() => nav("/")}
            >
              About
            </li>
            {userAuth? (
              <li
                className="Footerlist"
                onClick={handleProfileClick}
                style={{ width: "150px", textAlign: "center" }}
              >
                Profile
              </li>
            ) : (
              <li
                className="Footerlist"
                style={{ width: "150px", textAlign: "center"  }}
                onClick={handleLoginClick}
              >
                Login
              </li>
            )}
            {userAuth? (
              <li
                className="Footerlist"
                onClick={TransporterPage}
                style={{ width: "150px", textAlign: "center" }}
              >
                Add Your Vehicle
              </li>
            ) : null}
            {userAuth? (
              <li
                className="Footerlist"
                onClick={handleLogoutButton}
                style={{ width: "150px", textAlign: "center" }}
              >
                Logout
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
