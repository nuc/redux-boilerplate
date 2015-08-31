import React, { PropTypes } from 'react';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { prepareRoute } from '../decorators';
import { Link } from 'react-router';
import * as HomepageActionCreators from '../actionCreators/homepage';
import PostList from './PostList';

@prepareRoute(async function ({ store }) {
  if(ExecutionEnvironment.canUseDOM) {
    return await * [
      store.dispatch(HomepageActionCreators.loadPromoted())
    ];
  }
})
@connect(({ Homepage }) => ({ Homepage }))

class HomePage extends React.Component {

  static propTypes = {
    Homepage: PropTypes.instanceOf(Immutable.List).isRequired
  }

  render () {
    const { Homepage } = this.props;
    const posts = Homepage.get('promoted');
    const loadState = Homepage.get('state');

    return (
      <div>
        <Link to="/"><h3>Moviepilot</h3></Link>
        {posts ? <PostList {...{ posts }} /> : loadState}
      </div>
    );
  }
}

export default HomePage;
