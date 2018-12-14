import React from 'react';

// Stateless Functional Component
const Like = ({ liked, onLikeClick }) => {
  let classes = 'fa fa-heart';
  classes += liked ? '' : '-o';

  let styles = {
    cursor: 'pointer'
  };

  styles.color = liked ? 'red' : '';

  return (
    <div>
      <i
        className={classes}
        style={styles}
        aria-hidden="true"
        onClick={onLikeClick}
      />
    </div>
  );
};

export default Like;
