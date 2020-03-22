import React, {Component} from 'react'
import ApiService from "../../service/ApiService";

class EditCreditCardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            balance: '',
            cardNumber: ''
        }
        this.saveCreditCard = this.saveCreditCard.bind(this);

        this.loadCreditCard = this.loadCreditCard.bind(this);
    }

    componentDidMount() {
        this.loadCreditCard();
    }

    loadCreditCard() {
        ApiService.fetchCreditCardById(window.localStorage.getItem("creditCardId"))
            .then((res) => {
                let creditCard = res.data.result;
                this.setState({
                    id: creditCard.id,
                    name: creditCard.name,
                    balance: creditCard.balance,
                    cardNumber: creditCard.cardNumber,
                })
            });
    }

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

    saveCreditCard = (e) => {
        e.preventDefault();
        let creditCard = {
            id: this.state.id,
            name: this.state.name,
            balance: this.state.balance,
            cardNumber: this.state.cardNumber
        };
        ApiService.editCreditCard(creditCard)
            .then(res => {
                this.setState({message: 'CreditCard added successfully.'});
                this.props.history.push('/creditCards');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit CreditCard</h2>
                <form>

                    <div className="form-group">
                        <label>Name On CreditCard :</label>
                        <input type="text" placeholder="creditCardname" name="creditCardname" className="form-control"
                               readonly="true" defaultValue={this.state.name}/>
                    </div>

                    <div className="form-group">
                        <label>Balance:</label>
                        <input type="number" placeholder="balance" name="balance" className="form-control"
                               value={this.state.balance} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>CardNumber:</label>
                        <input type="number" placeholder="Please write cardNumber" name="cardNumber" className="form-control"
                               value={this.state.cardNumber} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveCreditCard}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditCreditCardComponent;