import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }
  updateValue(e, key){
    const name = e.target.name
    const updatedFish = this.props.fishes[key]
    updatedFish[name] = e.target.value
    this.props.updateFish(key, updatedFish)
  }
  renderInventory (key) {
    const fish = this.props.fishes[key]
    return(
      <div className="fish-edit" key={key}>
        <input name="name" type="text" placeholder="Fish name" value={fish.name} onChange={(e) => this.updateValue(e, key)}/>
        <input name="price" type="text" placeholder="Fish price" value={fish.price} onChange={(e) => this.updateValue(e, key)}/>
        <select name="status" value={fish.status} onChange={(e) => this.updateValue(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" placeholder="Fish desc" value={fish.desc} onChange={(e) => this.updateValue(e, key)}></textarea>
        <input name="image" type="text" placeholder="Fish image" value={fish.image} onChange={(e) => this.updateValue(e, key)}/>
        <button>Delete Fish</button>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Add Samples</button>
      </div>
    )
  }
}

export default Inventory;