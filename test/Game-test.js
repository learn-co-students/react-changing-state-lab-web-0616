const React = require('react');
const { shallow } = require('enzyme');
const sinon = require('sinon');
const Status = require('../components/Status');
const Game = require('../components/Game');

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
});
