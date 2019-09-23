import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import useStateCB from './';

const SomeComponent = () => {
  const [count, setCount] = useStateCB(0);

  return (
    <div>
      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1, count => { document.title = 'Increase:' + count })}>
        Increase
      </button>

      <button type="button" onClick={() => setCount(count - 1, count => { document.title = 'Decrease:' + count })}>
        Decrease
      </button>
    </div>
  );
};

describe('useStateCB', () => {
  it('works the same as setXXX, but calls a callback function', () => {
    const wrapper = mount(<SomeComponent />);

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
