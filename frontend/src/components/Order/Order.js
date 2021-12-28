import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { priceComma } from '../../helpers/priceComma'
import { placeOrderItems } from '../../redux/features/CartSlice'
import { placeOrder } from '../../redux/features/OrderSlice'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './Order.module.css'

const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { carts, shippingAddress, paymentMethod } = useSelector(({ cart }) => cart)
  const { isAuth } = useSelector(({ auth }) => auth)

  const getSubtotal = () => {
    let totalCheckout = []
    carts.map((item => {
      return totalCheckout.push(item.count * item.price)
    }))
    return totalCheckout.length > 0 && priceComma(totalCheckout.reduce((previousValue, currentValue) => parseFloat(previousValue + currentValue)))
  }

  const placeOrderHandler = () => {
    dispatch(placeOrder({
      carts,
      shippingAddress,
      paymentMethod
    }))
    dispatch(placeOrderItems())
    alert('Successfully Place Order')
    navigate('/order')
  }

  useEffect(() => {
    if (paymentMethod === null) {
      navigate('/payment')
    }

    if (!isAuth) {
      navigate('/signin')
    }
  }, [paymentMethod, navigate, isAuth])



  return (
    <div className={styles.orderContainer}>
      <ProgressBar step1 step2 step3 step4 />
      {
        paymentMethod &&
        <div className={styles.orderContent}>
          <div className={styles.orderLeft}>
            <div className={styles.shippingCard}>
              <h1>Shipping</h1>
              <div className={styles.shippingInfo}>
                <strong>Fullname</strong>
                <span>{shippingAddress.fullname}</span>
                <strong>Address</strong>
                <span>{shippingAddress.address}</span>
              </div>
            </div>
            <div className={styles.paymentCard}>
              <h1>Payment Method</h1>
              <div className={styles.paymentInfo}>
                <strong>Payment</strong>
                <span>{paymentMethod}</span>
              </div>
            </div>
            <div className={styles.orderInfo}>
              <h1>Order Items</h1>
              <div className={styles.scrollable}>
                {
                  carts.map((cart, index) => (
                    <ul key={index}>
                      <li>{cart.name}</li>
                      <li>{priceComma(cart.price)}</li>
                      <li><img src={cart.image} alt="" width={100} height={100} /></li>
                      <li>{cart.count} X {priceComma(cart.price)} = {priceComma(cart.count * cart.price)} PHP</li>
                    </ul>
                  ))
                }
              </div>

            </div>
          </div>
          <div className={styles.orderRight}>
            <h1>Summary Order</h1>
            <div className={styles.orderInfo}>
              <div className={styles.orderInfoChild}>
                <strong>Subtotal:</strong>
                <span>{getSubtotal()} PHP</span>
              </div>
              <div className={styles.orderInfoChild}>
                <strong>Shipping:</strong>
                <span>20 PHP</span>
              </div>
              <div className={styles.orderInfoChild}>
                <strong>Tax:</strong>
                <span>20 PHP</span>
              </div>
              <div className={styles.orderInfoChild}>
                <strong>Order Total:</strong>
                <span>{getSubtotal()} PHP</span>
              </div>
              <button onClick={placeOrderHandler}>Place Order</button>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default Order
