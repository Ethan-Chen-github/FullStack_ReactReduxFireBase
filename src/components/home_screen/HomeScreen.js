import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

import { Link } from 'react-router-dom';
import TodoListCard from '../home_screen/TodoListCard';

class HomeScreen extends Component {

    handleNewList = async () => {
        const fireStore = getFirestore();


        const docRef = await fireStore.collection('WireFramers').add
            (
                {owner: this.props.auth.email,name: "unknown", list: [], "DimX" : 400, "DimY" : 400, time: new Date().getTime() }
            )
        // alert(docRef.id);
        console.log(this.props);
        console.log(this.props.WireFramers);
        this.props.history.push("/WireFramers/" + docRef.id);




    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8" >
                        <div class="z-depth-2">
                            <div className="banner" >
                                WireFramers<br />
                                TM
                            </div>
                        </div>

                        <div className="home_new_list_container">
                            <button className="home_new_list_button" onClick={this.handleNewList} class="waves-effect waves-light btn-large">
                                Create a WireFramers
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'WireFramers' },
    ]),
)(HomeScreen);