import { Post } from 'types/blog.type';

interface PostItemType {
  post: Post;
  handleDelete: (postId: string) => void;
  handleStartEditing: (postId: string) => void;
}

export default function PostItem({ post, handleDelete, handleStartEditing }: PostItemType) {
  return (
    <div className='flex flex-col overflow-hidden rounded-lg border bg-white'>
      <div className='group relative block h-48 overflow-hidden bg-gray-100'>
        <img
          src={post.featuredImage}
          loading='lazy'
          alt={post.title}
          className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
        />
      </div>
      <div className='flex flex-col gap-2 p-4 lg:p-6'>
        <span className='text-sm text-gray-400'>{post.publishDate}</span>
        <h2 className='text-xl font-bold text-gray-800'>{post.title}</h2>
        <p className='text-gray-500'>{post.description}</p>
        <div className='mt-4'>
          <div className='inline-flex rounded-md shadow-sm' role='group'>
            <button
              type='button'
              className='rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
              onClick={() => handleStartEditing(post.id)}
            >
              Edit
            </button>
            <button
              type='button'
              className='rounded-r-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
