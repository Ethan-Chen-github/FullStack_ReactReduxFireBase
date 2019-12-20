import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

import { Modal, Button } from 'react-materialize';

class TodoListLinks extends React.Component {

    updatetime(id) {
        const fireStore = getFirestore();

        fireStore.collection('WireFramers')
            .doc(id)
            .update({
                time: new Date().getTime()
            });
    }

    filterList(WireFramers){
        return WireFramers.owner = this.props.auth.email;
    }

   

    render() {
        var WireFramers = this.props.WireFramers;


        var owner = this.props.auth.email;
        // WireFramers = WireFramers.filter(WireFramers)

        console.log("below is WireFramers for current users")
        console.log(WireFramers);
        console.log(owner);
        
        //.filter(WireFramers=> WireFramers)

        return (
            <div className="todo-lists section">
                <br></br>
                <br></br>
                {WireFramers && WireFramers.filter(WireFramers=> WireFramers.owner == owner).map(WireFramers => (
                    <Link to={'/WireFramers/' + WireFramers.id} key={WireFramers.id} onClick={() => this.updatetime(WireFramers.id)}>
                         <ul class="collection">
                            <TodoListCard WireFramers={WireFramers} />
                        </ul>
                    </Link>
                    
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    if (state.firestore.ordered.WireFramers)
        state.firestore.ordered.WireFramers.sort(function (a, b) {
            var x = a.time;
            var y = b.time;
            return x < y ? 1 : x > y ? -1 : 0;
        });


    return {
        WireFramers: state.firestore.ordered.WireFramers,

        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);