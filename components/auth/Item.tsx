import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemStyles from './ItemStyles'
import Parser from 'html-react-parser'

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px 40px',
  margin: '20px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

function addtoCart() {
  alert('added to cart!')
}

interface Props {
  product?: any
}
export default class Item extends Component<Props> {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const { product } = this.props
    console.log('item', product)
    return (
      <ItemStyles>
        {product.images[0].url_thumbnail && (
          <img src={product.images[0].url_thumbnail} alt={product.name} />
        )}
        <div>{product.name}</div>

        <div className="buttonList">
          <button style={buttonStyles} onClick={addtoCart}>
            Add to Cart
          </button>
          <button style={buttonStyles} onClick={addtoCart}>
            Learn More
          </button>
        </div>
      </ItemStyles>
    )
  }
}
