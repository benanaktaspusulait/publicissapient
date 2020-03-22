import React, {Component} from 'react'
import ApiService from "../../service/ApiService";

class AddCreditCardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameOnCard: '',
            balance: '',
            cardNumber: '',
            errorMessages: ''
        }
        this.saveCreditCard = this.saveCreditCard.bind(this);
    }

    saveCreditCard = (e) => {
        e.preventDefault();
        let creditCard = {
            nameOnCard: this.state.nameOnCard,
            balance: this.state.balance,
            cardNumber: this.state.cardNumber
        };
        ApiService.addCreditCard(creditCard)
            .then(response => {
                this.setState({message: 'CreditCard added successfully.'});
                this.props.history.push('/creditCards');

            }).catch(err => {
            this.setState({errorMessages: err.response.data.errors[0].defaultMessage});
            console.log(err.response.data.errors[0].defaultMessage);
        })
        ;
    }

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <div>
                <h2 className="text-center">Add Credit Card</h2>
                <form>
                    <div className="form-group">
                        <label>Card On Name:</label>
                        <input type="text" placeholder="name" required={true} name="nameOnCard" className="form-control"
                               value={this.state.nameOnCard} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Balance:</label>
                        <input type="number" placeholder="balance" required={true} name="balance"
                               className="form-control" value={this.state.balance} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Card Number:</label>
                        <input type="number" placeholder="cardNumber" required={true} name="cardNumber"
                               className="form-control" value={this.state.cardNumber} onChange={this.onChange}/>
                    </div>

                    <div className="danger">
                        <span className="label label-danger">{this.state.errorMessages}</span>
                    </div>

                    <div>
                        <button className="btn btn-success" onClick={this.saveCreditCard}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddCreditCardComponent;