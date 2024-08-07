import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/index";

const initialState = {
  posts: [],
  isLoading: false,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await API.get("/posts");
  return response.data;
});

export const createPost = createAsyncThunk("posts/addPost", async (newPost) => {
  try {
    console.log("Creating post with data:", newPost); // Log request data
    const response = await API.post(`/posts`, newPost);
    console.log("Post created:", response.data); // Log response data
    return response.data;
  } catch (error) {
    console.log("Error creating post:", error);
  }
});
export const updatePosts = createAsyncThunk(
  "posts/updatePosts",
  async (updatePost) => {
    const { _id: id } = updatePost;
    const { data } = await API.patch(`/posts/${id}`, updatePost);
    return data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    await API.delete(`/posts/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/likePost`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //    get posts
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.isLoading = false;
    });
    // create posts
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(createPost.rejected, (state) => {
      state.isLoading = false;
    });

    // update Posts
    builder.addCase(updatePosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    });
    builder.addCase(updatePosts.rejected, (state) => {
      state.isLoading = false;
    });
    // deleting posts

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });

    //liked posts
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    });
  },
});

export default postsSlice.reducer;
