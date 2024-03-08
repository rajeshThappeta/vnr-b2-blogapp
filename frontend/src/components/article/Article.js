import "./Article.css";

import { useForm } from "react-hook-form";
import axios from "axios";

import { FcClock } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { MdRestore } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState } from "react";

function Article() {
  let { register, handleSubmit } = useForm();
  let { currentUser } = useSelector((state) => state.userLogin);
  const { state } = useLocation();
  const [commentStatus, setCommentStatus] = useState("");
  const [articleEditStatus,setArticleEditStatus]=useState(false)
  const [editedArticle,setEditedArticle]=useState(state)
  let [err, setErr] = useState("");

  let navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const postComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(
      `http://localhost:4000/user-api/comment/${state.articleId}`,
      commentObj
    );
    if (res.data.message === "User comment added") {
      setCommentStatus(res.data.message);
    } else {
      setErr(res.data.message);
    }
  };

  //convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  const editArticle=()=>{
    setArticleEditStatus(true)
  }
  const saveArticle=async(editedArticle)=>{
    const modifiedArticle={...state,...editedArticle}
    delete modifiedArticle._id;
    modifiedArticle.dateOfModification=new Date();
    console.log(modifiedArticle)
    //make HTTP PUT
    let res=await axiosWithToken.put('http://localhost:4000/author-api/article',modifiedArticle)
    if(res.data.message==='Article modified'){
      setArticleEditStatus(false)
      setEditedArticle(res.data.payload)
      navigate(`/author-profile/article/${state.articleId}`,{state:res.data.payload})
    }
   
  }



  return (
    <div>
      {
        articleEditStatus===true?  <form onSubmit={handleSubmit(saveArticle)}>
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title")}
            defaultValue={state.title}
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
            defaultValue={state.category}
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
            defaultValue={state.content}
          ></textarea>
        </div>

        <div className="text-end">
          <button type="submit" className="text-light">
            Save
          </button>
        </div>
      </form>
      :
      <>
      <div className="d-flex justify-content-between">
        <div>
          <p className="display-3 me-4">{editedArticle.title}</p>
          <span className="py-3">
            <small className=" text-secondary me-4">
              <FcCalendar className="fs-4" />
              Created on:{editedArticle.dateOfCreation}
            </small>
            <small className=" text-secondary">
              <FcClock className="fs-4" />
              Modified on:{editedArticle.dateOfModification}
            </small>
          </span>
        </div>
        <div>
          {currentUser.userType === "author" && (
            <>
              <button className="me-2 btn btn-warning " onClick={editArticle}>
                <CiEdit className="fs-2" />
              </button>

              <button className="me-2 btn btn-danger">
                <MdDelete className="fs-2" />
              </button>
            </>
          )}
        </div>
      </div>
      <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
        {editedArticle.content}
      </p>
      {/* user comments */}
      <div className="comments my-4">
              {state.comments.length === 0 ? (
                <p className="display-3">No comments yet...</p>
              ) : (
                state.comments.map((commentObj, ind) => {
                  return (
                    <div key={ind} className="bg-light  p-3">
                      <p
                        className="fs-4"
                        style={{
                          color: "dodgerblue",
                          textTransform: "capitalize",
                        }}
                      >
                        <FcPortraitMode className="fs-2 me-2" />
                        {commentObj.username}
                      </p>

                      <p
                        style={{
                          fontFamily: "fantasy",
                          color: "lightseagreen",
                        }}
                        className="ps-4"
                      >
                        <FcComments className="me-2" />
                        {commentObj.comment}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

      <div>
        <h1>{commentStatus}</h1>
        {/* write comment by user */}
        {currentUser.userType === "user" && (
          <form onSubmit={handleSubmit(postComment)}>
            <input
              type="text"
              {...register("comment")}
              className="form-control mb-4 "
              placeholder="Write comment here...."
            />
            <button type="submit" className="btn btn-success">
              Add a Comment <BiCommentAdd className="fs-3" />
            </button>
          </form>
        )}
      </div>
      </>}
    </div>
  );
}

export default Article;
