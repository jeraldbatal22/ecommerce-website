import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authAsync, clearStateValidation } from '../../redux/features/AuthSlice'
import styles from '../Signup/Signup.module.css'

const Signin = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '';
  const { isAuth, message } = useSelector(({ auth }) => auth)

  const [inputForm] = useState({
    email: '',
    password: ''
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    inputForm[name] = value
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(authAsync(inputForm))
    dispatch(clearStateValidation())
  }

  useEffect(() => {
    if (isAuth) {
      navigate(`/${redirect}`);
    } else {
      return false
    }
  }, [isAuth, dispatch, navigate, redirect])

  return (
    <main className={styles.signupContainer}>
      <div className={styles.leftContent}>
        <div className={styles.content}>
          <h1>Product E Commerce Full Website</h1>
          <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or
            a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
          </p>
        </div>
      </div>
      <div className={styles.rightContent}>
        {/* <div>
          Register Now For Free!
        </div> */}
        <div className={styles.formContainer}>
          <form onSubmit={submitHandler}>
            <h1>Signin Form</h1>
            <p style={{ color: 'red' }}>{message}</p>
            <div className={styles.formGroup}>
              {/* <label>Email</label> */}
              <input type="email" placeholder="Email" name="email" onChange={inputChangeHandler} />
            </div>
            <div className={styles.formGroup}>
              {/* <label>Password</label> */}
              <input type="password" placeholder="Password" name="password" onChange={inputChangeHandler} />
            </div>
            <div className={styles.formButton}>
              <button type="submit">Signin</button>
            </div>
            <div className={styles.formFooter}>
              <strong>Don't have an account yet? <Link to="/signup">Signup</Link></strong>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Signin
