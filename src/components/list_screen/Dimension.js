import React from 'react';
import { Button, Icon } from 'react-materialize';

import { getFirestore } from 'redux-firestore';

class Dimension extends React.Component {

    state ={
        width : null,
        height : null
    }
    // componentDidMount()
    // {
    //     if (this.props.DimX != 0)
    //     {
    //     alert(this.props.DimX);
    //     this.setState({width: this.props.DimX})
    //     }
    // }

    render() {;
        if (this.props.DimX != 0 && this.state.width == null)
        {
            this.setState({width: this.props.DimX,
                            height : this.props.DimY})
        }
        return (
            <div>
                <div className="card-panel yellow lighten-5">

                    <form onSubmit={this.props.updateDimState}>
                    <p>Wireframer Dimension</p>
                    <br></br>
                    <div className="input-field">
                        <label className="active" >Width</label>
                        <input className="active" name="dimX" id = "dimX" type="number" min="1" max="5000" defaultValue = {this.state.width} onChange = {this.props.enableUpdate}/>
                    </div>

                    <div className="input-field">
                        <label className="active" >Height</label>
                        <input className="active" name="dimY" id = "dimY" type="number" min="1" max="5000" defaultValue = {this.state.height} onChange = {this.props.enableUpdate}/>
                    </div>
                    <button class="btn waves-effect waves-light red" type="submit" name="action" disabled = {this.props.disableUpdate}>update</button>
                    </form>


                </div>
            </div>
        );
        
    }
}
export default Dimension;