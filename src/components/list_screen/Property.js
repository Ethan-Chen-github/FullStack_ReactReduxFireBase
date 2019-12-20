import React from 'react';
import { Button, Icon } from 'react-materialize';

import { getFirestore } from 'redux-firestore';

import { SketchPicker } from 'react-color';

class Property extends React.Component {

    updateProperty = () =>
    {
        if (this.props.current_select.type == 'container')
        {
            var borderWidth = document.getElementById('borderWidth').value;
            var borderRadius = document.getElementById('borderRadius').value;
            var borderColor = document.getElementById('borderColor').value;
            this.props.updateProperty_Container(borderWidth, borderRadius, borderColor);
        }
        else
        {
            var property = document.getElementById("property").value;
            var fontSize = document.getElementById("fontSize").value;
            var fontColor = document.getElementById('fontColor').value;
            var borderWidth = document.getElementById('borderWidth').value;
            var borderRadius = document.getElementById('borderRadius').value;
            var borderColor = document.getElementById('borderColor').value;
            var backGroundColor = document.getElementById('backGroundColor').value;
            this.props.updateProperty(property,fontSize, fontColor,borderWidth,borderRadius,borderColor, backGroundColor);
        }

        
    }

    
    // updateProperty1 = () =>
    // {
    //     // var property = document.getElementById("property").value;
    //     // var fontColor = document.getElementById('fontColor').value;
    //     // this.props.updateProperty(property);

    //     var newValue = this.props.current_select.value && document.getElementById("property").value
    //     var newProperty = {
    //         "type": this.props.current_select.type,
    //         "value": newValue,
    //         // that way container is nul
    //         "style": 
    //             {
    //                 "posX": this.props.current_select.style.posX,
    //                 "posY": this.props.current_select.style.posY,
    //                 "width": this.props.current_select.style.width,
    //                 "height": this.props.current_select.style.height,
    //                 "fontSize": document.getElementById('fontSize').value,
    //                 "fontColor" : document.getElementById('fontColor').value,

    //                 "background-color": document.getElementById('backGroundColor').value,
    //                 "border-color": document.getElementById('borderColor').value,
    //                 "border-thinkness": document.getElementById('fontColor').value,
    //                 "border-radius": document.getElementById('fontColor').value,
    //             }
            
    //     };
    // }


    render() {
        // alert(this.props.current_select.value);
        console.log(this.props.current_select);

        return (
            <div>
                <div className="card-panel yellow lighten-5">
                    <span>Selected : {this.props.current_select.type}</span>
                    {
                       (this.props.current_select.type == 'container') ?
                       null :
                        <div className="input-field">
                        <label className="active" >Property</label>
                        <input className="active" id = "property" type="text" value = {this.props.current_select.value} onChange= {this.updateProperty}/>
                        </div>
                    }

                    {
                    (this.props.current_select.type == 'container') ?
                       null :
                    <div className="input-field">
                        <label className="active" htmlFor="email">Font Size</label>
                        <input className="active" id = 'fontSize' type="text" value = {this.props.current_select.style.fontSize} onChange= {this.updateProperty}/>
                    </div>
                    }

                    {
                    (this.props.current_select.type == 'container') ?
                       null :
                    <div className="input-field">
                        <label className="active" htmlFor="email">Font Color</label>
                        <input id='fontColor' className="active" type="text" value = {this.props.current_select.style.fontColor} onClick = {this.props.showFontColor}/>
                        {
            
                            this.props.showFontColorBool &&
                            <SketchPicker
                            color= {this.props.current_select.style.fontColor}
                            onChangeComplete={ (color) => {document.getElementById('fontColor').value = color.hex;
                            this.props.updateProperty(document.getElementById("property").value,
                                                      document.getElementById("fontSize").value,
                                                      document.getElementById('fontColor').value,
                                                      document.getElementById('borderWidth').value,
                                                      document.getElementById('borderRadius').value,
                                                      document.getElementById('borderColor').value,
                                                      document.getElementById('backGroundColor').value
                                                     );}}
                        />}
                    </div>
                    }

                    {
                    (this.props.current_select.type == 'container') ?
                       null :
                    <div className="input-field">
                        <label className="active" htmlFor="email">BackGround Color</label>
                        <input className="active" id = 'backGroundColor'  value = {this.props.current_select.style.backgroundColor} type="text" onClick = {this.props.showBackgroundColor}/>
                        {
            
                            this.props.showBackgroundColorBool &&
                            <SketchPicker
                            color= {this.props.current_select.style.backgroundColor}
                            onChangeComplete={ (color) => {document.getElementById('backGroundColor').value = color.hex;
                            this.props.updateProperty(document.getElementById("property").value,
                                                      document.getElementById("fontSize").value,
                                                      document.getElementById('fontColor').value,
                                                      document.getElementById('borderWidth').value,
                                                      document.getElementById('borderRadius').value,
                                                      document.getElementById('borderColor').value,
                                                      document.getElementById('backGroundColor').value
                                                     );}}
                        />}
                    </div>
                    }

                    <div className="input-field">
                        <label className="active" htmlFor="email">Border Color</label>
                        <input className="active" id = 'borderColor' value = {this.props.current_select.style.borderColor}type="text" onClick = {this.props.showBorderColor}/>
                        {
            
                            this.props.showBorderColorBool &&
                            <SketchPicker
                            color= {this.props.current_select.style.borderColor}
                            onChangeComplete={ (color) => {document.getElementById('borderColor').value = color.hex;
                            if (this.props.current_select.type != 'container'){
                            this.props.updateProperty(document.getElementById("property").value,
                                                      document.getElementById("fontSize").value,
                                                      document.getElementById('fontColor').value,
                                                      document.getElementById('borderWidth').value,
                                                      document.getElementById('borderRadius').value,
                                                      document.getElementById('borderColor').value,
                                                      document.getElementById('backGroundColor').value
                                                     );}
                            else
                            {
                                this.props.updateProperty_Container(document.getElementById("borderWidth").value, 
                                                                    document.getElementById("borderRadius").value, 
                                                                    document.getElementById('borderColor').value);
                            }
                        }}
                        />}
                    
                    </div>

                    <div className="input-field">
                        <label className="active" htmlFor="email">Border Thickness</label>
                        <input className="active" id = 'borderWidth' value = {this.props.current_select.style.borderWidth} type="text" onChange= {this.updateProperty} />
                    </div>

                    <div className="input-field">
                        <label className="active" htmlFor="email">Border Radius</label>
                        <input className="active" id = 'borderRadius' value = {this.props.current_select.style.borderRadius}type="text" onChange= {this.updateProperty} />
                    </div>


                </div>
            </div>
        );
    }
}
export default Property;