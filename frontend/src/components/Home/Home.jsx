import { Container, Grow, Grid } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import styled from "styled-components";
import { getPosts } from "../../features/postSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());

    return () => {
      // cleanup
    };
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <MainGrid container>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </MainGrid>
      </Container>
    </Grow>
  );
};

const MainGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

export default Home;
