import React, { Component } from 'react';
import PaymentRequestComponent from './PaymentRequestComponent';


class CheckoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCardNumber: '',
      cardholderName: '',
    }
  }

  componentDidMount() {
    this.setState({
      paymentRequestIsAvailable: window.PaymentRequest
    });
  }

  render() {
    const { creditCardNumber, cardholderName, paymentRequestIsAvailable } = this.state;

    if (paymentRequestIsAvailable) {
      return (
        <PaymentRequestComponent />
      )
    }

    return (
      <form>
        <div>
          <label>
            Credit card number
            <input type="text" onChange={this.onCreditCardNumberChange} value={creditCardNumber} />
          </label>
        </div>
        <div>
          <label>
            Cardholder name
            <input type="text" onChange={this.onCardholderNameChange} value={cardholderName} />
          </label>
        </div>
      </form>
    )
  }

  onCreditCardNumberChange = evt => {
    const creditCardNumber = evt.target.value;
    this.setState({creditCardNumber});
  }
  onCardholderNameChange = evt => {
    const cardholderName = evt.target.value;
    this.setState({cardholderName});
  }
}

export default CheckoutContainer;
