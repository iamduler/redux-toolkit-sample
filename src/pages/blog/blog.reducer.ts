import { createAction, createReducer } from '@reduxjs/toolkit';
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

export const addPost = createAction<Post>('blog/addPost')
export const deletePost  = createAction<number>('blog/deletePost')
export const startEditingPost = createAction<number>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')

const blogReducer = createReducer(initialState, (builder) => {
  builder.addCase(addPost, (state, action) => {
    // Redux Toolkit using immerJS to mutate the state
    state.postList.push(action.payload);
  });

  builder.addCase(deletePost, (state, action) => {
    const postId = action.payload;
    const foundPostIndex = state.postList.findIndex((post) => post.id === postId);
    if (foundPostIndex !== -1) {
      state.postList.splice(foundPostIndex, 1);
    }
  });

  builder.addCase(startEditingPost, (state, action) => {
    const postId = action.payload;
    const foundPost = state.postList.find((post) => post.id === postId) || null;
    state.editingPost = foundPost;
  });

  builder.addCase(cancelEditingPost, (state) => {
    state.editingPost = null;
  });

  builder.addCase(finishEditingPost, (state, action) => {
    const postId = action.payload.id;
    state.postList.some((post, index) => {
      if (post.id === postId) {
        state.postList[index] = action.payload;
        state.editingPost = null;
        return true;
      }
      return false;
    });
  });
});

export default blogReducer