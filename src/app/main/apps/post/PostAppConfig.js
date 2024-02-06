import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const PostApp = lazy(() => import('./PostApp'));

const PostAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/post/label/:labelHandle',
      element: <PostApp />,
      children: [{ path: ':postId', element: <PostApp /> }],
      
    },
    {
      path: 'apps/post/filter/:filterHandle',
      element: <PostApp />,
      children: [{ path: ':postId', element: <PostApp /> }],
      
    },
    {
      path: '/apps/post/:folderHandle',
      element: <PostApp />,
      children: [{ path: ':postId', element: <PostApp /> }],
      
    },
    {
      path: 'apps/post',
      element: <Navigate to="/apps/post/all" />,
      
    },
  ],
};

export default PostAppConfig;
