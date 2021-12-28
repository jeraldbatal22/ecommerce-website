import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { cartShippingAddress } from '../../redux/features/CartSlice'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './Shipping.module.css'

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth } = useSelector(({ auth }) => auth)
  const { shippingAddress } = useSelector(({ cart }) => cart)
  const [inputForm, setinputForm] = useState({
    fullname: shippingAddress ? shippingAddress.fullname : '',
    address: shippingAddress ? shippingAddress.address : '',
    city: shippingAddress ? shippingAddress.city : '',
    country: shippingAddress ? shippingAddress.country : '',
    postalCode: shippingAddress ? shippingAddress.postalCode : ''
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    inputForm[name] = value
    setinputForm({ ...inputForm })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(cartShippingAddress(inputForm))
    navigate('/payment')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/signin')
    }
  }, [isAuth, navigate, shippingAddress])

  return (
    <div className={styles.shippingContainer}>
      <ProgressBar step1 step2 />
      <main className={styles.signupContainer}>
        <div className={styles.rightContent}>
          {/* <div>
          Register Now For Free!
        </div> */}
          <div className={styles.formContainer}>
            <form onSubmit={submitHandler}>
              <h1>Shipping Address</h1>
              <div className={styles.formGroup}>
                {/* <label>Email</label> */}
                <input type="text" placeholder="Fullname" name="fullname" value={inputForm.fullname} onChange={changeHandler} />
              </div>
              <div className={styles.formGroup}>
                {/* <label>Username</label> */}
                <input type="text" placeholder="Address" name="address" value={inputForm.address} onChange={changeHandler} />
              </div>
              <div className={styles.formGroup}>
                {/* <label>Firstname</label> */}
                <input type="text" placeholder="City" name="city" value={inputForm.city} onChange={changeHandler} />
              </div>
              <div className={styles.formGroup}>
                {/* <label>Lastname</label> */}
                <input type="text" placeholder="Country" name="country" value={inputForm.country} onChange={changeHandler} />
              </div>
              <div className={styles.formGroup}>
                {/* <label>Password</label> */}
                <input type="text" placeholder="Postal Code" name="postalCode" value={inputForm.postalCode} onChange={changeHandler} />
              </div>
              <div className={styles.formButton}>
                <button type="submit">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Shipping
