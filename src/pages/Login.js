import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { Button, Card } from 'antd';
import { Link} from 'react-router-dom';
import { isNotEmpty } from "../validation/Validation";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateInput = (inputId, inputValue) => {
    if (!isNotEmpty(inputValue)) {
      document.getElementById(inputId).classList.add("input-error");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validateInput("email", formData.email) ||
      validateInput("password", formData.password)
    ) {
      toast.error("All input fields requird!!!");
      return;
    }

    setLoading(true);
    await axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Login Successfuly!!!");
          setLoading(false);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              //email: res.data.email,
              token: res.data.access_token,
              _id: res.data._id,
            },
          });
          setIsLoggedIn(true);
        }
        console.log("res", res);
        //history.push("/home");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
        setLoading(false);
      });
  };

  const loginForm = () => {
    return(
      <form>
        <div id="email" className='form-group'>
          <label>Email</label>
          <input 
            type='email' 
            name="email"
            className='form-control'
            value={formData.email}
            //onChange={(e) => setEmail(e.target.value)}
            onChange={handleInputChange}
            placeholder='Your email'
            autoFocus 
          />
        </div>
      
        <div id="password" className='form-group mt-3'>
          <label>Password</label>
          <input 
            type='password' 
            name="password"
            className='form-control'
            value={formData.password}
            //onChange={(e) => setPassword(e.target.value)}
            onChange={handleInputChange}
            placeholder='Your password'
            autoFocus 
          />
        </div>

        <Button
          onClick={handleSubmit}
          className='mb-3 mt-3'
          block
          size='large'
          style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}
        >
          Log in
        </Button>
      </form>
    )
    
  }
  return (
    <Card className="col-md-4 offset-md-3 mx-auto p-5">
      {loading ? (
        <h4 className='text-danger text-center'>Loading...</h4>
        ) : (
          <>
            <h4 className='text-bold text-center'>OrelBuy</h4>
            <p className='text-bold text-center'>Hello, Welcome to OrelBuy</p>
          </>
        )}
      {loginForm()}
      <div className='text-center mb-3'>
        <p>
          Don't have and account?{' '}
          <span>
            <Link>Sign up</Link>
          </span>
        </p>
        <p>
          Forgot your password?{' '}
          <span>
            <Link>Reset it</Link>
          </span>
        </p>
      </div>
    </Card>
  );
}

export default Login

