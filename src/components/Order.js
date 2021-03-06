import React from 'react';
import { formatPrice } from "../helpers";
class Order extends React.Component {
  constructor() {
    super()
    this.renderOrder = this.renderOrder.bind(this)
  }

  renderOrder (key) {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const removeBtn =<button onClick={()=>this.props.removeOrder(key)}>X</button>

    if(!fish || fish.status !== 'available') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available. {removeBtn}</li>
    }
    return <li key={key}>
      <span>{count}kg {fish.name} {removeBtn} </span>
      <span className="price">{formatPrice(count * fish.price)}</span>
     
    </li>
  }

  render() {
    const orderIDs = Object.keys(this.props.order);
    const total = orderIDs.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'
      if(isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)
    
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIDs.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>          
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;