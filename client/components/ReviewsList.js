import React from 'react'
import {connect} from 'react-redux'
import {ReviewCard} from './index'
import {addNewReview} from '../store/product'
import {Rating} from 'semantic-ui-react'

class ReviewsList extends React.Component {
  constructor() {
    super()
    this.state = {
      rating: 5
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRate = this.handleRate.bind(this)
  }
  handleRate(event, {rating}) {
    this.setState({rating})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewReview({
      rating: this.state.rating,
      reviewText: event.target.reviewText.value,
      userId: this.props.currentUser.id,
      productId: this.props.singleProduct.id
    })
  }
  render() {
    return (
      <React.Fragment>
        <center style={{margin: '40px'}}>
          <h3>Reviews</h3>
        </center>
        <div className="ui three cards">
          {this.props.allReviews.map(review => {
            return <ReviewCard key={review.id} review={review} />
          })}
        </div>
        <h3>Leave a Review:</h3>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <Rating
            icon="star"
            onRate={this.handleRate}
            name="rating"
            defaultRating={this.state.rating}
            maxRating={5}
          />
          <textarea rows="3" name="reviewText" />
          {this.props.currentUser.id ? (
            <button className="ui button" type="submit">
              Submit
            </button>
          ) : (
            <button className="ui disabled button" type="submit">
              Please Log In to Leave Reviews
            </button>
          )}
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const singleProduct = state.product.singleProduct || {}
  return {
    singleProduct: singleProduct,
    allReviews: singleProduct.reviews || [],
    currentUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewReview: newInfo => dispatch(addNewReview(newInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList)
