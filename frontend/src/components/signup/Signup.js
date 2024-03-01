import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup() {
  let { register, handleSubmit } = useForm();
  let [err,setErr]=useState('')
  let navigate=useNavigate()

  async function onSignUpFormSubmit(userObj) {
    let res;
    //http post req to userr-api
    if(userObj.userType==='user'){
     res=await axios.post('http://localhost:4000/user-api/user',userObj)
    }
    if(userObj.userType==='author'){
      res=await axios.post('http://localhost:4000/author-api/user',userObj)
     }
    if(res.data.message==='User created' || 'Author created'){
      //navigate to sign
      navigate("/signin")
    }else{
      setErr(res.data.message)
    }
    
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signup</h2>
            </div>
            <div className="card-body">

              {/* user register error message */}
              {err.length!=0&&<p className="text-danger text-center">{err}</p>}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Register as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType")}
                    />
                    <label
                      htmlFor="author"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email")}
                  />
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="text-light"
                    style={{ backgroundColor: "var(--dark-maroon)" }}
                  >
                    Register
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

export default Signup;
