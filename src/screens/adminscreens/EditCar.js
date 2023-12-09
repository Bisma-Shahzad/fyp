import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { editCarData, postCarData, postFbData } from "../../config/firebasemethods";
import BSSwitch from "../../components/BSSwitch";
import "../../components/Navbar/Navbar.css";
import "../../components/Navbar/NewNavbar.css";
import { storage } from "../../config/firebaseconfig";
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import "../../components/Navbar/NewNavbar.css";

const suggestions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const carBrands = [
  "Toyota",
  "Suzuki",
  "Honda",
  "Daihatsu",
  "Audi",
  "Bentley",
  "BMW",
  "Cadillac",
  "Changan",
  "Hyundai",
  "KIA",
  "Lexus",
  "Mazda",
  "MercedesBenz",
  "Nissan",
  "Porsche",
  "RangeRover",
];

const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: currentYear - 1989 },
  (_, index) => 1990 + index
).reverse();

const carModelsMapping = {
  Toyota: ["Corolla", "Yaris", "Aqua", "Fortuner", "Prius"],
  Suzuki: ["Alto", "Cultus", "Wagon R", "Swift"],
  Honda: ["City", "Civic", "Vezel", "N Wgn", "Accord"],
  Daihatsu: ["Cuore", "Mira", "Move", "Hijet", "Charade"],
  Audi: ["A4", "A6", "A3", "A5", "A8", "A7"],
  Bentley: ["Continental GT", "Flying Spur", "Mulsanne"],
  BMW: ["3 Series", "7 Series", "5 Series", "X5 Series", "X1"],
  Cadillac: ["CTS", "Escalade Ext"],
  Changan: ["Chitral", "Kalam", "Alsvin", "Gilgit"],
  Hyundai: [
    "Tucson",
    "Grand Starex",
    "Sonata",
    "Elantra",
    "Santro",
    "Terracan",
  ],
  KIA: ["Sportage", "Picanto", "Spectra", "Pride", "Sorento"],
  Lexus: ["CT200h", "RX Series", "LX Series"],
  Mazda: ["Carol", "Scrum", "Flair", "RX8", "Carol Eco"],
  MercedesBenz: ["C Class", "E Class", "S Class"],
  Nissan: ["Dayz", "Dayz Highway Star", "Clipper", "Sunny", "Juke"],
  Porsche: ["Cayenne", "Panamera", "Macan"],
  RangeRover: ["Sport", "Vogue"],
  Years: years.map((year) => ({ label: year.toString(), value: year })),
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const engineType = ["Petrol", "Diesel", "LPG", "CNG", "Hybrid", "Electric"];

const bookingTypes = ["With Driver", "Self Drive", "Both"];

const colorsArray = [
  "White",
  "Silver",
  "Black",
  "Grey",
  "Blue",
  "Green",
  "Red",
  "Gold",
  "Maroon",
  "Beige",
  "Pink",
  "Brown",
  "Burgundy",
  "Yellow",
  "Bronze",
  "Purple",
  "Turquoise",
  "Orange",
  "Indigo",
  "Magenta",
  "Navy",
  "Unlisted",
];

export default function EditCars() {
  const location = useLocation();
  let data = location.state;
  console.log("data on transportercardetail", data);
  const dataFromRedux = useSelector((state) => state.AuthReducer.userData);
  console.log("dataFromRedux on addcars", dataFromRedux);
  const [model, setModel] = useState({
    ac: data.ac,
    airBags: data.airBags,
    bluetooth: data.bluetooth,
    bookingType: data.bookingType,
    cassettePlayer: data.cassettePlayer,
    color: data.color,
    companyName: data.companyName,
    cost: data.cost,
    description: data.description,
    engineType: data.engineType,
    frontCamera: data.frontCamera,
    gps: data.gps,
    // id: data.id,
    image1: data.image1,
    image2: data.image2,
    image3: data.image3,
    image4: data.image4,
    modelName: data.modelName,
    modelYear: data.modelYear,
    sunRoof: data.sunRoof,
    usbPort: data.usbPort,
    userName: data.userName,
    userid: data.userid,
    available: data.available,
    carNumber: data.carNumber,
  });
  let nav = useNavigate();
  const [imageUrls, setImageUrls] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(data.companyName || "");
  const [modelName, setModelName] = useState(data.modelName || "");
  const [selectedYear, setSelectedYear] = useState(data.modelYear);
  const [selectedDays, setSelectedDays] = useState([data.available]);
  const [selectedEngineType, setSelectedEngineType] = useState(data.engineType);
  const [color, setColor] = useState(data.color);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([data.image1, data.image2, data.image3, data.image4]);
  const [images, setImages] = useState([data.image1, data.image2, data.image3, data.image4]);
  const [imageURLS, setImageURLs] = useState([]);
  const [imageone, setImageone] = useState(data.image1);
  const [imagetwo, setImagetwo] = useState(data.image2);
  const [imagethree, setImagethree] = useState(data.image3);
  const [imagefour, setImagefour] = useState(data.image4);
  const [bookingTypestate, setBookingTypestate] = useState(data.bookingType);
  const [fileNames, setFileNames] = useState([]);
  const [cost, setCost] = useState(data.cost);
  const [description, setDescription] = useState(data.description || "");
  const [carNo, setCarNo] = useState(data.carNumber);
  const storageRef = ref(storage, "images");

  console.log('selectedBrand', selectedBrand)

  const handleBrandChange = (e, newValue) => {
    setSelectedBrand(newValue);
    setModelName(null);
    // Reset modelName when brand changes
    setModel((prevModel) => ({
      ...prevModel,
      companyName: newValue,
      modelName: "",
    }));
  };

  const handleInputChange = (e, newValue) => {
    setModelName(newValue);
    setModel({ ...model, modelName: newValue });
  };

  const handleYearChange = (e, newValue) => {
    setSelectedYear(newValue);
    setModel({ ...model, modelYear: newValue });
  };

  const handleEngineType = (e, newValue) => {
    setSelectedEngineType(newValue);
    setModel({ ...model, engineType: newValue });
  };

  const handleBookingType = (e, newValue) => {
    setBookingTypestate(newValue)
    setModel({ ...model, bookingType: newValue });
  };

  const handleDays = (e, newValue) => {
    setSelectedDays(newValue);
    setModel({ ...model, available: newValue });
  };
  const handleCostValue = (e, newValue) => {
    setCost(newValue);
    setModel({ ...model, cost: newValue });
  };

  const handlecolor = (e, newValue) => {
    setColor(newValue);
    setModel({ ...model, color: newValue });
  };
  const handleDescription = (e, newValue) => {
    setDescription(newValue);
    setModel({ ...model, description: newValue });
  };
  const handleCarNumber = (e, newValue) => {
    setCarNo(newValue);
    setModel({ ...model, carNumber: newValue });
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setModel((prevModel) => ({
      ...prevModel,
      ac: data.ac,
      airBags: data.airBags,
      bluetooth: data.bluetooth,
      // ... (other properties)
      // Update other properties with their respective state values
      companyName: selectedBrand || prevModel.companyName,
      modelName: modelName || prevModel.modelName,
      modelYear: selectedYear || prevModel.modelYear,
      // ... (other properties)
      // Update properties with their respective state values
    }));
  }, [selectedBrand, modelName, selectedYear, /* ... (other state values) */]);

  useEffect(() => {
    setModel({
      ...model,
      companyName: selectedBrand,
      // userName: userName,
      // email: valueEmail,
      // password: userAuth.password,
      // confirmPassword: userAuth.confirmPassword,
      // contact: contact,
      // id: userAuth.id,
    });
  }, [selectedBrand]);
  console.log("model.carNumber", model.carNumber)

  const imagesListRef = ref(storage, "${userId}");
  const uploadFile = () => {
    console.log("imageUrls in onimagechange");
    console.log("imageoneURL", imageUrls[1]);

    const [imageoneURL, imagetwoURL, imagethreeURL, imagefourURL] = imageUrls;

    setModel({
      ...model,
      image1: imageUrls[0],
      image2: imageUrls[1],
      image3: imageUrls[2],
      image4: imageUrls[3],
    });
  };

  useEffect(() => {
    console.log("imageUrls", imageUrls);
    setModel({
      ...model,
      image1: imageUrls[0],
      image2: imageUrls[1],
      image3: imageUrls[2],
      image4: imageUrls[3],
    });
  }, [imageUrls.length == 4]);

  function onImageChange(e) {
    setUploadedImageUrls([])
    setImages([null])
    const selectedImages = [...e.target.files];
    setImages(selectedImages);
    const uploadTasks = [];

    // Loop through the selected images and update individual image states
    selectedImages.forEach((image, index) => {
      const imageUrl = URL.createObjectURL(image);

      // Update individual image states based on index
      if (index === 0) {
        setImageone(imageUrl);
      } else if (index === 1) {
        setImagetwo(imageUrl);
      } else if (index === 2) {
        setImagethree(imageUrl);
      } else if (index === 3) {
        setImagefour(imageUrl);
      }

      const imageRef = ref(storage, `images/${image.name + v4()}`);
      const uploadTask = uploadBytes(imageRef, image);
      uploadTasks.push(uploadTask);

      uploadTask.then((snapshot) => {
        // Retrieve the download URL after the upload is complete
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          setUploadedImageUrls((prevUrls) => [...prevUrls, url]);

          // If all images are uploaded and their URLs are retrieved, update the model object
          if (uploadTasks.length === selectedImages.length) {
            // Wait for all asynchronous operations to complete before updating the model object
            Promise.all(uploadTasks).then(() => {
              // Update the model object with the image URLs
              setModel({
                ...model,
                image1: imageUrls[0] || null,
                image2: imageUrls[1] || null,
                image3: imageUrls[2] || null,
                image4: imageUrls[3] || null,
              });
            });
          }
        });
      });
    });
  }
  console.log("images in onImageChange", imageone);

  console.log("fileNames", images);

  let edit = () => {
    console.log('model in edit function', model);
    if (
      !model.companyName ||
      !model.modelName ||
      !model.modelYear ||
      !model.cost ||
      !model.description ||
      !model.color ||
      !model.engineType ||
      !model.bookingType ||
      !model.available ||
      !model.carNumber
    ) {
      alert("Please fill all the required inputs");
    } else if (images.length != 4) {
      alert("You have to upload 4 images");
    } else {
        editCarData("cars", model, model.carNumber)
        .then((res) => {
          console.log("res", res);
          // model.available.forEach((day) => {
          //   editCarData(`${day}`, model)
          //     .then((res2) => {
          //       console.log(res2);
          //       editCarData(model.bookingType, model)
          //         .then((res3) => {
          //           console.log(res3);
          //         })
          //         .catch((err3) => {
          //           console.log(err3);
          //         });
          //     })
          //     .catch((err2) => {
          //       console.log(err2);
          //     });
          // });
          nav("/cars");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <nav>
        <div
          onClick={() => nav("/cars")}
          className={`logo ${isActive ? "hide" : ""}`}
        >
          <img
            src={require("../../Assets/Images/asdasdasdc.png")}
            style={{
              width: "90px",
              height: "90px",
              marginTop: -13,
              cursor: "pointer",
            }}
          />
        </div>
      </nav>
      <Container>
        <div style={{ marginTop: "20px" }}>
          <Box className="p-2" style={{ textAlign: "center" }}>
            <Autocomplete
              value={model.companyName}
              inputValue={model.companyName}
              onInputChange={handleBrandChange}
              options={carBrands}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Company Name"
                  style={{ width: "50vw" }}
                  required={true}
                />
              )}
            />
          </Box>
          <Box className="p-2" style={{ textAlign: "center" }}>
            <Autocomplete
              value={modelName}
              // inputValue={model.modelName}
              onInputChange={handleInputChange}
              options={carModelsMapping[selectedBrand] || []}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Model"
                  style={{ width: "50vw" }}
                  required={true}
                />
              )}
            />
          </Box>

          <Box className="p-2" style={{ textAlign: "center" }}>
            <Autocomplete
              value={selectedYear}
              //   onChange={(e, newValue) => setSelectedYear(newValue)}
              onChange={handleYearChange}
              options={carModelsMapping.Years}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Model Year"
                  style={{ width: "50vw" }}
                  required={true}
                />
              )}
            />
          </Box>

          <Box className="p-2" style={{ textAlign: "center" }}>
            <TextField
              //   onChange={(e) => setModel({ ...model, cost: e.target.value })}
              value={cost}
              inputValue={data.cost}
              onChange={handleCostValue}
              variant="standard"
              label="Cost (per hour)"
              style={{ width: "50vw" }}
              required={true}
            />
          </Box>

          <Box className="p-2" style={{ textAlign: "center" }}>
            <Autocomplete
              multiple
              value={selectedDays}
              // onChange={(event, newValue) => setSelectedDays(newValue)}
              onChange={handleDays}
              options={daysOfWeek}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Availability (in days)"
                  style={{ width: "50vw" }}
                  required={true}
                />
              )}
            />
          </Box>

          <Box className="p-2" style={{ textAlign: "center" }}>
            <Autocomplete
              value={selectedEngineType}
              inputValue={model.engineType}
              // onChange={(event, newValue) => setSelectedEngineType(newValue)}
              onChange={handleEngineType}
              options={engineType}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Engine Type"
                  style={{ width: "50vw" }}
                  required={true}
                />
              )}
            />
          </Box>
          

          <Box className="p-2" style={{ textAlign: "center" }}>
            <Autocomplete
              value={color}
              // inputValue={model.color}
              // onChange={(event, newValue) => setColor(newValue)}
              onInputChange={handlecolor}
              options={colorsArray}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Exterior Color"
                  style={{ width: "50vw" }}
                  required={true}
                />
              )}
            />
          </Box>

          <Box className="p-2" style={{ textAlign: "center" }}>
            <TextField
              value={description}
              inputValue={data.description}
              onChange={handleDescription}
              //   onChange={(e) =>
              //     setModel({ ...model, description: e.target.value })
              //   }
              variant="standard"
              label="Description"
              style={{ width: "50vw" }}
              required={true}
            />
          </Box>

          <Box className="p-2" style={{ textAlign: "center" }}>
            <TextField
              value={carNo}
              inputValue={data.carNo}
              onChange={handleCarNumber}
              variant="standard"
              label="Car Number"
              style={{ width: "50vw" }}
              disabled
            />
          </Box>
          <Box className="p-2" style={{ textAlign: "center" }}>
            <Autocomplete
              value={bookingTypestate}
              inputValue={model.bookingType}
              // onChange={(event, newValue) => setSelectedEngineType(newValue)}
              onChange={handleBookingType}
              options={bookingTypes}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Booking Type"
                  style={{ width: "50vw" }}
                  required={true}
                />
              )}
            />
          </Box>
          
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            {uploadedImageUrls.map((imageSrc) => (
              <img
                src={imageSrc}
                alt="not fount"
                width={"100px"}
                style={{
                  margin: "10px",
                  border: "1px solid black",
                  height: "70px",
                }}
              />
            ))}
          </div>

          <Box
            style={{
              width: "51vw",
              margin: "auto",
              display: "flex",
              flexWrap: "wrap",
              textAlign: "center",
            }}
          >
            <Box
              className="py-3"
              style={{ textAlign: "center", margin: "5px" }}
            >
              <Typography
                variant="h6"
                style={{ color: "#283043", fontWeight: "bold" }}
              >
                Features:
              </Typography>
            </Box>
            <Box className="p-3">
              <BSSwitch
                label="AC"
                onChange={(e) => setModel({ ...model, ac: e.target.checked })}
                checked={data.ac}
                />
            </Box>

            <Box className="p-3">
              <BSSwitch
                label="GPS"
                onChange={(e) => setModel({ ...model, gps: e.target.checked })}
                checked={data.gps}
                />
            </Box>

            <Box className="p-3">
              <BSSwitch
                label="Bluetooth"
                onChange={(e) =>
                    setModel({ ...model, bluetooth: e.target.checked })
                }
                checked={data.bluetooth}
                />
            </Box>

            <Box className="p-3">
              <BSSwitch
                label="USB"
                onChange={(e) =>
                    setModel({ ...model, usbPort: e.target.checked })
                }
                checked={data.usbPort}
                />
            </Box>
            <Box className="p-3">
              <BSSwitch
                label="Front Camera"
                onChange={(e) =>
                    setModel({ ...model, frontCamera: e.target.checked })
                }
                checked={data.frontCamera}
                />
            </Box>
            <Box className="p-3">
              <BSSwitch
                label="Cassette Player"
                onChange={(e) =>
                    setModel({ ...model, cassettePlayer: e.target.checked })
                }
                checked={data.cassettePlayer}
                />
            </Box>
            <Box className="p-3">
              <BSSwitch
                label="Air Bags"
                onChange={(e) =>
                    setModel({ ...model, airBags: e.target.checked })
                }
                checked={data.airBags}
                />
            </Box>
            <Box className="p-3">
              <BSSwitch
                label="Sun Roof"
                onChange={(e) =>
                    setModel({ ...model, sunRoof: e.target.checked })
                }
                checked={data.sunRoof}
              />
            </Box>
          </Box>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <button
              className="AddCarButton"
              onClick={edit}
              style={{ textAlign: "center" }}
            >
              Edit Car
            </button>
          </div> 
        </div>
      </Container>
    </>
  );
}
