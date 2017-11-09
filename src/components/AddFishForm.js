import React from 'react';

class AddFishForm extends React.Component {
  constructor() {
    super()
    this.createFish = this.createFish.bind(this)
  }
  createFish (e) {
    e.preventDefault()
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    this.props.addFish(fish)
    this.form.reset()
  }
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish} ref={input => this.form = input}>
        <input ref={(input) => this.name = input} type="text" placeholder="Fish name"/>
        <input ref={(input) => this.price = input} type="text" placeholder="Fish price"/>
        <select ref={(input) => this.status = input}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea ref={(input) => this.desc = input} placeholder="Fish desc"></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="Fish image"/>
        <button type="submit">Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm;