import { CALL_API } from '../consts/Misc';
import { Post as PostActions } from '../consts/ActionTypes';

export function getById(postId) {
  return {
    [CALL_API]: {
      type: PostActions.getById,
      postId,
      endpoint: `/v4/posts/${postId}`
    }
  };
}
