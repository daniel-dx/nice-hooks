import React, { useState } from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);


const startAndStopVars = [1, 2];
const lifeCycleVars = {
  a: [1, 2],
  b: [1, 2],
  c: [1, 2],
};

import { useSingleInstanceVar, useSingleState, useLifeCycle } from '../src/index';

const UseSingleInstanceVarDemoComp = () => {
  const instanceVal = useSingleInstanceVar({
    interval: null
  });

  const [state, setState] = useSingleState({ count: 0 });

  function start() {
    instanceVal.interval = setInterval(
      () => setState({ count: state.count + 1 }),
      100
    );
    startAndStopVars[0] = (instanceVal.interval);
  }

  function stop() {
    startAndStopVars[1] = (instanceVal.interval);
    const interval = instanceVal.interval;
    interval && clearInterval(interval);
  }

  return (
    <div>
      <p>{state.count}</p>
      <button id="startBtn" type="button" onClick={start}>
        Start
      </button>
      <button id="stopBtn" type="button" onClick={stop}>
        Stop
      </button>
    </div>
  );
};

const LifeCycleAndSingleInstanceVar = () => {
  const instanceVar = useSingleInstanceVar({
    interval: {
      count3Interval: null
    },
    count1Interval: null,
    count2Interval: null
  });

  useLifeCycle({
    didMount() {
      instanceVar.count1Interval = setInterval(() => {}, 100);
      lifeCycleVars.a[0] = instanceVar.count1Interval;
    },
    willUnmount() {
      if (instanceVar.count1Interval) {
        lifeCycleVars.a[1] = instanceVar.count1Interval;
        clearInterval(instanceVar.count1Interval);
      }
    },
    didMountAndWillUnmount: [
      {
        didMount() {
          instanceVar.count2Interval = setInterval(() => {}, 100);
          lifeCycleVars.b[0] = instanceVar.count2Interval;
        },
        willUnmount() {
          if (instanceVar.count2Interval) {
            lifeCycleVars.b[1] = instanceVar.count2Interval;
            clearInterval(instanceVar.count2Interval);
          }
        }
      },
      {
        didMount() {
          instanceVar.interval = {
            count3Interval: setInterval(() => {}, 100)
          };
          lifeCycleVars.c[0] = instanceVar.interval.count3Interval;
        },
        willUnmount() {
          if (instanceVar.interval.count3Interval) {
            lifeCycleVars.c[1] = instanceVar.interval.count3Interval;
            clearInterval(instanceVar.interval.count3Interval);
          }
        }
      }
    ]
  });

  return <div>LifeCycle And Instance Var Demo</div>;
};

function TestApp() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      {show && <LifeCycleAndSingleInstanceVar />}
      <button id="toggleBtn" onClick={() => setShow(pre => !pre)}>
        Toggle
      </button>
      <UseSingleInstanceVarDemoComp />
    </div>
  );
}

describe('useSingleInstanceVar', () => {
  it('instance variable can work accurately', (done) => {
    const wrapper = mount(<TestApp />);

    wrapper
      .find('button#startBtn')
      .at(0)
      .simulate('click');

    setTimeout(() => {
      wrapper
      .find('button#stopBtn')
      .at(0)
      .simulate('click');

      expect(startAndStopVars[0]).to.eql(startAndStopVars[1])

      wrapper
      .find('button#toggleBtn')
      .at(0)
      .simulate('click');

      expect(lifeCycleVars.a[0]).to.eql(lifeCycleVars.a[1])
      expect(lifeCycleVars.b[0]).to.eql(lifeCycleVars.b[1])
      expect(lifeCycleVars.c[0]).to.eql(lifeCycleVars.c[1])

      done();
    }, 200)
  });
});
