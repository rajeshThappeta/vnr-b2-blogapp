import "./Article.css";

import { useForm } from "react-hook-form";

import { FcClock } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdRestore } from "react-icons/md";
import { useSelector } from "react-redux";

function Article() {
  let { register, handleSubmit } = useForm();
  let {currentUser}=useSelector(state=>state.userLogin)

  let navigate = useNavigate();

  //convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <p className="display-3 me-4">title</p>
          <span className="py-3">
            <small className=" text-secondary me-4">
              <FcCalendar className="fs-4" />
              Created on:
            </small>
            <small className=" text-secondary">
              <FcClock className="fs-4" />
              Modified on:
            </small>
          </span>
        </div>
        <div>
          {currentUser.userType === "author" && (
            <>
              <button className="me-2 btn btn-warning ">
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
       content
      </p>
      {/* user comments */}
      <div>
        {/* write comment by user */}
        {currentUser.userType === "user" && (
          <form>
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
    </div>
  );
}

export default Article;
