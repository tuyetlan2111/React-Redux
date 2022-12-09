import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function SignUp() {

  let navigate = useNavigate();

  const {register, handleSubmit, setError, formState: { errors } } = useForm({
    mode: "onBlur",
  });
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const [submitted, setSubmitted] = useState(false);

  console.log('errors', errors);

  const submitForm = (e) => {
    e.preventDefault();
    const { name, email, phone, password } = formData
    if (name === '' || email === '' || phone === '' || password === '') {
      setError(true);
    }
    else {
      fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('email', data.email);
          localStorage.setItem('name', data.name);
        });
      setSubmitted(true);
      setError(false);

    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitted(false);
  }

  useEffect(() => {
    if (submitted === true) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000)
    }
  }, [submitted])

  return (
    <React.Fragment>
      {
        submitted &&
        (
          <div className="success">
            <span>User {formData.name} successfully registered!!</span>
          </div>
        )
      }

      <section className="signUp" id='signUp'>
        <div className="container py-5 h-100 modal-dialog">
          <div>
            <form onSubmit={(e) => handleSubmit(submitForm(e))}>
              <div className="form-outline form-white mb-4">
                <label className="form-label">Họ tên</label>
                <input type="text"
                  className="form-control form-control-lg"
                  name='name'
                  placeholder='Nhập họ tên'
                  value={formData.name}
                  required
                  onChange={e => handleChange(e)}
                />
                {/* {errors.name && errors.name.type === "required" && <span>Please enter your name.</span>} */}
              </div>

              <div className="form-outline form-white mb-4">
                <label className="form-label">Email</label>
                <input type="email"
                  className="form-control form-control-lg"
                  name='email'
                  placeholder='Nhập Email'
                  value={formData.email}
                  required
                  onChange={e => handleChange(e)}
                  {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                />
              </div>
              <div className="form-outline form-white mb-4">
                <label className="form-label">Số điện thoại</label>
                <input type="text"
                  className="form-control form-control-lg"
                  name='phone'
                  placeholder='Nhập số điện thoại'
                  value={formData.phone}
                  onChange={e => handleChange(e)}
                  required
                />
              </div>

              <div className="form-outline form-white mb-4">
                <label className="form-label">Password</label>
                <input type="password"
                  className="form-control form-control-lg"
                  name='password'
                  placeholder='Nhập mật khẩu'
                  value={formData.password}
                  onChange={e => handleChange(e)}
                  required
                />
              </div>
              {/* <div className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="typePasswordX">Password</label>
              <input type="password"
                className="form-control form-control-lg"
                name='re-password'
                placeholder='Nhập lại mật khẩu'
                // value={data.password}
                required
              />
            </div> */}
              <div className="form-outline form-white mb-4">
                <label className="form-label"></label>
                <button className="login_btn" type="submit">Đăng kí</button>
              </div>

            </form>


            {/* </div> */}
          </div>
        </div>
      </section>
    </React.Fragment >
  )
}
