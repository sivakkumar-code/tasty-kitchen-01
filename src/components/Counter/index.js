import './index.css'

const Counter = props => {
  const {
    incrementQuantity,
    decrementQuantity,
    itemId,
    quantity,
    incTest,
    decTest,
    quantTest,
  } = props

  const onDecrement = () => decrementQuantity(itemId)

  const onIncrement = () => incrementQuantity(itemId)

  return (
    <div className="counter-container">
      <button
        type="button"
        onClick={onDecrement}
        className="counter-btn"
        testId={decTest}
      >
        -
      </button>
      <p className="counter-count" testId={quantTest}>
        {quantity}
      </p>
      <button
        type="button"
        onClick={onIncrement}
        className="counter-btn"
        testId={incTest}
      >
        +
      </button>
    </div>
  )
}

export default Counter

// import {Component} from 'react'

// import './index.css'

// class Counter extends Component {
//   state = {productCount: 1}

//   onIncrement = () => {
//     const {incrementQuantity, itemId} = this.props
//     this.setState(
//       prevState => ({productCount: prevState.productCount + 1}),
//       incrementQuantity(itemId),
//     )
//   }

//   onDecrement = () => {
//     const {productCount} = this.state
//     const {removeAddBtn, itemId, decrementQuantity} = this.props
//     if (productCount > 1) {
//       this.setState(
//         prevState => ({productCount: prevState.productCount - 1}),
//         decrementQuantity(itemId),
//       )
//     }
//     if (productCount === 1) {
//       removeAddBtn(itemId)
//     }
//   }

//   render() {
//     const {productCount} = this.state

//     return (
//       <div className="counter-container">
//         <button
//           type="button"
//           onClick={this.onDecrement}
//           className="counter-btn"
//         >
//           -
//         </button>
//         <div className="counter-count">{productCount}</div>
//         <button
//           type="button"
//           onClick={this.onIncrement}
//           className="counter-btn"
//         >
//           +
//         </button>
//       </div>
//     )
//   }
// }

// export default Counter
