import React from 'react'
import styles from './CartItems.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { priceComma } from '../../helpers/priceComma'
import { addQuantityToProduct, minusQuantityToProduct, removeFromTheCart } from '../../redux/features/CartSlice'
import { useNavigate } from 'react-router'

const CartItems = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { carts } = useSelector(({ cart }) => cart)
  const { products } = useSelector(({ product }) => product)

  const getSubtotal = () => {
    let totalCheckout = []
    carts.map((item => {
      return totalCheckout.push(item.count * item.price)
    }))
    return totalCheckout.length > 0 && priceComma(totalCheckout.reduce((previousValue, currentValue) => parseFloat(previousValue + currentValue)))
  }

  const addQuantityProduct = (item) => {
    const isExist = products.find(product => product.slug === item.slug)
    if (item.count === isExist.stock) {
      return alert(`only ${isExist.stock} quantity is available`)
    }
    dispatch(addQuantityToProduct(item))
  }

  const minusQuantityProduct = (item) => {
    if (item.count === 1) {
      return console.log('yeah')
    }
    dispatch(minusQuantityToProduct(item))
  }

  const removeCartProduct = (item) => {
    dispatch(removeFromTheCart(item))
  }

  const checkoutProductHandler = () => {
    props.setisShowCart(false)
    navigate('/signin?redirect=shipping');
  }

  return (
    <div className={styles.cartList}>
      <h2>Cart Items</h2>
      {
        carts.length > 0 ?
          <>
            <div className={styles.modalContent}>
              {
                carts.map((cart, index) => (
                  <div key={index} className={styles.parentContainer}>
                    <div className={styles.itemContainer}>
                      <div className={styles.quantity}>
                        <i className="fas fa-plus" onClick={() => addQuantityProduct(cart)}></i>
                        <strong>{cart.count}</strong>
                        <i className="fas fa-minus" onClick={() => minusQuantityProduct(cart)}></i>
                      </div>
                      <div className={styles.image}>
                        <img src={cart.image} alt="" height="80" width="90" />
                      </div>
                      <div className={styles.details}>
                        <strong style={{ fontSize: "13px", fontWeight: "700" }}>{cart.name.split(' ')[0]}</strong>
                        <strong className="price">{priceComma(cart.price)}</strong>
                        <strong>{cart.count} X 1 pc(s)</strong>
                      </div>
                      <div className={styles.total_price}>
                        <strong>{priceComma(cart.count * cart.price)}</strong>
                      </div>
                      <div className={styles.removeToCart}>
                        <i className="fas fa-remove" id={styles.removeToCart} onClick={() => removeCartProduct(cart)}></i>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                ))
              }
            </div>
            <div className={styles.checkoutBtn}>
              <button className="checkout" onClick={checkoutProductHandler}> <p>Checkout</p> <strong>{getSubtotal()} PHP</strong></button>
            </div>
          </>
          :
          <h3>Your cart is empty shop now.</h3>
      }
      {/* <div className={styles.checkoutBtn}>
        <button className="checkout" > <p>Checkout</p> <strong>{getSubtotal()} PHP</strong></button>
      </div> */}
    </div >

  )
}

export default CartItems
