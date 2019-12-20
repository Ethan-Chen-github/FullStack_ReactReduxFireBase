import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { Modal, Button, Icon } from 'react-materialize';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {

  close = () =>
    {
      const NavbarRouter =  withRouter(Navbar);
      console.log(this.props);
      console.log(NavbarRouter);
      this.props.history.push("/");
    }
  
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;
    console.log(this.props);
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Modal header="Return Home?" actions={<React.Fragment><Button onClick={this.close} waves="green" modal="close" flat>YES </Button><Button waves="green" modal="close" flat>NO </Button></React.Fragment>} 
          trigger={<div className = "brand-logo" id = "mouse">@todo
                    </div>}>
                        <p>
                            Are you sure you want to return to the home screen? <br></br>
                            Make sure to save your work.
                        </p>
                    </Modal>
          {/* <Link to="/" className="brand-logo">@todo</Link> */}

          {links}
        </div>
      </nav>
    );
  };
}


const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar));

// const NavbarRouter =  withRouter(Navbar);