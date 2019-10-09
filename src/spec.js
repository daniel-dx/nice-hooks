import React, { useState } from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

import { useStateCB, useLifeCycle, useInstanceVar } from './';

const TestStateCBComponent = () => {
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

const TestLifeCycleComponent = ({didMount, willUnmount, didUpdate, didMountAndWillUnmount}) => {

  const [ time, setTime ] = useState(+new Date());

  useLifeCycle({
    didMount,

    willUnmount,

    didUpdate,

    didMountAndWillUnmount
  })

  return (<div>
    <span>{time}</span>
    <button id="timeBtn" onClick={() => setTime(+new Date())}></button>
  </div>)
}
const TestLifeCycleApp = ({didMount, willUnmount, didUpdate, didMountAndWillUnmount}) => {

  const [ show, setShow ] = useState(true);

  return <div>
    {show && <TestLifeCycleComponent didMount={didMount} willUnmount={willUnmount} didUpdate={didUpdate} didMountAndWillUnmount={didMountAndWillUnmount}></TestLifeCycleComponent>}
    <button id="toggleBtn" onClick={() => setShow(!show)}>Toggle</button>
  </div>
}

const TestInstanceVarComponent = ({extraFn}) => {
  const [ countVar, setCountVar ] = useInstanceVar(0);

  const [ time, setTime ] = useState(+new Date());

  extraFn.call();

  return (
    <div>
      <span>{time}</span>
      <span id="txt">{countVar}</span>
      <button id="notRenderBtn" onClick={() => setCountVar(countVar+1)}>Don't re-render</button>
      <button id="renderBtn" onClick={() => setTime(+new Date())}>re-render</button>
    </div>
  )
}

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
        willUnmount: willUnmountSpy1
      }
    ]

    const wrapper = mount(<TestLifeCycleApp didMount={didMountSpy} willUnmount={willUnmountSpy} didUpdate={didUpdateSpy} didMountAndWillUnmount={didMountAndWillUnmount}/>);

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

describe('useInstanceVar', () => {
  it('change instance variable will not cause re-render and it will keep the lastet value when re-render', () => {

    const extraFn = chai.spy();

    const wrapper = mount(<TestInstanceVarComponent extraFn={extraFn}/>);

    expect(extraFn).to.have.been.called.exactly(1);
    expect(
      wrapper
        .find('span#txt')
        .text(),
    ).to.eql('0');

    wrapper
      .find('button#notRenderBtn')
      .at(0)
      .simulate('click');

    expect(extraFn).to.have.been.called.exactly(1);
    expect(
      wrapper
        .find('span#txt')
        .text(),
    ).to.eql('0');

    wrapper
    .find('button#renderBtn')
    .at(0)
    .simulate('click');

    expect(extraFn).to.have.been.called.exactly(2);
    expect(
      wrapper
        .find('span#txt')
        .text(),
    ).to.eql('1');
  });
});
