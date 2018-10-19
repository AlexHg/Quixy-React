import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import SignupPage from './SignupPage';

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser()
  })
)(SignupPage);
