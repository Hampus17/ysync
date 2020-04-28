import React from 'react';

import styles from '../styles/video.module.scss';

const Input = (props) => {
  return (
    <div className={styles.input__container}>
      <input className={styles.add__video} placeholder="Youtube link..."></input>
    </div>
  );
}

export default Input;