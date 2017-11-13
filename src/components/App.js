import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      fishes: {},
      order: {}
    }

    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.updateFish = this.updateFish.bind(this)
  }
  componentWillMount() {
    // Save reference
    this.storeId = this.props.match.params.storeId

    const localStorageRef = localStorage.getItem(`order-${this.storeId}`)

    this.ref = base.syncState(`${this.storeId}/fishes`, {
      context: this,
      state: 'fishes',
      then: () => {
        if (localStorageRef) {
          this.setState({
            order: JSON.parse(localStorageRef)
          })
        }
      }
    })

  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.storeId}`, JSON.stringify(nextState.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish(fish) {
    let fishes = { ...this.state.fishes }
    const timestamp = Date.now()

    fishes[`fish-${timestamp}`] = fish
    this.setState({ fishes })
  }

  updateFish(key, fish) {
    const fishes = {...this.state.fishes}
    fishes[key] = fish
    this.setState({fishes})
  }

  loadSamples() {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder(key) {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul>
            {
              Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish}/>
      </div>

    )
  }
}

export default App