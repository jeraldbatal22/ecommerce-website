import React, { useEffect } from 'react'
import styles from './ProductList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAsync } from '../../redux/features/ProductSlice'
import { Link } from 'react-router-dom'
import { priceComma } from '../../helpers/priceComma'

const ProductList = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(({ product }) => product)

  useEffect(() => {
    dispatch(getAllProductsAsync())
  }, [dispatch])

  return (
    <div className={styles.productsContainer}>
      {/* <h1>Guitar Products</h1> */}
      <div className={styles.cardContainer}>
        {
          !!products.length && products.map((item, index) => (
            <div className={styles.cardBody} key={index}>
              <Link to={`/products/${item.slug}`}>
                <div className={styles.cartContent}>
                  <img src={item.image} alt="" />
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <div className={styles.starGroupIcon}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <div className={styles.ratings}>
                    <strong>Ratings {item.rating}</strong>
                    <strong>Reviews {item.reviews}</strong>
                  </div>
                  <div className={styles.priceButton}>
                    <strong>{priceComma(item.price)} PHP</strong>
                    <strong>0 sold</strong>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default ProductList
