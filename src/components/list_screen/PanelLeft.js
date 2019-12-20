import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize';

class PanelLeft extends React.Component {

    

    addContainer = () =>
    {
        

        var container = {
            "type": "container",
            "value": null,
            "style": 
                {
                    "posX": 0,
                    "posY": 0,
                    "width": '200px',
                    "height": '100px',
                    "fontSize": 15,
                    "fontColor" : '#636363',
                    "backgroundColor": "#FFFFFF",
                    "borderColor": "#000000",
                    "borderWidth": 1,
                    "borderRadius": 1
                }
            
        };

        this.props.control_list.push(container);
        this.props.updateState(this.props.control_list);
        console.log(this.props);
    }

    addLabel = () =>
    {

        var label = {
            "type": "label",
            "value": "Prompt for Input",
            "style": 
                {
                    "posX": 0,
                    "posY": 0,
                    "width": '200px',
                    "height": '25px',
                    "fontSize": 15,
                    "fontColor" : '#636363',
                    "backgroundColor": "#FFFFFF",
                    "borderColor": "#000000",
                    "borderWidth": 0,
                    "borderRadius": 0
                }
            
        };

        this.props.control_list.push(label);
        this.props.updateState(this.props.control_list);
        console.log(this.props);
    }

    addButton = () =>
    {


        var button = {
            "type": "button",
            "value": "Submit",
            "style": 
                {
                    "posX": 0,
                    "posY": 0,
                    "width": '100px',
                    "height": '30px',
                    "fontSize": 15,
                    "fontColor" : '#000000',
                    "backgroundColor": "#e1e1e1",
                    "borderColor": "#000000",
                    "borderWidth": 1,
                    "borderRadius": 1
                }
            
        };

        this.props.control_list.push(button);
        this.props.updateState(this.props.control_list);
        console.log(this.props);
    }

    addTextfield = () =>
    {

        var textfield = {
            "type": "textfield",
            "value": "input",
            "style": 
                {
                    "posX": 0,
                    "posY": 0,
                    "width": "100px",
                    "height": '30px',
                    "fontSize": 15,
                    "fontColor" : '#e1e1e1',
                    "backgroundColor": "#FFFFFF",
                    "borderColor": "#000000",
                    "borderWidth": 0,
                    "borderRadius": 0
                }
            
        };

        this.props.control_list.push(textfield);
        this.props.updateState(this.props.control_list);
        console.log(this.props);
    }

    save = () =>
    {
        var data = JSON.parse(JSON.stringify(this.props.control_list));
    
        const fireStore = getFirestore();

        console.log(this.props);
        fireStore.collection('WireFramers')
            .doc(this.props.WireFramer.id)
            .update({
                list: data,
                DimX : this.props.DimX,
                DimY : this.props.DimY
            });
        this.props.disableSave();
    }

    close = () =>
    {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="card-panel yellow lighten-5" id = "leftPanel">
                <table>
                <tr> <td>
                <div>
                    <a class="btn-floating waves-effect waves-light red" disabled ={this.props.enableZoomIn}><i class="material-icons"  onClick = {this.props.updateZoomIn}>zoom_in</i></a>
                    <a class="btn-floating waves-effect waves-light red" disabled ={this.props.enableZoomOut}><i class="material-icons"  onClick = {this.props.updateZoomOut}>zoom_out</i></a>
                
                    {/* disable save */}
                    <button class="btn waves-effect waves-light red" type="submit" name="action" disabled = {this.props.enableSave} onClick = {this.save}>save</button>

                    {
                    this.props.enableSave?
                    <button class="btn waves-effect waves-light red" type="submit" name="action" onClick = {this.close}>close</button>
                    :
                    <Modal header="No Save?" actions={<React.Fragment><Button onClick={this.close} waves="green" modal="close" flat>YES </Button><Button waves="green" modal="close" flat>NO </Button></React.Fragment>} trigger={<div class="btn waves-effect waves-light red">CLOSE
                    </div>}>
                        <p>
                            Are you sure you want to close without saving? <br></br>
                            Your WireFramer will not be save.
                        </p>
                    </Modal>
                    }

                </div>
                </td></tr>
                <tr> <td>
                    Current Scale: {this.props.scale*100 + '%'}
                </td></tr>
                </table>
                <br></br>
                <div style={{textAlign:"center", margin: 0}}>

                    <svg width="200" height="100" onClick = {this.addContainer} style={{ cursor: 'pointer'}}>
                        <rect width="200" height="100" id = "rect"></rect>
                    </svg>
                    <p style={{textAlign:"center", margin: -10}}>Container</p>

                    <br></br>
                    <br></br>

                    <label onClick = {this.addLabel} style={{ cursor: 'pointer', fontSize: 15, color : '#636363'}}>
                        Prompt for Input
                    </label>
                    <p style={{textAlign:"center", margin: 0}}>Lable</p>

                    <br></br>
                    <br></br>

                    <button onClick = {this.addButton} 
                    style={{ cursor: 'pointer', width : 100, height : 30, fontSize: 17, borderColor: "#000000",borderWidth: 1, backgroundColor: "#e1e1e1",}}>
                        Submit
                    </button>
                    <p style={{textAlign:"center", margin: 0}}>Button</p>

                    <br></br>

                    <input type="text"  value = "" placeholder="input" 
                           style = {{width: 150, cursor: 'pointer', fontSize: 17}}onClick = {this.addTextfield}/>
                    <p style={{textAlign:"center", margin: 0}}>TextField</p>


                </div>
            </div>

        )
    }
}
export default withRouter(PanelLeft);

// const mapStateToProps = (state, ownProps) => {
//     const WireFramer = ownProps.WireFramer;
//     return {
//         WireFramer,
//         auth: state.firebase.auth,
//     };
// };

// const PanelLeftWithRoutter = withRouter(PanelLeft);

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'WireFramers' },
//     ]),
// )(PanelLeft);