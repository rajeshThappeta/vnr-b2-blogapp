import {createBrowserRouter, RouterProvider,Navigate} from 'react-router-dom'
import './App.css';
import RootLayout from './RootLayout'
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import UserProfile from './components/user-profile/UserProfile';
import AuthorProfile from './components/author-profile/AuthorProfile'
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import Article from './components/article/Article';
import AddArticle from './components/add-article/AddArticle';
import Articles from './components/Articles/Articles';

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
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles' />
          }
        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />,
        children:[
          {
            path:'new-article',
            element:<AddArticle />
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor />,
           
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author' />
          }
        ]
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
