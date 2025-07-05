import { createAction, createReducer, createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { initialPostList } from 'constants/blog';
import { Post } from 'types/blog.type';

interface BlogState {
  postList: Post[];
  editingPost: Post | null;
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload;
        state.postList.push(post)
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId);
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1);
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const foundPost = state.postList.find((post) => post.id === postId) || null;
      state.editingPost = foundPost;
    },
    cancelEditingPost: (state) => {
      state.editingPost = null;
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id;
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload;
          state.editingPost = null;
          return true;
        }
        return false;
      });
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher((action) => action.type.startsWith('blog/'), (state, action) => {
        console.log('Action:', action.type);
        console.log('Current State:', current(state));
    })
    .addDefaultCase((state, action) => {
        console.log('Default Case:', action.type);
        console.log('Current State:', current(state));
    });
  }
})

export const { addPost, deletePost, startEditingPost, cancelEditingPost, finishEditingPost } = blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;