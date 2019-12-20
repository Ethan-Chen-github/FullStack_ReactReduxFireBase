import React from 'react';
import { Button, Icon, Modal } from 'react-materialize';

import { getFirestore } from 'redux-firestore';

class TodoListCard extends React.Component {

    delete = () => {
        const fireStore = getFirestore();
        fireStore.collection('WireFramers').doc(this.props.WireFramers.id).delete();
    }

    render() {
        const { WireFramers } = this.props;
        console.log("TodoListCard, todoList.id: " + WireFramers.id);
        return (
            // <div className="card z-depth-0 todo-list-link">
            //     <div className="card-content grey-text text-darken-3">
            //         <span className="card-title">{todoList.name}</span>
            //     </div>
            // </div>
            <li class="collection-item avatar" style= {{paddingLeft:20}}>
                <br></br>
                <p>{WireFramers.name}</p>
                <a href="#!" class="secondary-content" className = "top25">
                    {/* <Button floating icon={<Icon>clear</Icon>} className="red" onClick={event => { event.preventDefault(); this.delete() }}/> */}
                    <Modal header="Delete Item?" actions={<React.Fragment><Button onClick={event => { event.preventDefault(); this.delete() }} waves="green" modal="close" flat>YES </Button><Button onClick={event => { event.preventDefault()}} waves="green" modal="close" flat>NO </Button></React.Fragment>} 
                    trigger={<Button floating icon={<Icon>clear</Icon>}></Button>}>
                        <p>
                            Are you sure you want to delete? <br></br>
                            Your WireFramer will not retrievable.
                        </p>
                    </Modal>
                </a>
                
            </li>
        );
    }
}
export default TodoListCard;