import styled from "styled-components";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signUp(formData));
    } else {
      dispatch(signIn(formData));
    }
    navigate("/");

    //set  timeout
    setTimeout(() => {
      window.location.reload();
    }, 6000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setShowPassword(false);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const googleSuccess = async (res) => {
    const { name, picture, sub, email } = jwtDecode(res.credential);

    const user = {
      _id: sub,
      name,
      email,
      picture,
      token: res.credential,
    };

    try {
      //local storage set item
      localStorage.setItem("profile", JSON.stringify(user));

      //redirect to home page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: "10px" }}
        >
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ marginBottom: "10px" }}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </StyledButton>
          <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign in"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StyledAvatar = styled(Avatar)`
  margin: 5px;
  background-color: #f50057 !important;
`;

const StyledForm = styled.form``;

const StyledButton = styled(Button)`
  margin-top: 10px !important;
  background-color: #3f51b5 !important;
  color: #fff !important;
  margin-bottom: 10px !important;

  &:hover {
    background-color: #5c6bc0 !important;
  }
`;

// const GoogleButton = styled(Button)``;

export default Auth;
