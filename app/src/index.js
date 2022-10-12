import React from 'react';
import { lazy,Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

// import { HomeView } from './views/HomeView/HomeView';
// import { ErrorView } from './views/ErrorView/ErrorView';
// import { Article } from './components/article/article';
// import { Daily } from './components/daily/daily';
// import { Archive } from './components/archive/archive';
// import { Login } from './components/login/login';
// import { AdminView } from './views/AdminView/AdminView';
// import { NewPost } from './components/new_post/new_post';
// import { AdminAritleList } from './components/admin_article_list/admin_article_list';
// import { AdminDailyList } from './components/admin_daily_list/admin_daily_list';
// import { AdminNoticeList } from './components/admin_notice_list/admin_notice_list';
// import { POST_PAGE } from './components/post_page/post_page';

import './index.scss';

const HomeView = lazy(() => import('./views/HomeView/HomeView'))
const ErrorView = lazy(() => import('./views/ErrorView/ErrorView'))
const Article = lazy(() => import('./components/article/article'))
const Daily = lazy(() => import('./components/daily/daily'))
const Archive = lazy(() => import('./components/archive/archive'))
const Login = lazy(() => import('./components/login/login'))
const AdminView = lazy(() => import('./views/AdminView/AdminView'))
const NewPost = lazy(() => import('./components/new_post/new_post'))
const AdminAritleList = lazy(() => import('./components/admin_article_list/admin_article_list'))
const AdminDailyList = lazy(() => import('./components/admin_daily_list/admin_daily_list'))
const AdminNoticeList = lazy(() => import('./components/admin_notice_list/admin_notice_list'))
const POST_PAGE = lazy(() => import('./components/post_page/post_page'))


const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeView /> ,
      errorElement: <ErrorView />,
      children:[ 
        {
            path: "/",
            element: <Article />,
        },
        {
          path: "daily",
          element: <Daily />,
        },
        {
          path: "archive",
          element: <Archive />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "post",
          element: <POST_PAGE />,
        },
        {
          path: "admin",
          element: <AdminView />,
          children:[
            {
              path: "/admin/",
              element: <AdminAritleList />,
            },
            {
              path: "/admin/daily",
              element: <AdminDailyList />,
            },
            {
              path: "/admin/notice",
              element: <AdminNoticeList />,
            }
          ],
        },
        {
          path: "newPost",
          element: <NewPost />,
        },
        
      ]
      
    },
    
    
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router} />
      </Suspense>
      
    </React.StrictMode>
);



