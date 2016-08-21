const React = require('react');
const { shallow } = require('enzyme');
const sinon = require('sinon');
const Board = require('../components/Board');
const Field = require('../components/Field');

describe('<Board />', function () {
  it('should have .board class', function () {
    const wrapper = shallow(<Board board={[]} onClick={Function.prototype} />);
    expect(wrapper.hasClass('board')).toBe(true);
  });

  it('should render nine <Field /> components', function () {
    const board = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    const noop = Function.prototype;
    expect(shallow(<Board board={board} onClick={noop} />).find(Field).length).toBe(9);
  });

  it('should bind onClick listeners', function () {
    const board = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    const onClick = Object.create(Function.prototype);
    onClick.bind = sinon.spy();
    shallow(<Board board={board} onClick={onClick} />);
    sinon.assert.callCount(onClick.bind, board.length);
    board.forEach((_, i) => {
      sinon.assert.calledWith(onClick.bind, null, i);
    });
  });
});
