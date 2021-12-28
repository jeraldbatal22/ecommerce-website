import React from 'react'
// import styles from './ProgressBar.module.css'
import './ProgressBar.css'

const ProgressBar = (props) => {
  return (
    <div className="stepper-wrapper">
      <div className={props.step1 ? "stepper-item completed" : "stepper-item active"}>
        <div className="step-counter">1</div>
        <div className="step-name">Signin</div>
      </div>
      <div className={props.step2 ? "stepper-item completed" : "stepper-item active"}>
        <div className="step-counter">2</div>
        <div className="step-name">Shipping</div>
      </div>
      <div className={props.step3 ? "stepper-item completed" : "stepper-item active"}>
        <div className="step-counter">3</div>
        <div className="step-name">Payment</div>
      </div>
      <div className={props.step4 ? "stepper-item completed" : "stepper-item active"}>
        <div className="step-counter">4</div>
        <div className="step-name">Place Order</div>
      </div>
      <div className={props.step5 ? "stepper-item completed" : "stepper-item active"}>
        {/* <div className="step-counter">4</div>
        <div className="step-name">Place Order</div> */}
      </div>
    </div>
  )
}

export default ProgressBar
