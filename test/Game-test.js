import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Status from '../components/Status';
import Board from '../components/Board';
import Game from '../components/Game';

describe('<Game />', function () {
  it('should have .game class', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.hasClass('game')).toBe(true);
  });

  it('should have `board` state', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.state().board).toEqual([
      null, null, null,
      null, null, null,
      null, null, null
    ]);
  });

  it('should have `turn` state', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.state().turn).toBe('X');
  });

  it('should have `turn` state', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.state().turn).toBe('X');
  });

  it('should not show `Status` while game is in progress', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.find(Status).length).toBe(0);
  });

  it('should show status when game is a tie', function () {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      board: [
        'X', 'O', 'X',
        'O', 'O', 'X',
        'O', 'X', 'O'
      ]
    });
    expect(wrapper.find(Status).length).toBe(1);
    expect(wrapper.find(Status).prop('winner')).toBe(undefined);
  });

  it('should show `<Status winner=\'X\' />` when X won', function () {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      board: [
        'X', 'O', 'X',
        'O', 'X', 'X',
        'O', 'X', 'X'
      ]
    });
    expect(wrapper.find(Status).length).toBe(1);
    expect(wrapper.find(Status).prop('winner')).toBe('X');
  });

  it('should show `<Status winner=\'O\' />` when O won', function () {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      board: [
        'X', 'O', 'X',
        'O', 'X', 'X',
        'O', 'O', 'O'
      ]
    });
    expect(wrapper.find(Status).length).toBe(1);
    expect(wrapper.find(Status).prop('winner')).toBe('O');
  });

  it('should contain button with `game__reset` class', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.find('.game__reset').length).toBe(1);
  });

  it('should reset board when clicking "Reset"', function () {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      board: [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'X', 'O', 'X'
      ]
    });
    wrapper.find('.game__reset').simulate('click', {
      preventDefault: sinon.stub()
    });
    expect(wrapper.state().board).toEqual([
      null, null, null,
      null, null, null,
      null, null, null
    ]);
  });

  it('should `preventDefault()` when clicking "Reset"', function () {
    const wrapper = shallow(<Game />);
    const preventDefault = sinon.spy();
    wrapper.find('.game__reset').simulate('click', {
      preventDefault
    });
    sinon.assert.calledOnce(preventDefault);
  });

  it('should pass `board` state to `<Board />`', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.find(Board).prop('board')).toBe(wrapper.state('board'));
  });

  it('should have `handleClick` function', function () {
    const wrapper = shallow(<Game />);
    expect(typeof wrapper.instance().handleClick).toBe('function');
  });

  it('should bind `handleClick` handler to `<Board />`', function () {
    const wrapper = shallow(<Game />);
    expect(wrapper.find(Board).prop('onClick')).toBe(wrapper.instance().handleClick);
  });

  it('should `preventDefault()` when clicking on board', function () {
    const wrapper = shallow(<Game />);
    const ev = { preventDefault: sinon.spy() };
    wrapper.find(Board).prop('onClick').call(null, 0, ev);
    sinon.assert.calledOnce(ev.preventDefault);
  });

  it('should set current `this.state.turn` on `board[3]` when clicking on 3rd field', function () {
    const wrapper = shallow(<Game />);
    const ev = { preventDefault: sinon.stub() };
    wrapper.find(Board).prop('onClick').call(null, 3, ev);
    expect(wrapper.state('board')).toEqual([
      null, null, null,
      'X', null, null,
      null, null, null
    ]);
  });

  it('should toggle `this.state.turn` between `X` and `O` when clicking on board', function () {
    const wrapper = shallow(<Game />);
    const ev = { preventDefault: sinon.stub() };
    expect(wrapper.state('turn')).toBe('X');

    wrapper.find(Board).prop('onClick').call(null, 1, ev);
    expect(wrapper.state('turn')).toBe('O');

    wrapper.find(Board).prop('onClick').call(null, 2, ev);
    expect(wrapper.state('turn')).toBe('X');

    wrapper.find(Board).prop('onClick').call(null, 3, ev);
    expect(wrapper.state('turn')).toBe('O');

    wrapper.find(Board).prop('onClick').call(null, 4, ev);
    expect(wrapper.state('turn')).toBe('X');
  });

  it('should set `board[i]` to `turn` when clicking on `i`th-field', function () {
    const wrapper = shallow(<Game />);
    const ev = { preventDefault: sinon.stub() };

    wrapper.find(Board).prop('onClick').call(null, 1, ev);
    expect(wrapper.state('board')).toEqual([
      null, 'X', null,
      null, null, null,
      null, null, null
    ]);

    wrapper.find(Board).prop('onClick').call(null, 5, ev);
    expect(wrapper.state('board')).toEqual([
      null, 'X', null,
      null, null, 'O',
      null, null, null
    ]);

    wrapper.find(Board).prop('onClick').call(null, 8, ev);
    expect(wrapper.state('board')).toEqual([
      null, 'X', null,
      null, null, 'O',
      null, null, 'X'
    ]);
  });
});
