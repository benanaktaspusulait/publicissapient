import React, {Component} from 'react'
import ApiService from "../../service/ApiService";
import {validateComponent, validateField} from "../validation/Validation";
import UncontrolledTooltip from "reactstrap/lib/UncontrolledTooltip";

class AddCreditCardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            creditCard: {
                id: '',
                nameOnCard: '',
                balance: '',
                cardNumber: ''
            },
            errorMessages: '',
            error: {}
        }
        this.saveCreditCard = this.saveCreditCard.bind(this);
        this.validateClass = this.validateClass.bind(this);
        this.validateComponent = this.validateComponent.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateMessage = this.validateMessage.bind(this);
    }

    validateClass(id) {
        let error = this.state.error;
        return (error[id] === undefined ? "" : (error[id].valid ? " has-success" : " has-danger"));
    }

    validateMessage(id) {
        let error = this.state.error;
        return (error[id] === undefined ? '' : (error[id].message));
    }

    validateComponent() {
        let result = validateComponent(this);
        this.setState({
            error: result.error
        });

        return result;
    }

    validateField(e) {
        let id = e.target.id;
        let rule = e.target.dataset.vdata;
        let boundary = e.target.dataset.vlength;
        let value = e.target.value;
        let result = validateField(rule, boundary, value);
        let error = this.state.error;
        error = Object.assign(error, {[id]: result});
        this.setState({error});
    }

    onChange(e) {
        this.setState({
            creditCard: {
                ...this.state.creditCard,
                [e.target.name]: e.target.value
            }
        })
    }

    saveCreditCard = (e) => {

        let validity = this.validateComponent();

        if (validity.valid) {
            e.preventDefault();
            let creditCard = {
                nameOnCard: this.state.creditCard.nameOnCard,
                balance: this.state.creditCard.balance,
                cardNumber: this.state.creditCard.cardNumber
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
    }

    render() {
        return (

            <div>
                <h2 className="text-center">Add Credit Card</h2>
                <form>
                    <div className="col-sm-3">
                        <label>Name: *</label>
                    </div>
                    <div className="col-sm-9">
                        <div className={"form-group" + this.validateClass('nameOnCard')}>
                            <input className="form-control"
                                   required={true}
                                   type="text"
                                   name="nameOnCard"
                                   id="nameOnCard"
                                   placeholder="please write name on card"
                                   data-vlength="5,30"
                                   ref="nameOnCard"
                                   onBlur={this.validateField}
                                   value={this.state.creditCard.nameOnCard}
                                   onChange={(e) => this.onChange(e)}
                                   maxLength="30"
                                   minLength="5"
                            />
                            <UncontrolledTooltip placement="right" target="nameOnCard" delay={0}>
                                {this.validateMessage("nameOnCard")}
                            </UncontrolledTooltip>
                            <div className="danger">
                            <span
                                className="label label-danger">{(this.state.error['nameOnCard'] === undefined ? '' : (this.state.error['nameOnCard'].message))}</span>
                            </div>
                        </div>

                    </div>

                    <div className="col-sm-3">
                        <label>Balance:*</label>
                    </div>
                    <div className="col-sm-9">
                        <div className={"form-group" + this.validateClass('balance')}>
                            <input type="text"
                                   id="balance"
                                   placeholder="please write balance"
                                   required={true}
                                   name="balance"
                                   className="form-control"
                                   ref="balance"
                                   value={this.state.creditCard.balance}
                                   onChange={(e) => this.onChange(e)}
                                   minLength="1"
                                   onBlur={() => this.validateField({
                                       target: {
                                           id: "balance",
                                           dataset: {vdata: "decimal"},
                                           value: this.state.creditCard.balance
                                       }
                                   })}
                            />
                            <UncontrolledTooltip placement="right" target="balance" delay={0}>
                                {this.validateMessage("balance")}
                            </UncontrolledTooltip>
                            <div className="danger">
                                <span
                                    className="label label-danger">{(this.state.error['balance'] === undefined ? '' : (this.state.error['balance'].message))}</span>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-3">
                        <label>Card Number:*</label>
                    </div>
                    <div className="col-sm-9">
                        <div className={"form-group" + this.validateClass('cardNumber')}>
                            <input type="text"
                                   id="cardNumber"
                                   placeholder="please write card number"
                                   required={true}
                                   name="cardNumber"
                                   className="form-control"
                                   ref="cardNumber"
                                   value={this.state.creditCard.cardNumber}
                                   maxLength="19"
                                   onChange={(e) => this.onChange(e)}
                                   onBlur={() => this.validateField({
                                       target: {
                                           id: "cardNumber",
                                           dataset: {vdata: "credit_card"},
                                           value: this.state.creditCard.cardNumber
                                       }
                                   })}
                            />
                            <UncontrolledTooltip placement="right" target="cardNumber" delay={0}>
                                {this.validateMessage("cardNumber")}
                            </UncontrolledTooltip>
                            <div className="danger">
                                <span
                                    className="label label-danger">{(this.state.error['cardNumber'] === undefined ? '' : (this.state.error['cardNumber'].message))}</span>
                            </div>
                        </div>
                    </div>

                    <div className="danger">
                        <span className="label label-danger">{this.state.errorMessages}</span>
                    </div>

                    <div className='col-sm-2'>
                        <button type="button" data-placement="bottom"
                                className="btn btn-success"
                                onClick={this.saveCreditCard}>Save
                        </button>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddCreditCardComponent;