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
        data-testid={decTest}
      >
        -
      </button>
      <h1 className="counter-count" data-testid={quantTest}>
        {quantity}
      </h1>
      <button
        type="button"
        onClick={onIncrement}
        className="counter-btn"
        data-testid={incTest}
      >
        +
      </button>
    </div>
  )
}

export default Counter
