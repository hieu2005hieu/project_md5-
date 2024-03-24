import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Signup_Login.scss";
import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { notification } from "antd";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { errorNoti, successNoti } from "../../utils/notifycation";
import img from "../../../public/img/logo_login.jpg";
// import apis from "../../service/api.user";
function Copyright(props:any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function Singup() {
  const [check1, setCheck1] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    status: 1,
    img: "default.jpg",
    password_cofirm: "",
    allowExtraEmails: "",
  });
  const handleGetValue = (e:any) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignup = async (e:any) => {
    e.preventDefault();
    let newUser1 = {
      ...newUser,
      allowExtraEmails: check1,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/Register",
        newUser1
      );
      localStorage.setItem("token", response.data.token)
      successNoti(response.data.message);
      navigate("/Login");
    } catch (error: any) {
      errorNoti(error.response.data.message);
    }
  };
  const handleCheck = () => {
    setCheck1(!check1);
  };

  const navigate = useNavigate();

  const handlCLicka = () => {
    navigate("/Login");
  };

  return (
    <>
      <div className="test">
        <div className="test_ter">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" className="test2">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Đăng kí
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSignup}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        name="username"
                        id="firstName"
                        label="Tên Người Dùng"
                        value={newUser.username}
                        onChange={handleGetValue}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={newUser.email}
                        onChange={handleGetValue}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="Mật Khẩu"
                        label="Mật Khẩu"
                        name="password"
                        type="password"
                        value={newUser.password}
                        onChange={handleGetValue}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password_cofirm"
                        label="Nhập Lại Mật Khẩu"
                        type="password"
                        id="password"
                        onChange={handleGetValue}
                        value={newUser.password_cofirm}
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        required
                        control={
                          <Checkbox
                            value={newUser.allowExtraEmails}
                            color="primary"
                            onClick={(e) => handleCheck()}
                          />
                        }
                        label="I confirm with the information."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đăng kí
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <div onClick={handlCLicka} className="click">
                        Quay Lại ? Đăng nhập
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          <div>
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
