import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import PostListItem from './PostListItem';

class PostList extends React.Component {

  static propTypes = {
    posts: PropTypes.instanceOf(Immutable.List).isRequired
  }

  render() {
    const {
      props: { posts }
    } = this;

    return (
      <ol>
        {posts.map(post => <PostListItem key={post.get('id')} {...{ post }} />)}
      </ol>
    );
  }
}

export default PostList;
