import axios from 'axios';

const CREDIT_CARDS = 'creditCards';

const API_BASE_URL = 'http://localhost:8080/api/v1/';

class ApiService {

    fetchCreditCards() {
        return axios.get(API_BASE_URL + CREDIT_CARDS);
    }

    fetchCreditCardById(creditCardId) {
        return axios.get(API_BASE_URL + CREDIT_CARDS + '/' + creditCardId);
    }

    deleteCreditCard(creditCardId) {
        return axios.delete(API_BASE_URL + CREDIT_CARDS + '/' + creditCardId);
    }

    addCreditCard(creditCard) {
        return axios.post("" + API_BASE_URL + CREDIT_CARDS, creditCard);
    }

    editCreditCard(creditCard) {
        return axios.put(API_BASE_URL + CREDIT_CARDS + '/' + creditCard.id, creditCard);
    }

}

export default new ApiService();