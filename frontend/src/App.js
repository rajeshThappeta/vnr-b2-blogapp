import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css';
import RootLayout from './RootLayout'
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import UserProfile from './components/user-profile/UserProfile';
import AuthorProfile from './components/author-profile/AuthorProfile'

function App() {

  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:"/signin",
        element:<Signin />
      },
      {
        path:"/user-profile",
        element:<UserProfile />
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />
      }
    ]
  }])

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
