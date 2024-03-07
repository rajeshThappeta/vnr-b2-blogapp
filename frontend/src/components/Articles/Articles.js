import { useState, useEffect } from "react";

import { useNavigate, Outlet } from "react-router-dom";
import axios from 'axios'

function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const [err,setErr]=useState('')
  let navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const getArticlesOfCurrentAuthor = async () => {
   let res= await axiosWithToken.get(`http://localhost:4000/user-api/articles`)
   console.log(res)
   if(res.data.message==='All articles'){
    setArticlesList(res.data.payload)
   }else{
    setErr(res.data.message)
   }
  };


  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  return (
    <div>
      {articlesList.length === 0 ? (
        <p className="display-1  text-center" style={{color:'var(--crimson)'}}>No Articles found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    {article.content.substring(0, 80) + "...."}
                  </p>
                  <button
                    className="custom-btn btn-4"
                    onClick={() => readArticleByArticleId(article)}
                  >
                    <span>Read More</span>
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated on {article.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Articles;
