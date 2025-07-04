import { createAction, createReducer, current, nanoid, PayloadAction } from '@reduxjs/toolkit';
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

export const addPost = createAction('blog/addPost', (post: Omit<Post, 'id'>) => {
  return {
    payload: {
      ...post,
      id: nanoid()
    }
  }
})
export const deletePost  = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')

// Builder callback
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

  builder.addMatcher((action) => action.type.startsWith('blog/'), (state, action) => {
    console.log('Action:', action.type);
    console.log('Current State:', current(state));
  });
});

// Map object
// const blogReducer = createReducer(initialState, {
//   [addPost.type]: (state: BlogState, action: PayloadAction<Post>) => {
//     // Redux Toolkit using immerJS to mutate the state
//     state.postList.push(action.payload);
//   },

//   [deletePost.type]: (state: BlogState, action: PayloadAction<number>) => {
//     const postId = action.payload;
//     const foundPostIndex = state.postList.findIndex((post) => post.id === postId);
//     if (foundPostIndex !== -1) {
//       state.postList.splice(foundPostIndex, 1);
//     }
//   },

//   [startEditingPost.type]: (state: BlogState, action: PayloadAction<number>) => {
//     const postId = action.payload;
//     const foundPost = state.postList.find((post) => post.id === postId) || null;
//     state.editingPost = foundPost;
//   },

//   [cancelEditingPost.type]: (state: BlogState) => {
//     state.editingPost = null;
//   },

//   [finishEditingPost.type]: (state: BlogState, action: PayloadAction<Post>) => {
//     const postId = action.payload.id;
//     state.postList.some((post, index) => {
//       if (post.id === postId) {
//         state.postList[index] = action.payload;
//         state.editingPost = null;
//         return true;
//       }
//       return false;
//     });
//   },
// });

export default blogReducer