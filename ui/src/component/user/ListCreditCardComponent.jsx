import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListCreditCardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            creditCards: [],
            message: null
        }
        this.deleteCreditCard = this.deleteCreditCard.bind(this);
        this.editCreditCard = this.editCreditCard.bind(this);
        this.addCreditCard = this.addCreditCard.bind(this);
        this.reloadCreditCardList = this.reloadCreditCardList.bind(this);
    }

    componentDidMount() {
        this.reloadCreditCardList();
    }

    reloadCreditCardList() {
        ApiService.fetchCreditCards()
            .then((res) => {
                this.setState({creditCards: res.data.result})
            });
    }

    deleteCreditCard(creditCardId) {
        ApiService.deleteCreditCard(creditCardId)
           .then(res => {
               this.setState({message : 'CreditCard deleted successfully.'});
               this.setState({creditCards: this.state.creditCards.filter(creditCard => creditCard.id !== creditCardId)});
           })

    }

    editCreditCard(id) {
        window.localStorage.setItem("creditCardId", id);
        this.props.history.push('/edit-creditCard');
    }

    addCreditCard() {
        window.localStorage.removeItem("creditCardId");
        this.props.history.push('/add-creditCard');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Credit Card Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addCreditCard()}> Add New Credit Card</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Card Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.creditCards.map(
                        creditCard =>
                                    <tr key={creditCard.id}>
                                        <td>{creditCard.name}</td>
                                        <td>{creditCard.balance}</td>
                                        <td>{creditCard.cardNumber}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deleteCreditCard(creditCard.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editCreditCard(creditCard.id)} style={{marginLeft: '20px'}}> Edit</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListCreditCardComponent;