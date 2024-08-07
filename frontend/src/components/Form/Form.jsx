import { TextField, Button, Typography, Paper } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePosts } from "../../features/postSlice";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const post = posts?.find((post) =>
    currentId ? post._id === currentId : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePosts({ ...postData, name: user?.name }));
    } else {
      console.log("Creating post:", { ...postData, name: user?.name });
      dispatch(createPost({ ...postData, name: user?.name }));
      console.log("send post");
    }
    clear();
  };

  if (!user?.name) {
    return (
      <Paper sx={{ p: 6, mt: 8, mb: 6 }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like others memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <StyledPaper>
      <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating a Memory"}
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <StyledFileInput>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </StyledFileInput>
        <ButtonSubmit
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </ButtonSubmit>
        <ClearButton onClick={clear}>Clear</ClearButton>
      </StyledForm>
    </StyledPaper>
  );
};

Form.propTypes = {
  currentId: PropTypes.number,
  setCurrentId: PropTypes.func.isRequired,
};

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  justify-content: center;
`;

const StyledFileInput = styled.div`
  width: 97%;
  margin: 10px 0;
`;

const ButtonSubmit = styled(Button)`
  /* margin-bottom: 10px; */
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
`;

const ClearButton = styled.button`
  margin-top: 4px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: #ff1744;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);

  &:hover {
    background-color: #fa3159;
  }
`;

export default Form;
