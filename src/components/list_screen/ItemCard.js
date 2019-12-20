import React from 'react';
// import { useHistory } from "react-router-dom";
import TodoListCard from '../home_screen/TodoListCard';

import { Link } from 'react-router-dom';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { withRouter } from 'react-router-dom';

import { Button, Icon } from 'react-materialize';


class ItemCard extends React.Component {


    isComplete = (bool) => {
        if (bool == true) {
            return 'Complete'
        }
        else {
            return "Pending"
        }
    }

    // ListScreen = () =>{
    //     <Link to={'/todoList/' + todoList.id} key={todoList.id}>
    //     <TodoListCard todoList={todoList} />
    // </Link>
    // }

    goItem = () => {
        // let history = useHistory();
        const fireStore = getFirestore();
        console.log(this.props);
        //alert(this.props.todoList.id);
        this.props.history.push("/todoList/" + this.props.todoList.id + "/item/" + this.props.index)
        // this.props.history.push("/todoList/" + TodoListCard.id + "/item/" + this.props.index);
    }

    sortTask() {

    }

    moveUp = () => {
        // console.log(this.props);
        var index = this.props.index;
        var list = JSON.parse(JSON.stringify(this.props.todoList.items));

        // console.log(list);
        if (index != 0) {
            //alert(index + ' ' + length);
            var t = list[index];
            list[index] = list[index - 1];
            list[index - 1] = t;

            var i = list[index].key;
            list[index].key = list[index - 1].key;
            list[index - 1].key = i;

            var j = list[index].id;
            list[index].id = list[index - 1].id;
            list[index - 1].id = j;
        }
        // console.log(list);

        const fireStore = getFirestore();
        fireStore.collection('todoLists')
            .doc(this.props.todoList.id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: list

            });
    }

    moveDown = () => {
        // console.log(this.props);
        var index = this.props.index;
        var list = JSON.parse(JSON.stringify(this.props.todoList.items));

        // console.log(list);
        if (index != list.length - 1) {
            //alert(index + ' ' + length);
            var t = list[index];
            list[index] = list[index + 1];
            list[index + 1] = t;

            var i = list[index].key;
            list[index].key = list[index + 1].key;
            list[index + 1].key = i;

            var j = list[index].id;
            list[index].id = list[index + 1].id;
            list[index + 1].id = j;
        }
        // console.log(list);

        const fireStore = getFirestore();
        fireStore.collection('todoLists')
            .doc(this.props.todoList.id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: list

            });
    }

    delete = () => {
        // console.log(this.props);
        var index = this.props.index;
        var list = JSON.parse(JSON.stringify(this.props.todoList.items));


        list.splice(index, 1);
        for (var i = index; i < list.length; i++) {
            list[i].key -= 1;
            list[i].id -= 1;
        }

        const fireStore = getFirestore();
        fireStore.collection('todoLists')
            .doc(this.props.todoList.id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: list

            });
    }


    Upid = () => {
        var index = this.props.index;
        if (index == 0) {
            //alert('color');
            return 'grey';
        }
        else {
            return 'yellow';
        }
    }

    Downid = () => {
        var index = this.props.index;
        var length = this.props.todoList.items.length;
        if (index == length - 1) {
            //alert('color');
            return 'grey';
        }
        else {
            return 'blue';
        }
    }

    render() {
        const { item } = this.props;
        return (
            // <div className="card z-depth-0 todo-list-link pink-lighten-3">
            //     <div className="card-content grey-text text-darken-3">
            //         <span className="card-title">{item.description}</span>
            //         <span className='card-title'>{item.assigned_to}</span>
            //         <span className='card-title'>{item.completed}</span>
            //         <span className='card-title'>{item.due_date}</span>
            //     </div>
            // </div>
            // <div className="card z-depth-0 todo-list-link pink-lighten-3">
            <tr style={{ cursor: 'pointer' }} className="card-content grey-text text-darken-3" onClick={this.goItem}>
                {/* <Link to={'/todoList/' + item.id} key={todoList.id}> */}


                < td className="card-title" > {item.description}
                    < br ></br >
                    Assigned_to: {item.assigned_to}
                </td >
                < td className='card-title' > {item.due_date}</td >
                <td className='card-title'>{this.isComplete(item.completed)}</td>

                <td width="5%">
                    <div >
                        {/* <a class="btn-floating btn-large waves-effect waves-light red" onClick={event => { event.stopPropagation(); this.moveUp(); }}>
                        <i class="material-icons">arrow_upward
                    </i></a>
                    <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">arrow_downward</i></a>
                    <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">clear</i></a> */}


                        <Button
                            floating
                            fab={{ direction: 'left' }}
                            className="red"
                            large
                            icon={<Icon>edit</Icon>}
                            id="td-container"

                        >
                            <Button floating icon={<Icon>clear</Icon>} className="red" onClick={event => { event.stopPropagation(); this.delete() }} />
                            <Button floating icon={<Icon>arrow_downward</Icon>} className={this.Downid()} onClick={event => { event.stopPropagation(); this.moveDown() }} />
                            <Button floating icon={<Icon>arrow_upward</Icon>} className={this.Upid()} onClick={event => { event.stopPropagation(); this.moveUp() }} />
                        </Button>
                    </div>
                </td>
            </tr >
            // </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         auth: state.firebase.auth
//     };
// };

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'todoLists' },
//     ]),
// )(ItemCard);

export default withRouter(ItemCard);