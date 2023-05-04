import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'
import LoaderComp from '../LoaderComp'

import './index.css'

const restaurantsDetailApi = {
  success: 'SUCCESS',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetailsList: {},
    foodItemsList: [],
    addedList: JSON.parse(localStorage.getItem('cartData')),
    whatToDisplay: restaurantsDetailApi.initial,
  }

  componentDidMount() {
    this.fetchFoodsDetails()
  }

  onAddBtnClick = id => {
    const {addedList} = this.state
    const isObjInAddList = addedList.find(item => item.id === id)
    console.log(isObjInAddList)
    this.setState(prevState => ({
      foodItemsList: prevState.foodItemsList.map(item => {
        if (item.id === id) {
          return {...item, quantity: 1}
        }
        return item
      }),
    }))
    if (!isObjInAddList) {
      this.setState(prevState => {
        const obj = prevState.foodItemsList.find(item => item.id === id)
        return {addedList: [...prevState.addedList, {...obj, quantity: 1}]}
      })
    } else {
      this.setState(prevState => ({
        addedList: prevState.addedList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        }),
      }))
    }
  }

  incrementQuantity = id =>
    this.setState(prevState => ({
      foodItemsList: prevState.foodItemsList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
      addedList: prevState.addedList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))

  decrementQuantity = id => {
    const {addedList} = this.state
    const currObj = addedList.find(item => item.id === id)
    this.setState(prevState => ({
      foodItemsList: prevState.foodItemsList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      }),
    }))

    if (currObj.quantity > 1) {
      this.setState(prevState => ({
        addedList: prevState.addedList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        }),
      }))
    } else {
      this.setState(prevState => ({
        addedList: prevState.addedList.filter(item => item.id !== id),
      }))
    }
  }

  foodDetails = () => {
    const {foodItemsList} = this.state

    return (
      <ul className="foodDetails-ul-container">
        {foodItemsList.map(item => (
          <li
            key={item.id}
            className="foodDetails-li-container"
            data-testid="foodItem"
          >
            <div className="foodDetails-list-card-img-container">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="foodDetails-list-card-img"
              />
            </div>
            <div className="foodDetails-list-card-typo-container">
              <h1 className="foodDetails-list-card-title">
                {item.name[0].toUpperCase() + item.name.slice(1)}
              </h1>
              <p className="foodDetails-list-card-cuisine">
                &#8377; {item.cost.toFixed(2)}
              </p>

              <div className="foodDetails-list-rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-num flex-grow-1">{item.rating}</p>
              </div>
              {item.quantity === 0 && (
                <button
                  className="foodDetails-list-add-btn"
                  type="button"
                  onClick={() => this.onAddBtnClick(item.id)}
                >
                  Add
                </button>
              )}
              {item.quantity !== 0 && (
                <Counter
                  itemId={item.id}
                  removeAddBtn={this.removeAddBtn}
                  incrementQuantity={this.incrementQuantity}
                  decrementQuantity={this.decrementQuantity}
                  quantity={item.quantity}
                  incTest="increment-count"
                  decTest="decrement-count"
                  quantTest="active-count"
                />
              )}
            </div>
            <span
              className={`food-type ${
                item.foodType === 'VEG' ? 'type-veg' : 'type-non-veg'
              }`}
            >
              <span
                className={`circle ${
                  item.foodType === 'VEG' ? 'green' : 'red'
                }`}
              >
                {}
              </span>
            </span>
          </li>
        ))}
      </ul>
    )
  }

  bannerDetails = () => {
    const {restaurantDetailsList} = this.state
    const {
      name,
      cuisine,
      location,
      rating,
      costForTwo,
      imgUrl,
      reviewsCount,
    } = restaurantDetailsList

    return (
      <div className="banner-inner-container">
        <div className="wrapper-container">
          <div className="banner-img-container">
            <img src={imgUrl} alt="restaurant" className="banner-image" />
          </div>
          <div className="banner-typo-container">
            <h1 className="banner-title">{name}</h1>
            <p className="banner-common-typo">{cuisine}</p>
            <p className="banner-common-typo">{location}</p>
            <div className="review-container">
              <div className="review-rating-container">
                <div className="foodDetails-list-rating-container">
                  <AiFillStar className="banner-star-icon" />
                  <p className="review-medium-text">{rating}</p>
                </div>
                <p className="review-smaller-text">{reviewsCount} Ratings</p>
              </div>
              <div className="review-cost-container">
                <p className="review-medium-text"> &#8377; {costForTwo}</p>
                <p className="review-smaller-text">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  fetchFoodsDetails = async () => {
    this.setState({whatToDisplay: restaurantsDetailApi.loading})
    const {match} = this.props
    const {params} = match
    const {id: restrauntId} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${restrauntId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      const updatedObject = {
        id: responseData.id,
        costForTwo: responseData.cost_for_two,
        cuisine: responseData.cuisine,
        imgUrl: responseData.image_url,
        itemsCount: responseData.items_count,
        location: responseData.location,
        name: responseData.name,
        opensAt: responseData.opens_at,
        rating: responseData.rating,
        reviewsCount: responseData.reviews_count,
        foodItems: responseData.food_items.map(item => ({
          cost: item.cost,
          foodType: item.food_type,
          id: item.id,
          imageUrl: item.image_url,
          name: item.name,
          rating: item.rating,
          quantity: 0,
        })),
      }
      this.setState({
        restaurantDetailsList: updatedObject,
        foodItemsList: updatedObject.foodItems,
        whatToDisplay: restaurantsDetailApi.success,
      })
      console.log(updatedObject)
    }
  }

  content = () => (
    <>
      <li className="banner-holder-section">
        <div className="details-banner-section">{this.bannerDetails()}</div>
      </li>
      <li className="details-restaurants-section">{this.foodDetails()}</li>
    </>
  )

  displayContent = () => {
    const {whatToDisplay} = this.state

    switch (whatToDisplay) {
      case restaurantsDetailApi.success:
        return this.content()
      case restaurantsDetailApi.loading:
        return <LoaderComp test="restaurant-details-loader" />
      default:
        return null
    }
  }

  render() {
    const {addedList} = this.state
    localStorage.setItem('cartData', JSON.stringify(addedList))

    return (
      <div className="details-bg-container">
        <div className="details-main-container">
          <Header />
          <ul className="details-main-content-container">
            {this.displayContent()}
          </ul>
          <Footer />
        </div>
      </div>
    )
  }
}

export default RestaurantDetails
