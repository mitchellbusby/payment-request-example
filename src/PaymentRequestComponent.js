import React, { Component } from 'react';

class PaymentRequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debugString: ''
    };
  }

  componentDidMount() {
    const supportedPaymentMethods = [
      {
        supportedMethods: ['basic-card'],
      }
    ]

    const paymentDetails = {
      total: {
        label: 'Monthly Advanced Plan',
        amount: {
          currency: 'AUD',
          value: 19.99
        }
      }
    }

    // Use this for things like permissions
    const options = {
      requestPayerName: true
    };

    const request = new window.PaymentRequest(
      supportedPaymentMethods,
      paymentDetails,
      options
    );

    request.show()
    .then(paymentResponse => {
      // Make a payment with the thing, and allow
      this.setState({payerName: paymentResponse.payerName});

      new Promise(resolve => {
        setTimeout(() => resolve(), 1000);
      })
      .then(() => {
        return paymentResponse.complete('success');
      })
      .then(() => {
        this.setState({
          debugString: `Thanks for paying, ${this.state.payerName}!`
        });
      })
    })
    .catch(err => {
      // Catch or something
      this.setState({debugString: 'Sorry, you cancelled the transaction. You monster.'})
    });
  }

  render() {
    const { debugString } = this.state;
    return (
      <p>{ debugString }</p>
    )
  }
}

export default PaymentRequestComponent;
