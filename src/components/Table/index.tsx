import React, { useState } from 'react';
import { connect } from 'react-redux';
import Hand from '../Hand';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/StoredPlayer';

interface Props {
  activePlayer?: SerializedPlayer;
}

const Table: React.FC<Props> = ({ activePlayer }) => {
  return (
    <>
      <Hand />
    </>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, null)(Table);
