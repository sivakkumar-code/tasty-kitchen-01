import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'

import './index.css'

class Cart extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartData')),
    placeOrder: false,
  }

  placeOrder = () => this.setState({placeOrder: true})

  goHomeAfterPayment = () => {
    const {history} = this.props
    history.replace('/')
    localStorage.setItem('cartData', JSON.stringify([]))
    this.setState({placeOrder: false})
  }

  incrementQuantity = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))

  decrementQuantity = id => {
    const {cartList} = this.state
    const currObj = cartList.find(item => item.id === id)
    console.log(currObj)
    if (currObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(item => item.id !== id),
      }))
    }
  }

  render() {
    const {cartList, placeOrder} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    // if (cartList !== null) {
    //   localStorage.setItem('cartData', JSON.stringify(cartList))
    // }
    console.log(cartList, 'cartlist')
    let total = 0
    cartList.forEach(item => {
      total += item.quantity * item.cost
    })

    return (
      <div className="cart-bg-container">
        <div className="cart-main-container">
          <Header />
          {cartList.length !== 0 && !placeOrder && (
            <>
              <div className="cart-main-content-container">
                <div className="cart-table-container">
                  <ul className="cart-table-top">
                    <li className="cart-table-row cart-table-top-row">
                      <div className="cart-table-col jus-flex-start col-1">
                        <h1 className="col-title item-heading">Item</h1>
                      </div>
                      <div className="cart-table-col col-2">
                        <h1 className="col-title">Quantity</h1>
                      </div>
                      <div className="cart-table-col col-3">
                        <h1 className="col-title">Price</h1>
                      </div>
                    </li>
                    {cartList.map(item => (
                      <li
                        key={item.id}
                        className="cart-table-row"
                        data-testid="cartItem"
                      >
                        <div className="cart-table-col cart-table-img-container">
                          <div className="cart-img-container">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="cart-img"
                            />
                          </div>
                        </div>
                        <div className="cart-table-col cart-table-col-typo">
                          <h1 className="foodItem-heading">{item.name}</h1>
                        </div>
                        <div className="cart-table-col cart-table-col-typo">
                          <Counter
                            quantity={item.quantity}
                            decrementQuantity={this.decrementQuantity}
                            incrementQuantity={this.incrementQuantity}
                            itemId={item.id}
                            decTest="decrement-quantity"
                            incTest="increment-quantity"
                            quantTest="item-quantity"
                          />
                        </div>
                        <div className="cart-table-col cart-table-col-typo">
                          <p className="cart-food-item-price">
                            &#8377; {(item.quantity * item.cost).toFixed(2)}
                          </p>
                        </div>
                      </li>
                    ))}
                    <li className="cart-last-row">
                      <div>
                        <h1 className="order-total-heading">Order Total:</h1>
                      </div>
                      <div className="total-container">
                        <p className="total-amount" data-testid="total-price">
                          &#8377; {total.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          className="btn-common-orange place-order-btn"
                          onClick={this.placeOrder}
                        >
                          Place Order
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <Footer />
            </>
          )}
          {(cartList.length === 0 || placeOrder) && (
            <div className="payment-and-no-order-container">
              {placeOrder && (
                <div className="payment-success-container">
                  <img
                    src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681370614/Tasty_Kitchens/check_circle_icon_ud9hbk.png"
                    alt="success"
                    className="success-tick"
                  />
                  <h1 className="payment-success-title">Payment Successful</h1>
                  <p className="payment-success-para">
                    Thank you for ordering Your payment is successfully
                    completed.
                  </p>
                  <Link className="nav-link" to="/">
                    <button
                      type="button"
                      className="btn-common-orange"
                      // onClick={this.goHomeAfterPayment}
                    >
                      Go To Home Page
                    </button>
                  </Link>
                </div>
              )}
              {cartList.length === 0 && (
                <div className="no-order-container">
                  <img
                    src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681130273/Tasty_Kitchens/no_orders_image_dov7dc.png"
                    alt="empty cart"
                    className="no-order-img"
                  />
                  <h1 className="no-order-title">No Order Yet!</h1>
                  <p className="no-order-para">
                    Your cart is empty. Add something from the menu.
                  </p>
                  <Link className="nav-link" to="/">
                    <button type="button" className="btn-common-orange">
                      Order now
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Cart
