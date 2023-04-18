import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {MdOutlineSort} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import LoaderComp from '../LoaderComp'

import './index.css'

if (JSON.parse(localStorage.getItem('cartData')) === null) {
  localStorage.setItem('cartData', JSON.stringify([]))
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const discountDetailsApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}
const restaurantsApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    discountDetails: [],
    whatToDisplayInDiscount: discountDetailsApiStatus.loading,
    whatToDisplayInRestaurants: restaurantsApiStatus.loading,
    sortBy: sortByOptions[1].value,
    restaurantsList: [],
    activePage: 1,
    total: 1,
  }

  componentDidMount() {
    this.fetchDiscountDetails()
    this.fetchRestaurantsList()
  }

  decrementActivePageCount = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.fetchRestaurantsList,
      )
    }
  }

  incrementActivePageCount = () => {
    const {activePage, total} = this.state
    const totalPage = Math.ceil(total / 9)
    if (activePage < totalPage) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.fetchRestaurantsList,
      )
    }
  }

  sortByOptionChange = e => {
    console.log(e.target.value, 'test')
    this.setState({sortBy: e.target.value}, this.fetchRestaurantsList)
  }

  offerSlides = () => {
    const {discountDetails} = this.state
    const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: true,
    }

    return (
      <Slider {...settings}>
        {discountDetails.map(item => (
          <div key={item.id} className="slide-container">
            <img src={item.imgUrl} alt="offer" className="slide-images" />
          </div>
        ))}
      </Slider>
    )
  }

  restaurantsSection = () => {
    const {sortBy, restaurantsList, activePage, total} = this.state
    const totalPage = Math.ceil(total / 9)
    console.log(totalPage)

    return (
      <div className="restaurants">
        <div className="restaurants-top-section">
          <h1 className="restaurants-main-heading">Popular Restaurants</h1>
          <div className="sorting-section-outer-container">
            <p className="sorting-section-typo">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sorting-section-main-container">
              <MdOutlineSort className="sort-icon" />
              <p className="sort-by-typo">Sort by</p>
              <select
                className="sort-container"
                value={sortBy}
                onChange={this.sortByOptionChange}
              >
                {sortByOptions.map(item => (
                  <option
                    key={item.id}
                    value={item.value}
                    className="sort-by-option"
                  >
                    {item.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <ul className="restaurants-bottom-section">
          {restaurantsList.map(item => (
            <li
              key={item.id}
              className="restaurants-list-card"
              data-testid="restaurant-item"
            >
              <Link
                className="nav-link restaurant-grid-link"
                to={`/restaurant/${item.id}`}
              >
                <div className="restaurants-list-div-card">
                  <div className="restaurants-list-card-img-container">
                    <img
                      src={item.imgUrl}
                      alt="restaurant"
                      className="restaurants-list-card-img"
                    />
                  </div>
                  <div className="restaurants-list-card-typo">
                    <h1 className="restaurants-list-card-title">{item.name}</h1>
                    <p className="restaurants-list-card-cuisine">
                      {item.cuisine}
                    </p>
                    <div className="restaurants-list-rating-container">
                      <AiFillStar className="star-icon" />
                      <h1 className="rating-num">{item.userRating.rating}</h1>
                      <p className="num-of-ratings">{`(${item.userRating.totalReviews} ratings)`}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="pagination-btn-container">
          <button
            type="button"
            onClick={this.decrementActivePageCount}
            className={`pagination-btn ${
              activePage === 1 ? 'opacity-pagination-btn' : ''
            }`}
            data-testid="pagination-left-button"
          >
            <RiArrowLeftSLine />
          </button>
          <p className="pagination-page-num">
            <span data-testid="active-page-number">{activePage}</span> of{' '}
            {totalPage}
          </p>
          <button
            type="button"
            onClick={this.incrementActivePageCount}
            className={`pagination-btn ${
              activePage === totalPage ? 'opacity-pagination-btn' : ''
            }`}
            data-testid="pagination-right-button"
          >
            <RiArrowRightSLine />
          </button>
        </div>
      </div>
    )
  }

  fetchDiscountDetails = async () => {
    this.setState({whatToDisplayInDiscount: discountDetailsApiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
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
      const {offers} = responseData
      const discountDetails = offers.map(item => ({
        id: item.id,
        imgUrl: item.image_url,
      }))
      this.setState({
        discountDetails,
        whatToDisplayInDiscount: discountDetailsApiStatus.success,
      })
    } else {
      this.setState({
        whatToDisplayInDiscount: discountDetailsApiStatus.failure,
      })
    }
  }

  fetchRestaurantsList = async () => {
    this.setState({whatToDisplayInRestaurants: restaurantsApiStatus.loading})
    const {sortBy, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?search=${''}&offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
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
      const {restaurants, total} = responseData
      const restaurantsList = restaurants.map(item => ({
        id: item.id,
        imgUrl: item.image_url,
        costForTwo: item.cost_for_two,
        cuisine: item.cuisine,
        groupByTime: item.group_by_time,
        hasOnlineDelivery: item.has_online_delivery,
        hasTableBooking: item.has_table_booking,
        isDeliveringNow: item.is_delivering_now,
        location: item.location,
        menuType: item.menu_type,
        name: item.name,
        opens_at: item.opens_at,
        userRating: {
          rating: item.user_rating.rating,
          ratingColor: item.user_rating.rating_color,
          ratingText: item.user_rating.rating_text,
          totalReviews: item.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList,
        whatToDisplayInRestaurants: restaurantsApiStatus.success,
        total,
      })
      console.log(restaurantsList)
    } else {
      this.setState({
        whatToDisplayInRestaurants: restaurantsApiStatus.failure,
      })
    }
  }

  displayRestaurants = () => {
    const {whatToDisplayInRestaurants} = this.state

    switch (whatToDisplayInRestaurants) {
      case restaurantsApiStatus.loading:
        return <LoaderComp test="restaurants-list-loader" />
      case restaurantsApiStatus.success:
        return this.restaurantsSection()
      default:
        return null
    }
  }

  displayOffersSlide = () => {
    const {whatToDisplayInDiscount} = this.state

    switch (whatToDisplayInDiscount) {
      case discountDetailsApiStatus.loading:
        return <LoaderComp test="restaurants-offers-loader" />
      case discountDetailsApiStatus.success:
        return this.offerSlides()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <div className="home-main-container">
          <Header />
          <div className="home-main-content-container">
            <div className="home-offers-section">
              {this.displayOffersSlide()}
            </div>
            <div className="home-restaurants-section">
              {this.displayRestaurants()}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home

/* <Link
              className="nav-link"
              // className="nav-link restaurant-grid-link"
              to={`/restaurant/${item.id}`}
              key={item.id}
            >
              <li
                key={item.id}
                className="restaurants-list-card"
                testid="restaurant-item"
              >
                <div className="restaurants-list-card-img-container">
                  <img
                    src={item.imgUrl}
                    //   alt="restaurant"
                    alt={item.name}
                    className="restaurants-list-card-img"
                  />
                </div>
                <div className="restaurants-list-card-typo">
                  <h1 className="restaurants-list-card-title">{item.name}</h1>
                  <p className="restaurants-list-card-cuisine">
                    {item.cuisine}
                  </p>
                  <div className="restaurants-list-rating-container">
                    <AiFillStar className="star-icon" />
                    <h1 className="rating-num">{item.userRating.rating}</h1>
                    <p className="num-of-ratings">{`(${item.userRating.totalReviews} ratings)`}</p>
                  </div>
                </div>
              </li>
            </Link> */
