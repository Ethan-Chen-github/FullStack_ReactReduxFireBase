import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestTodoListData.json'
import { getFirestore } from 'redux-firestore';
import { firestore } from 'firebase';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('WireFramers').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('WireFramers').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        // there are auth under the
        // owner is auth's email
        // is the same and items -> list
        // however, reset for each user.

        console.log(this.props);

        const fireStore = getFirestore();

        const { auth } = this.props;


        fireStore.collection('users').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("deleting " + doc.data().email);
                // for(var i = 0; i < 3; i++)
                // {
                //     console.log(i);
                // }

                todoJson.WireFramers.forEach(todoListJson => {
                    fireStore.collection('WireFramers').add({
                        name: todoListJson.name,
                        owner: doc.data().email,
                        list: todoListJson.list,
                        time: new Date().getTime(),
                        DimX : todoListJson.DimX,
                        DimY : todoListJson.DimY
                    }).then(() => {
                        console.log("DATABASE RESET");
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            })
        });

        // if (auth.isLoaded) {
        //     var doc =  fireStore.collection('users').get().then(
        //         (doc) => {console.log(doc.data())}
        //     )
        // }
      



        // doc.get().then((doc) => {this.setState({admin: doc.data().isAdmin})});
        // const fireStore = getFirestore();
        // todoJson.todoLists.forEach(todoListJson => {
        //     fireStore.collection('todoLists').add({
        //         name: todoListJson.name,
        //         owner: todoListJson.owner,
        //         items: todoListJson.items,
        //         time: new Date().getTime()
        //     }).then(() => {
        //         console.log("DATABASE RESET");
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);