import "./AddArticle.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import {axiosWithToken} from '../../axiosWIthToken'
import axios from "axios";

function AddArticle() {
  let { register, handleSubmit } = useForm();
  let { currentUser } = useSelector((state) => state.userLogin);
  let [err, setErr] = useState("");
  let navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const addNewArticle = async (newArticle) => {
    newArticle.articleId = Date.now();
    newArticle.dateOfCreation = new Date();
    newArticle.dateOfModification = new Date();
    newArticle.username = currentUser.username;
    newArticle.comments = [];
    newArticle.status = true;

    //make HTTP POST req to author api
    let res = await axiosWithToken.post(
      "http://localhost:4000/author-api/new-article",
      newArticle
    );
    console.log("res", res);
    if (res.data.message === "New article added") {
      //navigate for articlesBy author component
      navigate(`/author-profile/articles-by-author/${currentUser.username}`);
    } else {
      setErr(res.data.message);
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Write an Article</h2>
            </div>
            <div className="card-body bg-light">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <form onSubmit={handleSubmit(addNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    {...register("category")}
                    id="category"
                    className="form-select"
                  >
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    {...register("content")}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="text-light">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;
