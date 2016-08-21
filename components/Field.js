import React from 'react';

export default class Field extends React.Component {
  render () {
    const { player, onClick } = this.props;
    return (
      <button
        className='field'
        disabled={!!player}
        onClick={onClick}
      >
        {player}
      </button>
    );
  }
}
