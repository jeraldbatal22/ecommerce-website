import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { priceComma } from '../../helpers/priceComma'
// import styles from './OrderDetail.module.css'
import styles from './Order.module.css'

const OrderDetail = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const { order_details, isPaid, isDelivered } = useSelector(({ order }) => order)
  const { isAuth } = useSelector(({ auth }) => auth)
  const orderDetail = {}

  if (order_details) {
    Object.assign(orderDetail, order_details)
  }

  const { carts, shippingAddress, paymentMethod } = orderDetail

  const getSubtotal = () => {
    let totalCheckout = []
    carts.map((item => {
      return totalCheckout.push(item.count * item.price)
    }))
    return totalCheckout.length > 0 && priceComma(totalCheckout.reduce((previousValue, currentValue) => parseFloat(previousValue + currentValue)))
  }

  useEffect(() => {
    if (!isAuth) {
      return navigate('/signin')
    }

    if (!order_details) {
      navigate('/')
      alert('Cart is empty shop now!!')
    }
  }, [order_details, navigate, isAuth])

  return (
    <div className={styles.orderContainer}>
      {
        order_details &&
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
              <h2 style={{ color: 'red' }}>{isPaid ? 'Delivered' : 'Not Delivered'}</h2>
            </div>
            <div className={styles.paymentCard}>
              <h1>Payment Method</h1>
              <div className={styles.paymentInfo}>
                <strong>Type of Payment</strong>
                <span>{paymentMethod}</span>
              </div>
              <h2 style={{ color: 'red' }}>{isDelivered ? 'Paid' : 'Not Paid'}</h2>
            </div>
            <div className={styles.orderInfo}>
              <h1>Order Items</h1>
              <div className={styles.scrollable}>
                {
                  carts.map((cart, index) => (
                    <ul key={index}>
                      <li>{cart.name}</li>
                      <li>{priceComma(cart.price)} PHP</li>
                      <li><img src={cart.image} alt="" width={100} height={100} /></li>
                      <li>{cart.count} X {priceComma(cart.price)} = {priceComma(cart.count * cart.price)} PHP</li>
                    </ul>
                  ))
                }
              </div>

            </div>
          </div>
          <div className={styles.orderRight}>
            <div className={styles.orderInfo}>
              <h1>Summary Order</h1>
              <div className={styles.orderInfoChild}>
                <strong>Subtotal:</strong>
                <span>{getSubtotal()} PHP </span>
              </div>
              <div className={styles.orderInfoChild}>
                <strong>Shipping:</strong>
                <span>20 PHP</span>
              </div>
              <div className={styles.orderInfoChild}>
                <strong>Tax:</strong>
                <span>10 PHP</span>
              </div>
              <div className={styles.orderInfoChild}>
                <strong>Order Total:</strong>
                <span>{getSubtotal()} PHP</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default OrderDetail
