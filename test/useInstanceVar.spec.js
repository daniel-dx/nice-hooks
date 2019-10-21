import React, { useState } from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

import { useInstanceVar } from '../src/index';

const TestInstanceVarComponent = ({ extraFn }) => {
  const [getCountVar, setCountVar] = useInstanceVar(0);

  const [time, setTime] = useState(+new Date());

  extraFn.call();

  return (
    <div>
      <span>{time}</span>
      <span id="txt">{getCountVar()}</span>
      <button
        id="notRenderBtn"
        onClick={() => setCountVar(getCountVar() + 1)}
      >
        Don't re-render
      </button>
      <button id="renderBtn" onClick={() => setTime(+new Date())}>
        re-render
      </button>
    </div>
  );
};

describe('useInstanceVar', () => {
  it('change instance variable will not cause re-render and it will keep the lastet value when re-render', () => {
    const extraFn = chai.spy();

    const wrapper = mount(
      <TestInstanceVarComponent extraFn={extraFn} />,
    );

    expect(extraFn).to.have.been.called.exactly(1);
    expect(wrapper.find('span#txt').text()).to.eql('0');

    wrapper
      .find('button#notRenderBtn')
      .at(0)
      .simulate('click');

    expect(extraFn).to.have.been.called.exactly(1);
    expect(wrapper.find('span#txt').text()).to.eql('0');

    wrapper
      .find('button#renderBtn')
      .at(0)
      .simulate('click');

    expect(extraFn).to.have.been.called.exactly(2);
    expect(wrapper.find('span#txt').text()).to.eql('1');
  });
});
