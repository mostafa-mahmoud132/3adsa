import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Nav/Layout/Layout'
import Home from './Component/Home/Home'
import Blog from './Component/Blog/Blog'
import Page from './Component/Blog/page/Page'
import About from './Component/About/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <Page /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <h1>Page not found</h1> }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}


