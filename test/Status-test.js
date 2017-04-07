import React from 'react';
import { shallow } from 'enzyme';
import Status from '../components/Status';

describe('<Status />', function () {
  it('should have .status class', function () {
    const wrapper = shallow(<Status />);
    expect(wrapper.hasClass('status')).toBe(true);
  });

  it('should render "X wins" if `winner` is "X"', function () {
    expect(shallow(<Status winner='X' />).text()).toBe('X wins');
  });

  it('should render "O wins" if `winner` is "O"', function () {
    expect(shallow(<Status winner='O' />).text()).toBe('O wins');
  });

  it('should render "Tie" if `winner` is undefined', function () {
    expect(shallow(<Status />).text()).toBe('Tie');
  });
});
