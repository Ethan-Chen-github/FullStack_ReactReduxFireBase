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
import PanelLeft from './PanelLeft.js';
import Diagram from './Diagram.js';
import Property from './Property.js';
import Dimension from "./Dimension.js";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";



class ListScreen extends Component {
    // state = {
    //     name: '',
    //     owner: '',
    // }
    handleChange = (e) => {
        const fireStore = getFirestore();
        fireStore.collection('WireFramers')
            .doc(this.props.WireFramer.id)
            .update({
                name: document.getElementById('name').value

            });
    }

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
    // constructor(props){
    //     super(props);
    //     if(this.props.WireFramer)
    //     this.state = {control_list: this.props.WireFramer.list};
    // }
    state = {
        control_list : [],
        current_select:  null,
        DimX : 0,
        DimY : 0,

        showFontColor:false,
        showBorderColor: false,
        showBackgroundColor: false,

        scale: 1.0,

        enableSave : true,
        enableZoomIn : false,
        enableZoomOut :false,

        disableUpdate : true,


    }

    enableUpdate()
    {
        this.setState({disableUpdate : false});
    }

    disableSave()
    {
        this.setState({enableSave : true});
    }
    
    escFunction = (event) => {
        if (event.keyCode === 46) 
        {
            if(this.state.current_select != null)
            {
                var control_list = JSON.parse(JSON.stringify(this.state.control_list));
                control_list.splice(this.state.current_select.key,1);
                this.setState({current_select: null ,
                            control_list: control_list,
                            enableSave: false});
            }
        }
        else if (event.keyCode === 68 && event.ctrlKey) {
            if(this.state.current_select != null)
            {
                var control_list = JSON.parse(JSON.stringify(this.state.control_list));
                var copyControl = JSON.parse(JSON.stringify(this.state.current_select));

                var width = this.state.current_select.style.width;
                var height = this.state.current_select.style.height;

                if (typeof width === 'string')
                {
                    width = Number(this.state.current_select.style.width.slice(0,-2));
                }
                if (typeof height === 'string')
                {
                    height = Number(this.state.current_select.style.height.slice(0,-2));
                }
                
                // var width = Number(this.state.current_select.style.width.slice(0,-2));
                // var height = Number(this.state.current_select.style.height.slice(0,-2));
                if (copyControl.style.posX + 100 + width> this.state.DimX)
                {
                    copyControl.style.posX = this.state.DimX - width;
                }
                else
                {
                    copyControl.style.posX += 100;
                }
                if (copyControl.style.posY + 100 + height > this.state.DimY)
                {
                    copyControl.style.posY = this.state.DimY - height;
                }
                else
                {
                    copyControl.style.posY += 100;
                }




                control_list.push(copyControl);
                this.setState({current_select: copyControl ,
                    control_list: control_list,
                    enableSave: false});
            }
        }
    }

    componentDidMount(){
        if(this.props.WireFramer)
            this.setState({control_list: this.props.WireFramer.list,
                            DimX : this.props.WireFramer.DimX,
                            DimY : this.props.WireFramer.DimY});
            document.addEventListener("keydown", this.escFunction, false);
    }

    componentDidUpdate(prevProps){
        console.log(prevProps);
        console.log(this.props.WireFramer);
        if(!prevProps.WireFramer && this.props.WireFramer != null )
            this.setState({control_list: this.props.WireFramer.list,
                        DimX : this.props.WireFramer.DimX,
                        DimY : this.props.WireFramer.DimY});
            document.addEventListener("keydown", this.escFunction, false);
    }

    // start
    updateState(control)
    {
        this.setState({control_list: control,
            enableSave: false});
    }

    updateDimState(event)
    {
        event.preventDefault();

        let width = event.target.dimX.value;
        let height = event.target.dimY.value;
        var control_list = JSON.parse(JSON.stringify(this.state.control_list));

        control_list.forEach(element => {
            
            var eleWidth = element.style.width;
            var eleHeight = element.style.height;

            if (typeof eleWidth === 'string')
            {
                eleWidth = Number(element.style.width.slice(0,-2))
            }
            if (typeof eleHeight === 'string')
            {
                eleHeight = Number(element.style.height.slice(0,-2));
            }
            if(eleWidth + element.style.posX > width)
            {
                element.style.posX = 0;
            }
            if(eleHeight + element.style.posY > height)
            {
                element.style.posY= 0;
            }
        });




        this.setState({DimX : event.target.dimX.value,
                       DimY : event.target.dimY.value,
                       enableSave: false,
                       disableUpdate : true,
                       control_list: control_list
                    })
    
        console.log(this.state);
    }

    updateZoomIn()
    {
        const newScale = this.state.scale *2;
        if(this.state.scale == 1.0  || this.state.scale == 0.5)
        {
            this.setState({scale: newScale});
        }
        this.enableZoom(newScale);
        

    }

    updateZoomOut()
    {
        const newScale = this.state.scale /2;
        if(this.state.scale == 1.0  || this.state.scale == 2.0)
        {
            this.setState({scale: newScale})
        }
        this.enableZoom(newScale);
    }

    enableZoom (newScale){
        if (newScale == 0.5){
            this.setState({enableZoomOut: true,
                            enableZoomIn: false});
        }
        else if (newScale == 1.0){
            this.setState({enableZoomOut: false,
                            enableZoomIn: false});
        }
        else if (newScale == 2.0){
            this.setState({enableZoomOut: false,
                            enableZoomIn: true});
        }
    }

    unselect(){
        this.setState({current_select : null,
                       showFontColor : false,
                       showBackgroundColor :false,
                       showBorderColor: false});
        console.log(this.state.current_select);
    }

    updateSelect(control)
    {
        this.setState({current_select: control,
                showFontColor : false,
                showBackgroundColor :false,
                showBorderColor: false});
        this.forceUpdate();
        console.log(this.state.current_select);
    }

    updateRepos(x,y)
    {
        console.log(x,y);
        
        console.log(this.state.DimX);
        var control = JSON.parse(JSON.stringify(this.state.current_select));
        var control_list = JSON.parse(JSON.stringify(this.state.control_list));
        var width = this.state.current_select.style.width;
        var height = this.state.current_select.style.height;
        console.log(x,y,width,height);

        if (typeof width === 'string')
        {
            width = Number(width.slice(0,-2));
        }
        if (typeof height === 'string')
        {
            height = Number(height.slice(0,-2));
        }

        // width = Number(width.slice(0,-2));
        // height = Number(height.slice(0,-2));

        if (x + width > this.state.DimX)
        {
            x = this.state.DimX - width;
        }
        else if (x < 0)
        {
            x = 0;
        }
        if (y + height > this.state.DimY)
        {
            y = this.state.DimY - height;
        }
        else if (y < 0)
        {
            y = 0;
        }
        control.style.posX = x;
        control.style.posY = y;


        control_list[control.key] = control;
        this.setState({current_select: control ,
                        control_list: control_list,
                        enableSave: false});
    }

    updateResize(width, height, position)
    {
        if (position.x == 0 && position.y == 0)
        {
            return;
        }
        console.log(width,height, position);
        var control = JSON.parse(JSON.stringify(this.state.current_select));
        var control_list = JSON.parse(JSON.stringify(this.state.control_list));
        if (typeof width === 'string')
        {
            width = Number(width.slice(0,-2));
        }
        if (typeof height === 'string')
        {
            height = Number(height.slice(0,-2));
        }

        if (position.x + width > this.state.DimX)
        {
            width = width - (width + position.x - this.state.DimX);
        }
        if (position.y + height > this.state.DimY)
        {
            height = height - (height + position.y - this.state.DimY);
        }
        if (position.x < 0)
        {
            control.style.posX = 0;
        }
        else
        {
            control.style.posX = position.x;
        }
        if (position.y < 0)
        {
            control.style.posY = 0;
        }
        else
        {
            control.style.posY = position.y;
        }
        control.style.width = width;
        control.style.height = height;
        control_list[control.key] = control;
        this.setState({current_select: control ,
                        control_list: control_list,
                        enableSave: false});
    }

    updateProperty(property,fontSize, fontColor, borderWidth, borderRadius,borderColor,backGroundColor)
    {
        console.log(property, fontSize, fontColor, borderWidth, borderRadius,borderColor);


        var control = JSON.parse(JSON.stringify(this.state.current_select));
        var control_list = JSON.parse(JSON.stringify(this.state.control_list));
        control.value = property;
        control.style.fontSize = Number(fontSize);
        control.style.fontColor = fontColor;
        control.style.borderWidth = Number(borderWidth);
        control.style.borderRadius = Number(borderRadius);
        control.style.borderColor = borderColor;
        control.style.backgroundColor = backGroundColor;
        control_list[control.key] = control;
        this.setState({current_select: control ,
                       control_list: control_list,
                       enableSave: false});
        
        console.log(this.state.current_select);
    }

    updateProperty_Container(borderWidth, borderRadius, borderColor)
    {
        console.log(borderWidth, borderRadius);


        var control = JSON.parse(JSON.stringify(this.state.current_select));
        var control_list = JSON.parse(JSON.stringify(this.state.control_list));
        control.style.borderWidth = Number(borderWidth);
        control.style.borderRadius = Number(borderRadius);
        control.style.borderColor = borderColor;
        control_list[control.key] = control;
        this.setState({current_select: control ,
                       control_list: control_list,
                       enableSave: false});
        
        
        console.log(this.state.current_select);
    }

    showFontColor()
    {
        this.setState({showFontColor : !this.state.showFontColor});
    }

    showBorderColor()
    {
        this.setState({showBorderColor : !this.state.showBorderColor});
    }

    showBackgroundColor()
    {
        this.setState({showBackgroundColor : !this.state.showBackgroundColor});
    }

    // end

    render() {
        const auth = this.props.auth;
        const WireFramer = this.props.WireFramer;
        console.log(this.props);
        console.log(this.state.control_list);
        if (!auth.uid) {
            return <Redirect to="/" />;
        }


        if (!WireFramer)
            return <React.Fragment />
        
        return (
            <div class>
                <div className="card-panel yellow lighten-5" id = 'overall'>


                    <div className="input-field">
                        <label className="active" htmlFor="email">Name</label>
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={WireFramer.name} />
                    </div>

                    <div id = "left">
                        <PanelLeft 
                            WireFramer = {this.props.WireFramer} 
                            control_list = {this.state.control_list} 
                            updateState={this.updateState.bind(this)}
                            DimX = {this.state.DimX} 
                            DimY = {this.state.DimY}
                            updateZoomIn = {this.updateZoomIn.bind(this)}
                            updateZoomOut = {this.updateZoomOut.bind(this)}
                            enableSave = {this.state.enableSave}
                            scale = {this.state.scale}
                            enableZoomIn = {this.state.enableZoomIn}
                            enableZoomOut = {this.state.enableZoomOut}
                            disableSave = {this.disableSave.bind(this)}

                        />
                    </div>
                    <div id = "mid"  className="card-panel yellow lighten-5">
                    <Diagram WireFramer = {this.props.WireFramer} 
                             control_list = {this.state.control_list} 
                             current_select = {this.state.current_select}
                             updateSelect = {this.updateSelect.bind(this)} unselect = {this.unselect.bind(this)}
                             DimX = {this.state.DimX} 
                             DimY = {this.state.DimY}
                             updateRepos = {this.updateRepos.bind(this)}
                             updateResize = {this.updateResize.bind(this)}
                             scale = {this.state.scale}
                             
                    />
                    </div>
                    <div id ="right">
                            {
                            this.state.current_select ? 
                            <Property 
                                current_select = {this.state.current_select}
                                updateProperty = {this.updateProperty.bind(this)}
                                showFontColorBool = {this.state.showFontColor}
                                showFontColor = {this.showFontColor.bind(this)}
                                showBorderColorBool = {this.state.showBorderColor}
                                showBorderColor = {this.showBorderColor.bind(this)}
                                showBackgroundColorBool = {this.state.showBackgroundColor}
                                showBackgroundColor = {this.showBackgroundColor.bind(this)}
                                updateProperty_Container = {this.updateProperty_Container.bind(this)}
                            />
                            : <Dimension WireFramer = {this.props.WireFramer} updateDimState = {this.updateDimState.bind(this)}
                            disableUpdate = {this.state.disableUpdate}
                            enableUpdate = {this.enableUpdate.bind(this)}
                            DimX = {this.state.DimX}
                            DimY = {this.state.DimY}/>
                            }
                    </div>

                    
                    {/* <table>
                        <tr>
                            <td width = "27%">
                                <PanelLeft WireFramer = {this.props.WireFramer} control_list = {this.state.control_list} updateState={this.updateState.bind(this)}/>
                            </td>
                                
                            <td>
                                <Diagram control_list = {this.state.control_list} updateSelect = {this.updateSelect.bind(this)} unselect = {this.unselect.bind(this)}/>
                            </td>

                            <td width = "20%">
                                {
                                    this.state.current_select && 
                                    <Property current_select = {this.state.current_select}/>
                                }

                            </td>
                        </tr>
                    </table> */}
                    
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

const ListScreenWithRoutter = withRouter(ListScreen);

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'WireFramers' },
    ]),
)(ListScreen);
