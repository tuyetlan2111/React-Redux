import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { fetchUser } from '../../reducers/UserReducer';

export default function Login() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.users);

  const { handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const submitForm = (event) => {
    event.preventDefault();
    const usercheck = user.find(user => (user.email === formData.email && user.password === formData.password));
    if (usercheck.length !== 0) {
      localStorage.setItem('password', bcrypt.hashSync(JSON.stringify(usercheck.password), '$2a$10$CwTycUXWue0Thq9StjUM0u'));
      localStorage.setItem('userName', usercheck.name)
      navigate("/", { replace: true });
    }
  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <section className="login" id='login' role="dialog" aria-labelledby="login" aria-hidden="true">
      <div className="row">
        <div>
          <form onSubmit={(e) => handleSubmit(submitForm(e))}>
            <div className="form-outline form-white mb-4">
              <input
                type="email"
                className="form-control form-control-lg"
                name='email'
                placeholder='Nhập Email'
                onChange={changeHandler}
                value={formData.email}
                required
              />
              {errors.email && errors.email.type === "required" && <span>Please enter your email.</span>}
              {errors.email && errors.email.type === "minLength" && <span>Minimum length is not enough</span>}
            </div>

            <div className="form-outline form-white mb-4">
              <input
                type="password"
                className="form-control form-control-lg"
                name='password'
                placeholder='Nhập mật khẩu'
                value={formData.password}
                onChange={changeHandler}
                required
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button className="login_btn" type="submit">Đăng nhập</button>
          </form>
          <div className='login_sign'>
            <p className="mb-0">Bạn chưa có tài khoản
              <a href="/signup" className="text-white-50 fw-bold">Đăng kí</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
