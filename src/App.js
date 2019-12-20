import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Navbar from './components/navbar/Navbar.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';

// import EditScreen from './components/EDIT_SCREEN/EditScreen.js'

//  OLD SCREENS
import ListScreen from './components/list_screen/ListScreen.js';
import ItemScreen from './components/item_screen/ItemScreen.js'
import DatabaseTester from './test/DatabaseTester'

import { getFirestore } from 'redux-firestore';

import { thisTypeAnnotation } from '@babel/types';
import { firestore } from 'firebase';

class App extends Component {

  // isAdmin = async (auth) => {
  //   const fireStore = getFirestore();

  //   const uid = auth.uid;

  //   if (uid)
  //   // const docRef = await fireStore.collection('users').doc(this.props.uid);

 



//   async componentDidMount (){
//     const fireStore = getFirestore();
//     console.log(this.props.uid)

//   }

 state = {
    admin : null
  }


  render() {
    const { auth } = this.props;
    
    console.log(auth);
    

    if (auth.isLoaded) {
      // var bool = null;

      if (this.state.admin == null && auth.uid != undefined)
      {
        const fireStore = getFirestore();
      
        var doc =  fireStore.collection('users').doc(auth.uid);

        // doc.get().then((doc) => {this.setState({admin: doc.data().isAdmin})});

        doc.get().then((doc) => {this.setState({admin: doc.data().isAdmin})});
        
      }
      
      
      return (

        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              {this.state.admin && <Route path="/databaseTester" component={DatabaseTester} />}
              <Route path="/register" component={RegisterScreen} />
              {!this.props.auth.uid && <Route component={LoginScreen} />}
              <Route exact path="/" component={HomeScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route exact path="/WireFramers/:id" component={ListScreen} />


              {/* <Route exact path="/todoList/:id" component={ListScreen} />
              <Route path="/todoList/:id/item/:index" component={ItemScreen} /> */}
              <Route path="/:any" component={HomeScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);