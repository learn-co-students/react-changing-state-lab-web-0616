import React from 'react';
import Field from './Field';

export default class Board extends React.Component {
  render () {
    const { board, onClick } = this.props;
    return (
      <div className='board'>
        {
          board.map((player, i) =>
            <Field key={i} player={player} onClick={onClick.bind(null, i)} />
          )
        }
      </div>
    );
  }
}
