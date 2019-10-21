import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

import { useStateCB } from '../src/index';

const TestStateCBComponent = () => {
  const [getCount, setCount] = useStateCB(0);

  return (
    <div>
      <p>{getCount()}</p>

      <button
        type="button"
        onClick={() =>
          setCount(getCount() + 1, () => {
            document.title = 'Increase:' + getCount();
          })
        }
      >
        Increase
      </button>

      <button
        type="button"
        onClick={() =>
          setCount(getCount() - 1, () => {
            document.title = 'Decrease:' + getCount();
          })
        }
      >
        Decrease
      </button>
    </div>
  );
};

describe('useStateCB', () => {
  it('works the same as setXXX, but calls a callback function', () => {
    const wrapper = mount(<TestStateCBComponent />);

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).to.eql('0');

    wrapper
      .find('button')
      .at(0)
      .simulate('click');

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).to.eql('1');

    expect(document.title).to.eql('Increase:1');

    wrapper
      .find('button')
      .at(1)
      .simulate('click');

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).to.eql('0');

    expect(document.title).to.eql('Decrease:0');
  });
});
