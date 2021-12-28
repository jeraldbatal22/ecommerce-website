import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { savePaymentMethod } from '../../redux/features/CartSlice'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './Payment.module.css'

const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth } = useSelector(({ auth }) => auth)
  const { shippingAddress } = useSelector(({ cart }) => cart)
  const [paymentMethod, setpaymentMethod] = useState('Paypal')

  const submitHandler = (e) => {
    e.preventDefault()
    if (paymentMethod === "Paypal" || paymentMethod === "Stripe") {
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/place_order')
    } else {
      return false
    }
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/signin')
    }
    if (shippingAddress === null) {
      navigate('/shipping')
    }
  }, [isAuth, navigate, shippingAddress])

  return (
    <div className={styles.paymentContainer}>
      <ProgressBar step1 step2 step3 />
      <main className={styles.signupContainer}>
        <div className={styles.rightContent}>
          {/* <div>
          Register Now For Free!
        </div> */}
          <div className={styles.formContainer}>
            <form onSubmit={submitHandler}>
              <h1>Payment Method</h1>
              <div className={styles.formGroup}>
                <input type="radio" name="paymentMethod" onChange={(e) => setpaymentMethod(e.target.value)} id="paypal" value="Paypal" checked />
                <label htmlFor="paypal">Paypal</label>
              </div>
              <div className={styles.formGroup}>
                {/* <label>Username</label> */}
                <input type="radio" name="paymentMethod" onChange={(e) => setpaymentMethod(e.target.value)} id="stripe" value="Stripe" />
                <label htmlFor="stripe">Stripe</label>
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

export default Payment
