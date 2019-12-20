import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import { getFirestore } from 'redux-firestore';


class ItemsList extends React.Component {

    state = {
        taskInc: false,
        dueDateInc: false,
        compInc: false
    }

    sortTask = () => {
        var itemList = JSON.parse(JSON.stringify(this.props.todoList.items));
        if (this.state.taskInc) {
            this.setState({ taskInc: false });
            var n = itemList.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (itemList[j].description < itemList[j + 1].description) {
                        var t = itemList[j];
                        itemList[j] = itemList[j + 1];
                        itemList[j + 1] = t;

                        var k = itemList[j].key;
                        itemList[j].key = itemList[j + 1].key;
                        itemList[j + 1].key = k;

                        var k = itemList[j].id;
                        itemList[j].id = itemList[j + 1].id;
                        itemList[j + 1].id = k;

                    }
                }
            }
        }
        else {
            this.setState({ taskInc: true });
            var n = itemList.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (itemList[j].description > itemList[j + 1].description) {
                        var t = itemList[j];
                        itemList[j] = itemList[j + 1];
                        itemList[j + 1] = t;

                        var k = itemList[j].key;
                        itemList[j].key = itemList[j + 1].key;
                        itemList[j + 1].key = k;

                        var k = itemList[j].id;
                        itemList[j].id = itemList[j + 1].id;
                        itemList[j + 1].id = k;
                    }
                }
            }
        }
        const fireStore = getFirestore();
        fireStore.collection('todoLists')
            .doc(this.props.todoList.id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: itemList

            });

    }

    sortDueDate = () => {
        var itemList = JSON.parse(JSON.stringify(this.props.todoList.items));
        if (this.state.taskInc) {
            this.setState({ taskInc: false });
            var n = itemList.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (itemList[j].due_date < itemList[j + 1].due_date) {
                        var t = itemList[j];
                        itemList[j] = itemList[j + 1];
                        itemList[j + 1] = t;

                        var k = itemList[j].key;
                        itemList[j].key = itemList[j + 1].key;
                        itemList[j + 1].key = k;

                        var k = itemList[j].id;
                        itemList[j].id = itemList[j + 1].id;
                        itemList[j + 1].id = k;

                    }
                }
            }
        }
        else {
            this.setState({ taskInc: true });
            var n = itemList.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (itemList[j].due_date > itemList[j + 1].due_date) {
                        var t = itemList[j];
                        itemList[j] = itemList[j + 1];
                        itemList[j + 1] = t;

                        var k = itemList[j].key;
                        itemList[j].key = itemList[j + 1].key;
                        itemList[j + 1].key = k;

                        var k = itemList[j].id;
                        itemList[j].id = itemList[j + 1].id;
                        itemList[j + 1].id = k;
                    }
                }
            }
        }
        const fireStore = getFirestore();
        fireStore.collection('todoLists')
            .doc(this.props.todoList.id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: itemList

            });
    }


    sortStatae = () => {
        var itemList = JSON.parse(JSON.stringify(this.props.todoList.items));
        if (this.state.taskInc) {
            this.setState({ taskInc: false });
            var n = itemList.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (itemList[j].completed < itemList[j + 1].completed) {
                        var t = itemList[j];
                        itemList[j] = itemList[j + 1];
                        itemList[j + 1] = t;

                        var k = itemList[j].key;
                        itemList[j].key = itemList[j + 1].key;
                        itemList[j + 1].key = k;

                        var k = itemList[j].id;
                        itemList[j].id = itemList[j + 1].id;
                        itemList[j + 1].id = k;

                    }
                }
            }
        }
        else {
            this.setState({ taskInc: true });
            var n = itemList.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (itemList[j].completed > itemList[j + 1].completed) {
                        var t = itemList[j];
                        itemList[j] = itemList[j + 1];
                        itemList[j + 1] = t;

                        var k = itemList[j].key;
                        itemList[j].key = itemList[j + 1].key;
                        itemList[j + 1].key = k;

                        var k = itemList[j].id;
                        itemList[j].id = itemList[j + 1].id;
                        itemList[j + 1].id = k;
                    }
                }
            }
        }
        const fireStore = getFirestore();
        fireStore.collection('todoLists')
            .doc(this.props.todoList.id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: itemList

            });
    }

    addNewItem = () => {
        // console.log(this.props);

        var data = JSON.parse(JSON.stringify(this.props.todoList.items));

        // console.log(data);

        var newItem = {
            assigned_to: 'None',
            completed: false,
            due_date: 'mm/dd/yyyy',
            description: 'None',
            id: data.length,
            key: data.length
        }
        data.push(newItem);
        console.log(data);
        const fireStore = getFirestore();
        fireStore.collection('todoLists')
            .doc(this.props.todoList.id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: data

            });

    }


    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <table className='highlight'>
                    <thead>
                        <tr>
                            <th class="hov" onClick={this.sortTask} style={{ cursor: 'pointer', fontSize: '30px' }}>Task</th>
                            <th class="hov" onClick={this.sortDueDate} style={{ cursor: 'pointer', fontSize: '30px' }}>Due Date</th>
                            <th class="hov" onClick={this.sortStatae} style={{ cursor: 'pointer', fontSize: '30px' }}>Status</th>
                            <th>&emsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map(function (item, index) {
                            item.id = item.key;
                            return (

                                <ItemCard todoList={todoList} key={index} index={index} item={item} />

                            );
                        })
                        }
                        <tr onClick={this.addNewItem} style={{ cursor: 'pointer', fontSize: '20px' }}>
                            {/* <td></td>
                            <td colspan='3' align='right'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Add New Item</td> */}
                            <td colspan="4" id="add_new">Add New Item</td>
                        </tr>
                    </tbody>

                </table>



            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);