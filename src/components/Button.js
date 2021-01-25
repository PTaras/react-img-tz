import React from 'react';
// import classNames from 'classnames';

import '../assets/style/Button.css';

export default function Button ({
  children, onClick, className, disabled, active, invert, ...attrs
}) {
  const onClickAction = e => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };

//   const classes = classNames(
//     'btn',
//     className,
//     { active },
//     { invert },
//   );

  const Tag = attrs.href ? 'a' : 'button';

  return (
    <Tag
    //   className={classes}
      disabled={disabled}
      onClick={onClickAction}
      {...attrs}
    >
      {children}
    </Tag>
  );
};
