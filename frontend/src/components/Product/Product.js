import React, { useEffect, useState } from 'react'
import styles from './Product.module.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAsync } from '../../redux/features/ProductSlice'
import { addTocartProduct } from '../../redux/features/CartSlice'
// import product1 from './../../images/product1.jpg'
import { priceComma } from '../../helpers/priceComma'

const Product = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(({ product }) => product)
  const { slug } = useParams()
  const { carts } = useSelector(({ cart }) => cart)
  let [productCount, setproductCount] = useState(0)
  const product = {}

  if (products.length > 0) {
    Object.assign(product, products.find(product => product.slug === slug));
  }

  const productExistInCarts = carts.find(cart => cart.slug === product.slug)

  const addToCartHandler = (item) => {
    if (productExistInCarts) {
      return alert('Already in cart.')
    }
    if (productCount === 0) {
      return alert('Add quantity item.')
    }
    dispatch(addTocartProduct({ product: item, count: productCount }))
  }

  const addQuantityProduct = (item) => {
    if (productCount === item.stock) {
      return alert(`only ${item.stock} quantity is available`)
    } else {
      setproductCount(productCount += 1)
    }
  }

  const minusQuantityProduct = (item) => {
    if (productCount === 0) {
      return false
    } else {
      setproductCount(productCount -= 1)
    }
  }

  useEffect(() => {
    dispatch(getAllProductsAsync())
  }, [dispatch]);


  return (
    <main className={styles.productContainer}>
      {
        Object.keys(product).length > 0 ?
          <>
            <div className={styles.leftProduct}>
              <div className={styles.productImage}>
                <img src={product.image} alt="" width={500} height={550} />
              </div>
            </div>
            <div className={styles.rightProduct}>
              <strong>SNEAKER COMPANY</strong>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <div className={styles.productPrize}>
                <div><h2>{priceComma(product.price)} PHP</h2><strong>50%</strong></div>
                <h3>PHP 250.00</h3>
                <div className={styles.starGroupIcon}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <div className={styles.productButton}>
                {
                  !productExistInCarts &&
                  <div className={styles.productCount}>
                    <div><i className="fas fa-minus" onClick={() => minusQuantityProduct(product)}></i></div>
                    <span>{productCount}</span>
                    {/* <span><input value={productCount} /></span> */}
                    <div><i className="fas fa-plus" onClick={() => addQuantityProduct(product)}></i></div>
                  </div>
                }
                <button onClick={() => addToCartHandler(product)}><i className="fas fa-shopping-cart"> </i>
                  {productExistInCarts ? "Already in cart" : "Add To Cart"}
                </button>
              </div>
            </div>
          </>
          : <h1>Not found</h1>
      }

    </main>
  )
}

export default Product
