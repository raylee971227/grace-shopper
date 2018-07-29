import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import history from '../history'

const ProductCard = props => {
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          history.push(`/products/${props.product.id}`)
        }}
      >
        <Image src={props.product.image} size="medium" />
        <Card.Content>
          <Card.Header>{props.product.name}</Card.Header>
          <Card.Meta>{`$${props.product.price}`}</Card.Meta>
          <Card.Description>{props.product.description}</Card.Description>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}

export default ProductCard
