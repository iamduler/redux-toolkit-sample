import { createAsyncThunk, createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Post } from 'types/blog.type';
import http from 'utils/http';

interface BlogState {
  postList: Post[];
  editingPost: Post | null;
}

const initialState: BlogState = {
  postList: [],
  editingPost: null
};

export const getPostList = createAsyncThunk(
  'blog/getPostList',
  async (_, thunkAPI) => {
    const response = await http.get<Post[]>('posts', {
      signal: thunkAPI.signal
    })

    return response.data
  }
)

export const addPost = createAsyncThunk('blog/addPost', async (body: Omit<Post, 'id'>, thunkAPI) => {
  const response = await http.post<Post>('posts', body, {
    signal: thunkAPI.signal
  })

  return response.data
})

export const updatePost = createAsyncThunk('blog/updatePost', async ({ postId, body }: { postId: string, body: Post }, thunkAPI) => {
  const response = await http.put<Post>(`posts/${postId}`, body, {
    signal: thunkAPI.signal
  })

  return response.data
})

export const deletePost = createAsyncThunk('blog/deletePost', async (postId: string, thunkAPI) => {
  const response = await http.delete<Post>(`posts/${postId}`, {
    signal: thunkAPI.signal
  })

  return response.data
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const foundPost = state.postList.find((post) => post.id === postId) || null;
      state.editingPost = foundPost;
    },
    cancelEditingPost: (state) => {
      state.editingPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id == action.payload.id) {
            state.postList[index] = action.payload
            return true
          }

          return false
        })

        state.editingPost = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.meta.arg
        const deletePostIndex = state.postList.findIndex(post => postId === post.id)

        if (deletePostIndex != -1) {
          state.postList.splice(deletePostIndex, 1)
        }
      })
      .addMatcher((action) => action.type.startsWith('blog/'), (state, action) => {
        console.log('Action:', action.type);
        console.log('Current State:', current(state));
      })
      .addDefaultCase((state, action) => {
        console.log('Default Case:', action.type);
        console.log('Current State:', current(state));
      });
  }
})

export const { startEditingPost, cancelEditingPost } = blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;