import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReaderLayout from './components/ReaderLayout.jsx'
import RootLayout from './components/RootLayout'
import PublisherHome from './pages/PublisherHome.jsx'
import PublishPage from './pages/PublishPage'
import PublishForm from './components/PublishForm.jsx'
import PublisherProfile from './pages/PublisherProfile'
import ReaderHome from './components/ReaderHome'
import ReaderProfile from './components/ReaderProfile'
import ReaderLib from './components/ReaderLib.jsx'
import Hero from './pages/Hero'
import { Toaster } from 'react-hot-toast'
import BookDetails from './components/BookDetails.jsx'

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
                    element:<PublishForm />
                },
                {
                    path:'publications',
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
                },
                {
                    path:'library',
                    element:<ReaderLib />
                },
                {
                    path:'bookdet',
                    element:<BookDetails />
                }
            ]
        }
    ])
    return (
        <div>
            <Toaster position="top-center"/>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App
