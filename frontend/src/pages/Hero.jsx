// 'use client'
// import React from 'react'
// import toast from 'react-hot-toast'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { connectionActions } from '../store/store.js'

// function Hero() {
//     const dispatch = useDispatch();
//     const navigate=useNavigate();
//     const isConnected = useSelector(state => state.connect.isConnected);

//     function notify() {
//         dispatch(connectionActions.connect());
//         toast.success('Connected to wallet successfully');
//     }
//     function handleRead() {
//         navigate('/r/home')
//     }
//     function handlePublish() {
//         navigate('/p/home')
//     }
//     return (
//         <div>
//             <h1>Hero</h1>
//             {!isConnected && <button onClick={notify}>Connect to Wallet</button>}
//             {isConnected && <div>
//                 <button onClick={handleRead}>Read Books</button>
//                 <button onClick={handlePublish}>Publish Books</button>
//             </div>}
//         </div>
//     )
// }

// export default Hero

import LandingPage from '../components/LandingPage'

function Hero() {
  return (
    <LandingPage />
  )
}

export default Hero