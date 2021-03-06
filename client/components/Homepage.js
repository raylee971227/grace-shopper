import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts, getAllProducts} from '../store/product'
import {ProductCard} from './index'
import {clearHomePromo} from '../store/home'
import {Modal, Divider} from 'semantic-ui-react'

class Homepage extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    this.props.clearModal()
  }
  async componentDidMount() {
    await this.props.fetchAllProducts()
  }
  componentWillUnmount() {
    this.props.clearProducts()
  }
  render() {
    const newProducts = this.props.newProducts
    return (
      <React.Fragment>
        <div id="home-page-banner-container" onClick={this.handleClick}>
          <Modal
            open={this.props.showModal}
            size="fullscreen"
            dimmer="blurring"
          >
            <Modal.Content>
              <Modal.Description>
                <div className="promoModal">
                  <img src="/img/uglybanner.png" />
                  <div className="promoModalCopy">
                    LIMITED OFFER: BUY 3 UGLY SWEATERS AND GET THE 4TH FREE!
                  </div>
                </div>
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <img src="img/banner1.png" alt="banner image 1" />
          <Link to="/products" id="home-page-banner-button">
            Shop All Sweaters <i className="fas fa-arrow-right" />
          </Link>
        </div>
        <Divider />
        <div id="home-page-new-products-container">
          <h3>New Sweaters</h3>
          <div id="home-page-new-products" className="ui five cards">
            {newProducts.map(product => {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
        </div>
        <Divider />
        <div id="home-page-press-container">
          <h3>Featured In</h3>
          <span>
            <a href="https://techcrunch.com/">
              <img src="img/techcrunch.png" alt="tc logo" />
            </a>
            <a href="https://www.elle.com/">
              <img src="img/elle.svg" alt="elle logo" />
            </a>
            <a href="https://www.gq.com/">
              <img src="img/gq.png" alt="gq logo" />
            </a>
            <a href="https://www.vogue.com/">
              <img src="img/vogue.svg" alt="vogue logo" />
            </a>
          </span>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  let allProducts = state.product.allProducts
  let newProducts = allProducts.sort((a, b) => a.createdAt > b.createdAt)
  return {
    newProducts: newProducts.slice(0, 5),
    showModal: state.home
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(fetchAllProducts())
    },
    clearProducts: () => {
      dispatch(getAllProducts([]))
    },
    clearModal: () => {
      dispatch(clearHomePromo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
