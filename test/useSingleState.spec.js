import React, { useState } from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

const doSomeActionsImpl = chai.spy();
const willUnmountCall = {
  a: chai.spy(),
  b: chai.spy(),
  c: chai.spy(),
};

import { useSingleState, useLifeCycle } from '../src/index';

const UseSingleStateDemoComp = () => {
  const [state, setState] = useSingleState({
    count: 0,
    time: +new Date(),
  });

  function doSomeActions() {
    doSomeActionsImpl('count:' + state.count);
  }

  return (
    <div>
      <p>
        <span id="countText">{state.count}</span>{' '}
        <span id="timeText">{state.time}</span>
      </p>

      <button
        id="increaseBtn"
        type="button"
        onClick={() =>
          setState(
            {
              count: state.count + 1,
            },
            doSomeActions,
          )
        }
      >
        Increase
      </button>
      <button
        id="changeTimeBtn"
        type="button"
        onClick={() =>
          setState({
            time: +new Date(),
          })
        }
      >
        Change Time
      </button>
    </div>
  );
};

const LifeCycleAndSingleState = () => {
  const [state, setState] = useSingleState({
    count1: 0,
    count2: 0,
    obj: {
      count: 0,
    },
  });

  useLifeCycle({
    didMount() {
      setTimeout(() => {
        setState({
          count1: state.count1 + 1,
        });
      }, 100);
    },
    willUnmount() {
      willUnmountCall.a(state.count1);
    },
    didMountAndWillUnmount: [
      {
        didMount() {
          setTimeout(() => {
            setState({
              count2: 5,
            });
          }, 200);
        },
        willUnmount() {
          willUnmountCall.b(state.count2);
        },
      },
      {
        didMount() {
          setTimeout(() => {
            setState({
              obj: {
                count: 7,
              },
            });
          }, 300);
        },
        willUnmount() {
          willUnmountCall.c(state.obj.count);
        },
      },
    ],
  });

  return (
    <div>
      LifeCycleAndState
      <div>
        <b>count1: {state.count1}</b>
        <span> | </span>
        <b>count2: {state.count2}</b>
        <span> | </span>
        <b>count3: {state.obj.count}</b>
      </div>
    </div>
  );
};

function TestApp() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      {show && <LifeCycleAndSingleState />}
      <button id="toggleBtn" onClick={() => setShow(pre => !pre)}>
        Toggle
      </button>
      <UseSingleStateDemoComp />
    </div>
  );
}

describe('useSingleState', () => {
  it('state can work accurately', () => {
    const wrapper = mount(<TestApp />);

    const origCount = wrapper
      .find('span#countText')
      .at(0)
      .text();
    const origTime = wrapper
      .find('span#timeText')
      .at(0)
      .text();

    wrapper
      .find('button#increaseBtn')
      .at(0)
      .simulate('click');

    expect(
      wrapper
        .find('span#countText')
        .at(0)
        .text(),
    ).to.eql(parseInt(origCount) + 1 + '');
    expect(
      wrapper
        .find('span#timeText')
        .at(0)
        .text(),
    ).to.eql(origTime);

    wrapper
      .find('button#changeTimeBtn')
      .at(0)
      .simulate('click');

    expect(
      wrapper
        .find('span#countText')
        .at(0)
        .text(),
    ).to.eql(parseInt(origCount) + 1 + '');
    expect(
      wrapper
        .find('span#timeText')
        .at(0)
        .text(),
    ).to.not.eq(origTime);

    expect(doSomeActionsImpl).to.have.been.called.exactly(1);
    expect(doSomeActionsImpl).to.have.been.called.with('count:1');
  });

  it('Can get the correct state value in willUnmount', done => {
    const wrapper = mount(<TestApp />);

    setTimeout(() => {
      wrapper
        .find('button#toggleBtn')
        .at(0)
        .simulate('click');

      expect(willUnmountCall.a).to.have.been.called.exactly(1);
      expect(willUnmountCall.a).to.have.been.called.with(1);

      expect(willUnmountCall.b).to.have.been.called.exactly(1);
      expect(willUnmountCall.b).to.have.been.called.with(5);

      expect(willUnmountCall.c).to.have.been.called.exactly(1);
      expect(willUnmountCall.c).to.have.been.called.with(7);
      done();
    }, 300);
  });
});
