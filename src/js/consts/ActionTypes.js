import keyMirror from 'react/lib/keyMirror';

export default {
  Homepage: keyMirror({
    getPromoted: null
  }),

  Post: keyMirror({
    getById: null
  }),

  TagManager: keyMirror({
    getTags: null,
    updateTag: null
  })
};
