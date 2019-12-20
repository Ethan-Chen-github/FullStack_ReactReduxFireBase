import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

import { getFirestore } from 'redux-firestore';

import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Modal, Button } from 'react-materialize';

class EditScreen extends Component {
    // state = {
    //     name: '',
    //     owner: '',
    // }

    // handleChange = (e) => {

    //     const { target } = e;
    //     this.setState(state => ({
    //         ...state,
    //         [target.id]: target.value,
    //     }));

    //     const fireStore = getFirestore();
    //     // fireStore.collection('todoLists').where('id', '==', this.props.todoList.id).get().then(function (querySnapshot) {
    //     //     querySnapshot.forEach(function (doc) {
    //     //         console.log("deleting " + doc.id);
    //     //         fireStore.collection('todoLists').doc(doc.id).update({ name: 'test1' });
    //     //     })
    //     // });
    //     // fireStore.collection('todoLists').add(
    //     //     { name: 'puta' }
    //     // )
    //     // fireStore.collection('todoLists').where('id', '==', this.props.todoList.id)
    //     //     .get()
    //     //     .then(function (querySnapshot) {
    //     //         console.log(querySnapshot);
    //     //         querySnapshot.forEach(function (doc) {
    //     //             console.log(doc.id, " => ", doc.data());
    //     //             // Build doc ref from doc.id
    //     //             fireStore.collection("todoLists").doc(doc.id).update({ name: 'test' });
    //     //         });
    //     //     })
    //     fireStore.collection('todoLists')
    //         .doc(this.props.todoList.id)
    //         // .where('id', '==', this.props.todoList.id)
    //         .update({
    //             name: document.getElementById('name').value,
    //             owner: document.getElementById('owner').value

    //         });
    //     // .get()
    //     // .then(function (querySnapshot) {
    //     //     console.log(querySnapshot);
    //     //     querySnapshot.forEach(function (doc) {
    //     //         console.log(doc.id, " => ", doc.data());
    //     //         // Build doc ref from doc.id
    //     //         fireStore.collection("todoLists").doc(doc.id).update({ name: 'test' });
    //     //     });
    //     // })

    // }

    // delete = () => {
    //     const fireStore = getFirestore();
    //     fireStore.collection('WireFramers').doc(this.props.WireFramers.id).delete();
    //     // console.log(this.props);
    //     this.props.history.push("/");
    // }

    render() {
        const auth = this.props.auth;
        const WireFramer = this.props.WireFramer;
        console.log(this.props);
        if (!auth.uid) {
            return <Redirect to="/" />;
        }


        if (!WireFramer)
            return <React.Fragment />

        return (
            <div >
                <div className="card-panel yellow lighten-5">

                    <h5 className="grey-text text-darken-3">WireFramer</h5>

                    {/* <div className="input-field">
                        <label className="active" htmlFor="email">Name</label>
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={WireFramer.name} />
                    </div> */}
                    <table>
                        <tr>
                            <td>
                                
                            </td>

                            <td>

                            </td>
                            <td>


                            </td>
                        </tr>
                    </table>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { WireFramers } = state.firestore.data;
    console.log(state.firestore);
    const WireFramer = WireFramers ? WireFramers[id] : null;
    // todoList.id = id;
    if (WireFramer) {
        WireFramer.id = id;
    }

    return {
        WireFramer,
        auth: state.firebase.auth,
    };
};

const EditScreenWithRoutter = withRouter(EditScreen);

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'WireFramer' },
    ]),
)(EditScreen);
