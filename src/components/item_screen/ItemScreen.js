import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
// import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

import { getFirestore } from 'redux-firestore';
import { withRouter } from 'react-router-dom';


class ItemScreen extends Component {

    // componentDidMount() {
    //     $(document).ready(function () {
    //         $('.fixed-action-btn').floatingActionButton();
    //     })
    // }

    state = {
        current_item: []
    }


    async componentDidMount() {

        const script = document.createElement("script");


        const fireStore = getFirestore();
        const { id, index } = this.props.match.params;
        let b = await fireStore.collection('todoLists')
            .doc(id).get();
        let data = b.data();
        console.log(data)
        // let d = c.name
        // console.log(d)
        // return d.toString()
        document.getElementById('item_description_textfield').value = data.items[index].description
        document.getElementById('item_assigned_to_textfield').value = data.items[index].assigned_to
        document.getElementById('item_due_date_picker').value = data.items[index].due_date

        if (data.items[index].completed) {
            document.getElementById('item_check_box').checked = 'checked'
        }

        // this.state.current_item = data.items
        // this.state({current_item: data.items})
        this.setState({ current_item: data.items });

    }


    // async description() {
    //     const fireStore = getFirestore();
    //     const { id, index } = this.props.match.params;
    //     let b = await fireStore.collection('todoLists')
    //         .doc(id).get();
    //     let c = b.data();
    //     // let d = c.name
    //     // console.log(d)
    //     // return d.toString()
    //     document.getElementById('item_description_textfield').value = c.name
    // }

    async update() {
        // console.log(this.state.current_item);
        const { id, index } = this.props.match.params;
        // let data = this.state.current_item;
        var data = JSON.parse(JSON.stringify(this.state.current_item));
        console.log(data);
        data[index].assigned_to = document.getElementById('item_assigned_to_textfield').value;
        data[index].description = document.getElementById('item_description_textfield').value;
        data[index].due_date = document.getElementById('item_due_date_picker').value;

        if (document.getElementById('item_check_box').checked) {
            data[index].completed = true;
        }
        else {
            data[index].completed = false;
        }

        console.log(data);

        const fireStore = getFirestore();
        await fireStore.collection('todoLists')
            .doc(id)
            // .where('id', '==', this.props.todoList.id)
            .update({
                items: data

            });
        this.props.history.push("/todoList/" + id)
    }

    goList() {
        const { id, index } = this.props.match.params;
        this.props.history.push("/todoList/" + id)
    }


    render() {
        return (
            <div class="container">
                <br></br>
                <div id="todo_edit" class="card-panel yellow lighten-5">
                    {/* <div class="fixed-action-btn">
                    <a class="btn-floating btn-large red">
                        <i class="large material-icons">mode_edit</i>
                    </a>
                    <ul>
                        <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                        <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                        <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                        <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                    </ul>
                </div> */}
                    <div id="item_heading">Item</div>
                    <div id="item_form_container">
                        <input placeholder="Description" id="item_description_textfield" type="text" class="validate" />
                        <label for="Description">Description</label>
                        <input placeholder="Assign To" id="item_assigned_to_textfield" type="text" class="validate" />
                        <label for="Assign To">Assign To</label>
                        <input placeholder="Due Date" id="item_due_date_picker" type="date" class="validate" />
                        <label for="Due Date">Due Date</label>

                        <br></br>
                        <br></br>
                        <label>
                            <input type="checkbox" id='item_check_box' />
                            <span>Complete</span>
                        </label>
                        <br></br>
                        <br></br>
                        <div>
                            <button onClick={() => this.update()} class="btn waves-effect waves-light" type="submit" name="action" >Submit
                        <i class="material-icons right">send</i>
                            </button>
                            <button onClick={() => this.goList()} class="btn waves-effect waves-light" type="submit" name="action">Cancel
                        <i class="material-icons right">close</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ItemScreen);

// const mapStateToProps = (state, ownProps) => {
//     const { id } = ownProps.match.params;
//     const { todoLists } = state.firestore.data;
//     console.log(state.firestore);
//     const todoList = todoLists ? todoLists[id] : null;
//     todoList.id = id;

//     return {
//         todoList,
//         auth: state.firebase.auth,
//     };
// };


// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'todoLists' },
//     ]),
// )(ItemScreen);