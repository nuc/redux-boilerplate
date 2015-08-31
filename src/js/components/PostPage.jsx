import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { prepareRoute } from '../decorators';
import { Link } from 'react-router';
import * as PostActionCreators from '../actionCreators/post';

@prepareRoute(async function ({ store, params: { postId } }) {
  return await * [
    store.dispatch(PostActionCreators.getById(postId))
  ];
})
@connect(({ Post }) => ({ Post }))

class PostPage extends React.Component {

  static propTypes = {
    Post: PropTypes.instanceOf(Immutable.List).isRequired
  }

  getBody(htmlBody) {
    return {__html: htmlBody};
  }

  render () {
    const {
      props: {
        Post,
        params: { postId }
      }
    } = this;

    const post = Post.get(`posts/${postId}`);

    var htmlBody;
    if(post) {
      htmlBody = this.getBody(post.get('html_body'));
    }

    return (
      <div>
        <Link to="/"><h3>Moviepilot</h3></Link>
        <h3>{post ? post.get('title') : 'Loading...'}</h3>
        <div dangerouslySetInnerHTML={htmlBody}></div>
      </div>
    );
  }
}

export default PostPage;
