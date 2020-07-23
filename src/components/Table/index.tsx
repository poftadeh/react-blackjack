import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from '../Card';

const Table: React.FC = () => {
  return <Card rank="Ace" suit="Spades" />;
};

export default connect(null)(Table);
