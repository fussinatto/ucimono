import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  constructor () {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  goToStore (event) {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.history.push(`/store/${storeId}`);
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Select A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
        <button type="submit">Visit Store </button>
      </form>
    ) 
  }
}

StorePicker.contextTypes = {
  router: PropTypes.object
}
export default StorePicker;
