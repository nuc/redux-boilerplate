import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router';

class PostListItem extends React.Component {

  static propTypes = {
    post: PropTypes.instanceOf(Immutable.Map).isRequired
  }

  render() {
    const {
      props: { post }
    } = this;

    return (
      <li>
        <p>
          <Link to={`/posts/${post.get('id')}`}><big><strong>{post.get('title')}</strong></big>:&nbsp;</Link>
          <small>
            ({post.get('tower_data').get('reads')}&nbsp;
              <span className="glyphicon glyphicon-star-empty"></span>)
          </small>
          <br />
          {post.get('author').get('name')}
        </p>
      </li>
    );
  }
}

export default PostListItem;
