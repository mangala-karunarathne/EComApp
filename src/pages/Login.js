import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { isNotEmpty } from "../validation/Validation";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
  }

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
        }
        console.log("res", res);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
        setLoading(false);
      });
  };

  const loginForm = () => {
    return (
      <form>
        <div id="email" className="form-group">
          <input
            type="email"
            className="form-control"
            // value={email}
            name="email"
            value={formData.email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleInputChange}
            placeholder="Your email"
            autoFocus
          />
        </div>

        <div id="password" className="form-group">
          <input
            type="password"
            className="form-control mt-3"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Your password"
            autoFocus
          />
        </div>

        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          Login with Email/Password
        </Button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            //onClick={googleLogin}
            type="secondary"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
