import React, { useState } from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

import { useLifeCycle } from '../src/index';

const TestLifeCycleComponent = ({
  didMount,
  willUnmount,
  didUpdate,
  didMountAndWillUnmount,
}) => {
  const [time, setTime] = useState(+new Date());

  useLifeCycle({
    didMount,

    willUnmount,

    didUpdate,

    didMountAndWillUnmount,
  });

  return (
    <div>
      <span>{time}</span>
      <button
        id="timeBtn"
        onClick={() => setTime(+new Date())}
      ></button>
    </div>
  );
};
const TestLifeCycleApp = ({
  didMount,
  willUnmount,
  didUpdate,
  didMountAndWillUnmount,
}) => {
  const [show, setShow] = useState(true);

  return (
    <div>
      {show && (
        <TestLifeCycleComponent
          didMount={didMount}
          willUnmount={willUnmount}
          didUpdate={didUpdate}
          didMountAndWillUnmount={didMountAndWillUnmount}
        ></TestLifeCycleComponent>
      )}
      <button id="toggleBtn" onClick={() => setShow(!show)}>
        Toggle
      </button>
    </div>
  );
};

describe('useLifeCycle', () => {
  it('life cycle functions are called correctly', () => {
    const didMountSpy = chai.spy();
    const willUnmountSpy = chai.spy();
    const didUpdateSpy = chai.spy();
    const didMountSpy1 = chai.spy();
    const willUnmountSpy1 = chai.spy();
    const didMountAndWillUnmount = [
      {
        didMount: didMountSpy1,
        willUnmount: willUnmountSpy1,
      },
    ];

    const wrapper = mount(
      <TestLifeCycleApp
        didMount={didMountSpy}
        willUnmount={willUnmountSpy}
        didUpdate={didUpdateSpy}
        didMountAndWillUnmount={didMountAndWillUnmount}
      />,
    );

    expect(didMountSpy).to.have.been.called.exactly(1); // didMount is called
    expect(willUnmountSpy).to.have.been.called.exactly(0);
    expect(didUpdateSpy).to.have.been.called.exactly(0);
    expect(didMountSpy1).to.have.been.called.exactly(1); // didMount is called
    expect(willUnmountSpy1).to.have.been.called.exactly(0);

    wrapper
      .find('button#timeBtn')
      .at(0)
      .simulate('click');

    expect(didMountSpy).to.have.been.called.exactly(1);
    expect(willUnmountSpy).to.have.been.called.exactly(0);
    expect(didUpdateSpy).to.have.been.called.exactly(1); // only didUpdate is called
    expect(didMountSpy1).to.have.been.called.exactly(1);
    expect(willUnmountSpy1).to.have.been.called.exactly(0);

    wrapper
      .find('button#timeBtn')
      .at(0)
      .simulate('click');

    expect(didMountSpy).to.have.been.called.exactly(1);
    expect(willUnmountSpy).to.have.been.called.exactly(0);
    expect(didUpdateSpy).to.have.been.called.exactly(2); // only didUpdate is called
    expect(didMountSpy1).to.have.been.called.exactly(1);
    expect(willUnmountSpy1).to.have.been.called.exactly(0);

    wrapper
      .find('button#toggleBtn')
      .at(0)
      .simulate('click');

    expect(didMountSpy).to.have.been.called.exactly(1);
    expect(willUnmountSpy).to.have.been.called.exactly(1); // willUnmount is called
    expect(didUpdateSpy).to.have.been.called.exactly(2);
    expect(didMountSpy1).to.have.been.called.exactly(1);
    expect(willUnmountSpy1).to.have.been.called.exactly(1); // willUnmount is called
  });
});
