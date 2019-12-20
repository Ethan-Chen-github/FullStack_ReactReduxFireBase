import React from 'react';
import { Button, Icon } from 'react-materialize';

import { getFirestore } from 'redux-firestore';

import {Rnd} from 'react-rnd';
import { isAbsolute } from 'path';
import { transform } from '@babel/core';

class Diagram extends React.Component {

    diagramSize (scale)
    {
        // return 
        // {
        //     borderStyle:'solid', height: this.props.DimY, width: 500,  borderWidth: 2, borderColor: 'black', backgroundColor: "white"
        // }
        return {
            borderStyle: 'solid', 
            height: this.props.DimY + "px", 
            width:  this.props.DimX + "px",  
            borderWidth: 2, borderColor: 'black', 
            backgroundColor: "white",
            position: "relative",
            transformOrigin: 'top left',
            transform: 'scale(' + String(scale) + ')',
            top: 0,
            left: 0


        }
    }

    style (control)
    {
        console.log(this.props);
        console.log(control)
        if (control.type == 'textfield' && control.style.borderWidth == 0)
        {
            return {
                width : control.style.width,
                height : control.style.height,
                position :'absolute',
                left : control.style.posX,
                top : control.style.posY,
                fontSize : control.style.fontSize,
                color :control.style.fontColor,
                cursor: 'pointer',
                backgroundColor : control.style.backgroundColor,
                borderColor : control.style.borderColor,
                borderRadius : control.style.borderRadius,
                zIndex : 1,

            }
        }
        return{
            width : control.style.width,
            height : control.style.height,
            position :'absolute',
            left : control.style.posX,
            top : control.style.posY,
            fontSize : control.style.fontSize,
            color :control.style.fontColor,
            cursor: 'pointer',
            backgroundColor : control.style.backgroundColor,
            borderColor : control.style.borderColor,
            borderWidth :control.style.borderWidth,
            borderStyle : 'solid',
            borderRadius : control.style.borderRadius,
            zIndex : 1

        }
    }

    inputOnSelect(control)
    {
        console.log(this.props);
        console.log(control)
        if (control.type == 'textfield' && control.style.borderWidth == 0)
        {
            return {
                width : control.style.width,
                height : control.style.height,
                position :'absolute',
                fontSize : control.style.fontSize,
                color :control.style.fontColor,
                cursor: 'move',
                backgroundColor : control.style.backgroundColor,
                borderColor : control.style.borderColor,
                borderRadius : control.style.borderRadius,
            }
        }
        return{
            width : control.style.width,
            height : control.style.height,
            position :'absolute',
            fontSize : control.style.fontSize,
            color :control.style.fontColor,
            cursor: 'move',
            backgroundColor : control.style.backgroundColor,
            borderColor : control.style.borderColor,
            borderWidth :control.style.borderWidth,
            borderStyle : 'solid',
            borderRadius : control.style.borderRadius,
        }
    }

    inputOnSelect2(control)
    {
        console.log(this.props);
        console.log(control)
        if (control.type == 'textfield' && control.style.borderWidth == 0)
        {
            return {
                width : control.style.width,
                height : control.style.height,
                position :'absolute',
                fontSize : control.style.fontSize,
                color :control.style.fontColor,
                cursor: 'pointer',
                backgroundColor : control.style.backgroundColor,
                borderColor : control.style.borderColor,
                borderRadius : control.style.borderRadius,
                zIndex :3
            }
        }
        return{
            width : control.style.width,
            height : control.style.height,
            position :'absolute',
            fontSize : control.style.fontSize,
            color :control.style.fontColor,
            cursor: 'pointer',
            borderStyle : 'solid',
            backgroundColor : control.style.backgroundColor,
            borderColor : control.style.borderColor,
            borderWidth :1,
            borderRadius : control.style.borderRadius,
            zIndex :3
        }
    }

    

    render() {
        const control_list = this.props.control_list;
        console.log(this.props);
        const rect = <svg width="20" height="20" ><rect width="20" height="20" style={{fill:'transparent', strokeWidth:3, stroke: 'gray'}}></rect></svg>;
        return (

            <div className = 'scale' style= {this.diagramSize(this.props.scale)} onClick= {this.props.unselect}>
                {
                    control_list && control_list.map((control, index)=>{
                        // alert(control.type == "textfield");
                        // return <p>{control.type === "textfield"}</p>
                        control.key = index;
                        console.log(control);
                        console.log(this.props.current_select);


                        if(control.type === "button" && control == this.props.current_select)
                            // return <button value="input" key={index} onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.type}</button>
                            return  <Rnd
                
                            size={{ width: control.style.width,  height: control.style.height }}
                            
                            onDragStop={(e, d) => {this.props.updateSelect(control);console.log(d.x, d.y);this.props.updateRepos(d.x,d.y)}}
                            //transform = (d.x,d.y)
                            position={{ x: control.style.posX, y:control.style.posY}}
                            scale={this.props.scale}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                this.props.updateSelect(control);
                                this.props.updateResize(ref.style.width, ref.style.height,position)
                              }
                            }
                            style = {{width: control.style.width,  
                                height: control.style.height,

                                //left off
                                // left: control.style.posX, 
                                // top:control.style.posY,
                                borderStyle : 'solid',

                                borderColor : control.style.borderColor,
                                borderRadius : control.style.borderRadius,
                                borderWidth :control.style.borderWidth,
                                backgroundColor: control.style.backgroundColor,
                                zIndex : 1}}
                                
                            resizeHandleComponent = {{topRight: rect, topLeft: rect, bottomLeft: rect, bottomRight: rect}}

                          >
                            <button style={{ width: control.style.width,  
                                            height: control.style.height, 
                                            color :control.style.fontColor, 
                                            fontSize : control.style.fontSize,


                                            borderWidth :control.style.borderWidth,
                                            borderStyle : 'solid',
                                            borderColor : control.style.borderColor,
                                            
                                            borderRadius : control.style.borderRadius,
                                            backgroundColor: control.style.backgroundColor,
                                            cursor : 'move',
                                            zIndex : 1}}
                                             onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.value}</button>
                          </Rnd>







                        if(control.type === "label" && control == this.props.current_select)
                            // return <button value="input" key={index} onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.type}</button>
                            return  <Rnd
                
                            size={{ width: control.style.width,  height: control.style.height }}
                            position={{ x: control.style.posX, y:control.style.posY}}
                            onDragStop={(e, d) => {this.props.updateSelect(control);this.props.updateRepos(d.x,d.y)}}
                            scale={this.props.scale}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                this.props.updateSelect(control);
                                this.props.updateResize(ref.style.width, ref.style.height,position)
                              }
                            }
                            style = {{width: control.style.width,  
                                      height: control.style.height,
                                      borderStyle : 'solid',
                                      borderColor : control.style.borderColor,
                                      borderRadius : control.style.borderRadius,
                                      borderWidth :control.style.borderWidth,
                                      backgroundColor: control.style.backgroundColor,
                                      zIndex : 1}}

                            resizeHandleComponent = {{topRight: rect, topLeft: rect, bottomLeft: rect, bottomRight: rect}}

                          >
                            <label style={{ 
                                            color :control.style.fontColor, 
                                            fontSize : control.style.fontSize,
                                            cursor : 'move'}}
                                             onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.value}</label>
                          </Rnd>







                        if(control.type === "container" && control == this.props.current_select)
                            // return <button value="input" key={index} onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.type}</button>
                            return  <Rnd
                            scale={this.props.scale}
                            size={{ width: control.style.width,  height: control.style.height }}
                            position={{ x: control.style.posX, y:control.style.posY}}
                            onDragStop={(e, d) => {this.props.updateSelect(control);this.props.updateRepos(d.x,d.y)}}
                            
                            onResizeStop={(e, direction, ref, delta, position) => {
                                this.props.updateSelect(control);
                                this.props.updateResize(ref.style.width, ref.style.height,position)
                              }
                            }
                            style = {{width: control.style.width,  
                                      height: control.style.height,
                                      borderStyle : 'solid',
                                      borderColor : control.style.borderColor,
                                      borderRadius : control.style.borderRadius,
                                      borderWidth :control.style.borderWidth,
                                    }}

                            resizeHandleComponent = {{topRight: rect, topLeft: rect, bottomLeft: rect, bottomRight: rect}}

                          >
                            <svg style = {{width: control.style.width,  
                                      height: control.style.height
                                    }} onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} ><rect></rect></svg>
                          </Rnd>

                        if(control.type === "textfield" && control == this.props.current_select)
                            // return <button value="input" key={index} onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.type}</button>
                            return  <Rnd
                
                            size={{ width: control.style.width,  height: control.style.height }}
                            position={{ x: control.style.posX, y:control.style.posY}}
                            onDragStop={(e, d) => {this.props.updateSelect(control);this.props.updateRepos(d.x,d.y)}}
                            scale={this.props.scale}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                this.props.updateSelect(control);
                                this.props.updateResize(ref.style.width, ref.style.height,position)
                              }
                            }
                            style = {this.inputOnSelect2(control)}

                            resizeHandleComponent = {{topRight: rect, topLeft: rect, bottomLeft: rect, bottomRight: rect}}

                          >
                            <input type="text" style={this.inputOnSelect(control)} value={control.value}  onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} />
                          </Rnd>

                        if (control.type === 'button')
                            return <button style = {this.style(control)} onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.value}</button>

                        if(control.type === "textfield")
                            return <input type="text" style={this.style(control)}  value= {control.value}  onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} />


                        if (control.type === "label")
                            return <label style = {this.style(control)} onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >{control.value}</label>
                        
                        if (control.type = 'container')
                            return <svg style = {{width: control.style.width,  
                                height: control.style.height,
                                borderStyle : 'solid',
                                borderColor : control.style.borderColor,
                                borderRadius : control.style.borderRadius,
                                borderWidth :control.style.borderWidth,
                                position :"absolute",
                                left : control.style.posX,
                                top : control.style.posY,
                                fill:'transparent',
                                cursor: 'pointer'}}
                                onClick={(event) => {event.stopPropagation();this.props.updateSelect(control);}} >
                                <rect></rect>
                            </svg>
                        
                        
                    })
                }
            </div>
        );
    }
}
export default Diagram;