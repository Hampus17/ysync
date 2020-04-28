import React from 'react';
import { connect } from "react-redux";
import styles from '../styles/video.module.scss';

const User = ({clientID, hostID}) => {
  return (
    <div className={styles.user__info}>
      <h3 className={(clientID === hostID) ? styles.host__id : styles.user__id}>Name: <span>{clientID}</span></h3>
      {/* ADD BUTTON TO CHANGE NAME */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    hostID: state.hostID,
    clientID: state.clientID
  };
};

export default connect(mapStateToProps)(User);