import PostItem from '../PostItem';
import { useDeletePostMutation, useGetPostsQuery } from 'pages/blog/blog.service';
import SkeletonPost from '../SkeletonPost/SkeletonPost';
import { useDispatch } from 'react-redux';
import { startEditPost } from 'pages/blog/blog.slice';

export default function PostList() {
  // isLoading: chỉ dành cho lần gọi đầu tiên
  // isFetching: dành cho lần gọi thứ 2 trở đi
  const { data, isLoading, isFetching } = useGetPostsQuery();
  const dispatch = useDispatch();

  const startEdit = (id: string) => {
    dispatch(startEditPost(id));
  }

  const [deletePost, deletePostResult] = useDeletePostMutation();

  const handleDelete = async (id: string) => {
    await deletePost(id).unwrap();
  }

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>All Posts</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {isFetching && (
            <>
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </>
          )}
          {!isFetching && data?.map((post) => (
            <PostItem key={post.id} post={post} startEdit={startEdit} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
