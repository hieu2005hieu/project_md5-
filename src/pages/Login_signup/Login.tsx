import { useNavigate } from "react-router-dom";

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
import img from "../../../public/img/logo_login.jpg";
// import apis from "../../service/api.user";
import { errorNoti, successNoti } from "../../utils/notifycation";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import PrivateRouter from "../flaguser/PrivateRouter";

function Copyright(props: any) {
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
export default function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleGetValue = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    // Xử lý đăng nhập
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/Login",
        user
      );
      if (response.data.data.status == 0) {
        errorNoti("Tài khoản dã bị khóa");
        return navigate("/Login");
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", JSON.stringify(response.data.data));
      successNoti(response.data.message);

      if (response.data.data.role == 1) {
        navigate("/AdminProduct");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      // console.log(error.response.data.message);

      errorNoti(error.response.data.message);
    }
  };

  const navigate = useNavigate();

  const handlCLicka = () => {
    navigate("/Singup");
  };

  const hanldclicktohome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="test">
        <div className="test_ter">
          <div>
            <img src={img} alt="" />
          </div>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
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
                  Đăng nhập
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleLogin}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleGetValue}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật Khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleGetValue}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đăng Nhập
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <div onClick={hanldclicktohome} className="onclicktohome">
                        Quay lại trang chính
                      </div>
                    </Grid>
                    <Grid item>
                      <div onClick={handlCLicka} className="click">
                        Chưa có tai khoản ? Đăng Kí
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
