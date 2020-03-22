import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListCreditCardComponent from "./component/user/ListCreditCardComponent";
import AddCreditCardComponent from "./component/user/AddCreditCardComponent";
import EditCreditCardComponent from "./component/user/EditCreditCardComponent";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <h1 className="text-center" style={style}>Credit Card Application</h1>
                  <Switch>
                      <Route path="/" exact component={ListCreditCardComponent} />
                      <Route path="/creditcards" component={ListCreditCardComponent} />
                      <Route path="/add-creditcard" component={AddCreditCardComponent} />
                      <Route path="/edit-creditcard" component={EditCreditCardComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;
