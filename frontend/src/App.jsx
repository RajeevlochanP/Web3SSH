import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReaderLayout from './components/ReaderLayout.jsx'
import RootLayout from './components/RootLayout'
import PublisherHome from './pages/PublisherHome.jsx'
import PublishPage from './pages/PublishPage'
import PublisherProfile from './pages/PublisherProfile'
import ReaderHome from './components/ReaderHome'
import ReaderProfile from './components/ReaderProfile'
import Hero from './pages/Hero'
import { Toaster } from 'react-hot-toast'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element:<Hero />
        },
        {
            path:'/p',
            element:<RootLayout />,
            children:[
                {
                    path:'home',
                    element:<PublisherHome />
                },
                {
                    path:'publish/new',
                    element:<PublishPage />
                },
                {
                    path:'profile',
                    element:<PublisherProfile />
                }
            ]
        },
        {
            path:'/r',
            element:<ReaderLayout />,
            children:[
                {
                    path:'home',
                    element:<ReaderHome />
                },
                {
                    path:'profile',
                    element:<ReaderProfile />
                }
            ]
        }
    ])
    return (
        <div>
            <Toaster position="top-center" />
            <RouterProvider router={router}/>
        </div>
    )
}

export default App
