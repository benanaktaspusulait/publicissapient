import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddCreditCardComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            name: '',
            balance: '',
            cardNumber: ''
        }
        this.saveCreditCard = this.saveCreditCard.bind(this);
    }

    saveCreditCard = (e) => {
        e.preventDefault();
        let creditCard = {name: this.state.name, balance: this.state.balance, cardNumber: this.state.cardNumber};
        ApiService.addCreditCard(creditCard)
            .then(res => {
                this.setState({message : 'CreditCard added successfully.'});
                this.props.history.push('/creditCards');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Credit Card</h2>
                <form>
                <div className="form-group">
                    <label>Card On Name:</label>
                    <input type="text" placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                </div>


                <div className="form-group">
                    <label>Balance:</label>
                    <input type="number" placeholder="balance" name="balance" className="form-control" value={this.state.balance} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Card Number:</label>
                    <input type="number" placeholder="cardNumber" name="cardNumber" className="form-control" value={this.state.cardNumber} onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveCreditCard}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddCreditCardComponent;