import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Toolbar, Typography, Button } from "@mui/material";
import memories from "../../assets/memories.png";
import { googleLogout } from "@react-oauth/google";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { authData } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        handleLogOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, authData]);

  const handleLogOut = () => {
    setUser(null);
    googleLogout();
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <StyledAppBar>
      <BrandContainer>
        <StyledHeading component={Link} to="/" variant="h2" align="center">
          Memories
        </StyledHeading>
        <StyledImage src={memories} alt="memories" height="60" />
      </BrandContainer>
      <StyledToolbar>
        {user ? (
          <Profile>
            <StyledAvatar alt={user.name} src={user.picture}>
              {user.name}
            </StyledAvatar>
            <StyledUsername variant="h6">{user.name}</StyledUsername>
            <LogoutButton
              variant="contained"
              color="secondary"
              onClick={handleLogOut}
            >
              Logout
            </LogoutButton>
          </Profile>
        ) : (
          <AuthButton
            component={Link}
            to="/auth"
            variant="container"
            color="primary"
          >
            Sign In
          </AuthButton>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
}

const StyledAppBar = styled.div`
  position: static;
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 425px) {
  }
`;

const StyledImage = styled.img`
  margin-left: 15px;

  @media (max-width: 425px) {
    display: none;
  }
`;

const StyledHeading = styled(Typography)`
  color: rgba(0, 183, 255, 1);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500 !important;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;

  @media (max-width: 425px) {
    font-size: 1rem !important;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 425px) {
  }
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
  width: 400px;
`;

const Profile = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledAvatar = styled(Avatar)`
  color: #690664;
  background-color: #673ab7;
`;

const StyledUsername = styled(Typography)`
  display: flex;
  align-items: center;

  @media (max-width: 425px) {
    /* display: none; */
    font-size: 0.8rem !important;
    justify-content: center;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #fa3159 !important;

  &:hover {
    background-color: #f5005699 !important;
  }

  @media (max-width: 425px) {
    font-size: 0.7rem !important;
  }
`;

const AuthButton = styled(Button)`
  background-color: #3f51b5 !important;
  color: white !important;

  &:hover {
    background-color: #5c6bc0 !important;
  }

  @media (max-width: 425px) {
    font-size: 0.8rem !important;
  }
`;
export default Navbar;
