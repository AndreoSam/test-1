import React, { useState } from "react";
import { base_url, user_url } from "../api/api_url";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Typography from "@mui/material/Typography";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  let api_url = base_url + user_url;
  //   console.log("API: ",api_url);
  let navigate = useNavigate();

  let [img, setImg] = useState();

  let [state, setState] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
    error: { name: "", city: "", email: "", phone: "" },
  });

  const setImgState = (file) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("Load", () => {
      console.log("Image: ", fileReader.result);
      setImg(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    let err = state.error;

    switch (name) {
      case "name":
        err.name = value.length < 2 ? "enter your name" : "";
        break;

      case "email":
        err.email = value.length < 2 ? "enter your email" : "";
        break;

      case "phone":
        err.phone = value.length < 2 ? "enter your phone" : "";
        break;

      case "city":
        err.city = value.length < 2 ? "enter your city" : "";
        break;

      default:
        break;
    }

    setState({ ...state, [name]: value, error: err });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Values: ", state, img);

    let user = new FormData();
    user.append("name", state.name);
    user.append("city", state.name);
    user.append("email", state.name);
    user.append("phone", state.name);
    user.append("photo", img);

    axios
      .post(api_url, user, {
        headers: {
          "Content-Type": "application/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Axios resolved: ", res);
        alert("Login Successful");
        navigate("");
      })
      .catch((err) => {
        console.log("Axios error: ", err);
      });
  };

  return (
    <div className="reg_box">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom className="reg">
          REGISTRATION
        </Typography>
        <hr />
        <div>
          <TextField
            id="outlined-basic"
            name="name"
            label="Name"
            type="text"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          {state.error.name.length > 0 ? (
            <p className="text-danger">** {state.error.name}</p>
          ) : (
            ""
          )}
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic2"
            name="city"
            label="City"
            type="text"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          {state.error.city.length > 0 ? (
            <p className="text-danger">** {state.error.city}</p>
          ) : (
            ""
          )}
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic3"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          {state.error.email.length > 0 ? (
            <p className="text-danger">** {state.error.email}</p>
          ) : (
            ""
          )}
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic4"
            name="phone"
            label="Phone No."
            type="number"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          {state.error.phone.length > 0 ? (
            <p className="text-danger">** {state.error.phone}</p>
          ) : (
            ""
          )}
        </div>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImgState(event.target.files[0])}
        />
        <br />
        <input type="submit" value="Submit" />
      </Box>
    </div>
  );
};

export default Registration;
