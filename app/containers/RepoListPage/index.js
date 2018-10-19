import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import RepoListPage from './RepoListPage';

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser()
  })
)(RepoListPage);
