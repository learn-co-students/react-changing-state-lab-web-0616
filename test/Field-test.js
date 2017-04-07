import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Field from '../components/Field';

describe('<Field />', function () {
  it('should have .field class', function () {
    const wrapper = shallow(<Field />);
    expect(wrapper.hasClass('field')).toBe(true);
  });

  it('should render player prop', function () {
    expect(shallow(<Field player='X' />).contains('X')).toBe(true);
    expect(shallow(<Field player='O' />).contains('O')).toBe(true);
  });

  it('should enable button when there is no player prop', function () {
    expect(shallow(<Field />).prop('disabled')).toBe(false);
  });

  it('should disable button when there is a player prop', function () {
    expect(shallow(<Field player='X' />).prop('disabled')).toBe(true);
  });

  it('should call onClick when button is clicked', function () {
    const onClick = sinon.spy();
    shallow(<Field onClick={onClick} />).find('button').simulate('click');
    sinon.assert.calledOnce(onClick);
  });
});
