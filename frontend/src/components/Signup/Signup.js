import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Signup.module.css'

const Signup = () => {
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
          <form>
            <h1>Signup Form</h1>
            <div className={styles.formGroup}>
              {/* <label>Email</label> */}
              <input type="email" placeholder="Email" />
            </div>
            <div className={styles.formGroup}>
              {/* <label>Username</label> */}
              <input type="text" placeholder="Username" />
            </div>
            <div className={styles.formGroup}>
              {/* <label>Firstname</label> */}
              <input type="text" placeholder="Firstname" />
            </div>
            <div className={styles.formGroup}>
              {/* <label>Lastname</label> */}
              <input type="text" placeholder="Lastname" />
            </div>
            <div className={styles.formGroup}>
              {/* <label>Password</label> */}
              <input type="text" placeholder="Password" />
            </div>
            <div className={styles.formGroup}>
              {/* <label>Confirm Password</label> */}
              <input type="text" placeholder="Confirm Password" />
            </div>
            <div className={styles.formButton}>
              <button>Register</button>
            </div>
            <div className={styles.formFooter}>
              <strong>Do you have an account? <Link to="/signin">Signin</Link></strong>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Signup
