import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { postFbData } from "../../config/firebasemethods";
import BSSwitch from "../../components/BSSwitch";
import '../../components/Navbar/Navbar.css'
import { storage } from '../../config/firebaseconfig';
import { v4 } from "uuid";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";

export default function AddCars() {
    const dataFromRedux = useSelector(state => state.AuthReducer.userData);
    console.log('dataFromRedux on addcars', dataFromRedux)
    const [model, setModel] = useState({
        ac: false,
        gps: false,
        bluetooth: false,
        usbPort: false,
        userid: dataFromRedux.id,
        userName: dataFromRedux.userName,
    })

    let nav = useNavigate()
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const imagesListRef = ref(storage, "${userId}");
    const uploadFile = () => {
        if (imageUpload == null || isImageUploaded) return;
        const userId = dataFromRedux.id;
        const imageRef = ref(storage, `${userId}/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
                setIsImageUploaded(true);
                setModel({ ...model, image: url })
            });
        });
    };
    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    setModel({ ...model, image: url })
                });
            });
        });
    }, []);
    
    
    let add = () => {
        console.log(model)
        if (!model.carName || !model.modelname || !model.cost || !model.description || !model.available) {
            alert("Please fill all the required inputs");
        } else if (!isImageUploaded) {
            alert("Please Upload Image");
        }
        else {
            postFbData("cars", model)
                .then((res) => {
                    console.log(res);
                    nav('/cars')
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    console.log('imageUrls', imageUrls)


    return <>
        <nav>
            <Link to="/cars" className="title">
            WHEEL CONNECT
            </Link>
        </nav>
        <Container>
            <div style={{ marginTop: '20px' }}>
                <Box className="p-2" style={{ textAlign: 'center' }}>
                    <TextField
                        onChange={(e) => setModel({ ...model, carName: e.target.value })}
                        variant="standard"
                        label="Car Name"
                        style={{ width: '50vw' }}
                        required={true}
                    />
                </Box>
                <Box className="p-2" style={{ textAlign: 'center' }}>
                    <TextField
                        onChange={(e) => setModel({ ...model, modelname: e.target.value })}
                        variant="standard"
                        label="Model"
                        style={{ width: '50vw' }}
                        required={true}
                    />
                </Box>
                <Box className="p-2" style={{ textAlign: 'center' }}>
                    <TextField
                        onChange={(e) => setModel({ ...model, cost: e.target.value })}
                        variant="standard"
                        label="Cost (per hour)"
                        style={{ width: '50vw' }}
                        required={true}
                    />
                </Box>
                <Box className="p-2" style={{ textAlign: 'center' }}>
                    <TextField
                        onChange={(e) => setModel({ ...model, available: e.target.value })}
                        variant="standard"
                        label="Availability (in days)"
                        style={{ width: '50vw' }}
                        required={true}
                    />
                </Box>

                <Box className="p-2" style={{ textAlign: 'center' }}>
                    <TextField
                        onChange={(e) => setModel({ ...model, description: e.target.value })}
                        variant="standard"
                        label="Description"
                        style={{ width: '50vw' }}
                        required={true}
                    />
                </Box>

                <Box className="p-2" style={{ textAlign: 'center' }}>
                    <input
                        style={{
                           color: 'red' // Hide the default file input button
                          }}
                        type="file"
                        onChange={(event) => {
                            if (!isImageUploaded) {
                                setImageUpload(event.target.files[0]);
                            }
                        }}
                    />
                    {/* <button onClick={uploadFile} disabled={isImageUploaded}> Upload Image</button> */}
                    <button className="UploadImageButton" onClick={uploadFile} disabled={isImageUploaded} style={{ textAlign: 'center' }} > Upload Image</button>
                    <img src={imageUrls} width='100vw' height='100vh' alt="No Image" />
                </Box>


                <Box style={{ width: '51vw', margin: 'auto', display: "flex", flexWrap: 'wrap' }}>
                    <Box className="py-3" style={{ textAlign: 'center', margin: '5px' }}>
                        <Typography variant="h6" style={{ color: '#283043', fontWeight: 'bold' }} >Features:</Typography>
                    </Box>
                    <Box className="p-3">
                        <BSSwitch label="AC" onChange={(e) => setModel({ ...model, ac: e.target.checked })} />
                    </Box>

                    <Box className="p-3">
                        <BSSwitch label="GPS" onChange={(e) => setModel({ ...model, gps: e.target.checked })} />
                    </Box>

                    <Box className="p-3">
                        <BSSwitch label="Bluetooth" onChange={(e) => setModel({ ...model, bluetooth: e.target.checked })} />
                    </Box>

                    <Box className="p-3">
                        <BSSwitch label="USB" onChange={(e) => setModel({ ...model, usbPort: e.target.checked })} />
                    </Box>
                </Box>
                <div style={{ textAlign: 'center' }}>
                    <button className="AddCarButton" onClick={add} style={{ textAlign: 'center' }} >Add Car</button>
                </div>
            </div>
        </Container>
    </>
}