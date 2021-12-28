import React, { useState } from 'react'
import styles from './Header.module.css'
import jbImage from './../../images/jb.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from '../Cart/CartItems'
import { clearStateAuth } from '../../redux/features/AuthSlice'
import { remove, USER } from '../../helpers/storage'
const Header = () => {
  const navagite = useNavigate()
  const dispatch = useDispatch()
  const { carts } = useSelector(({ cart }) => cart)
  const { isAuth } = useSelector(({ auth }) => auth)
  const [isShowNav, setisShowNav] = useState(false)
  const [isShowCart, setisShowCart] = useState(false)
  const showNavHandler = () => {
    setisShowNav(!isShowNav)
  }

  const showCartHandler = () => {
    setisShowCart(!isShowCart)
  }

  const logoutHandler = () => {
    dispatch(clearStateAuth())
    remove(USER)
    navagite('/signin')
  }

  return (
    <>
      <header>
        <i className="fas fa-bars" id={styles.faBarsIcon} onClick={showNavHandler}></i>
        <h1>Guitars</h1>
        <nav>
          {
            !isShowNav ?
              <ul className={styles.webNav}>
                <Link to="/"><li>Home</li></Link>
                <Link to="/products"><li>Products</li></Link>
                <Link to="/"><li>About</li></Link>
                <Link to="/"><li>Contact</li></Link>
                {
                  isAuth ?
                    <>
                      <Link to="/"><li>Profile</li></Link>
                      <li onClick={logoutHandler}>Logout</li>
                    </>
                    :
                    <>
                      <Link to="/signin"><li>Signin</li></Link>
                      <Link to="/signup"><li>Signup</li></Link>
                    </>
                }

              </ul>
              :
              <ul className={styles.mobileNav}>
                <Link to="/"><li>Home</li></Link>
                <Link to="/products"><li>Products</li></Link>
                <Link to="/"><li>About</li></Link>
                <Link to="/"><li>Contact</li></Link>
                {
                  isAuth ?
                    <>
                      <Link to="/"><li>Profile</li></Link>
                      <li onClick={logoutHandler}>Logout</li>
                    </>
                    :
                    <>
                      <Link to="/signin"><li>Signin</li></Link>
                      <Link to="/signup"><li>Signup</li></Link>
                    </>
                }
              </ul>
          }
        </nav>
        <div className={styles.cart} onClick={showCartHandler}>
          <p className={styles.cartCount}>{carts.length}</p>
          <i className="fas fa-shopping-cart" id={styles.shoppingCartIcon}></i>
        </div>
        <div className={styles.userImage}>
          <img src={jbImage} alt="" />
        </div>
        {
          isShowCart && <CartItems setisShowCart={setisShowCart} isShowCart={isShowCart} />
        }
      </header>
    </>
  )
}

export default Header
