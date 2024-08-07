import styled from "styled-components";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../features/postSlice";
import PropTypes from "prop-types";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?._id) ? (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  return (
    <StyledCard raised elevation={6}>
      <StyledMedia image={post?.selectedFile} title={post.title} />
      <StyledOverlay>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </StyledOverlay>
      {user?.id === post?.creator ||
        (user?._id === post?.creator && (
          <StyledOverlay2>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </StyledOverlay2>
        ))}

      <StyledDetails>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </StyledDetails>
      <StyledTitle variant="h5" gutterBottom>
        {post.title}
      </StyledTitle>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <StyledCardActions>
        <Button
          disabled={!user}
          size="small"
          color="primary"
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {user?.id === post?.creator ||
          (user?._id === post?.creator && (
            <Button size="small" color="primary" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          ))}
      </StyledCardActions>
    </StyledCard>
  );
};

Post.propTypes = {
  post: PropTypes.string,
  setCurrentId: PropTypes.func.isRequired,
};

const StyledMedia = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  height: 100%;
  position: relative;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`;

const StyledOverlay2 = styled.div`
  position: absolute;
  top: 20px;
  right: 0px;
  color: white;
`;

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const StyledTitle = styled(Typography)`
  padding: 0 16px;
`;

const StyledCardActions = styled(CardActions)`
  padding: 0 16px 8px 16px;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;

export default Post;
