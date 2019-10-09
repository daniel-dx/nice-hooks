# Nice Hooks

A lot of nick hooks to make react hooks easier to use.

> If you find this project is useful to you, please give me a star.

## Installation

`npm install nice-hooks`

## Usage

- useStateCB

Let react useState hook has callback capability.

```
import React from 'react';

import { useStateCB } from 'nice-hooks';

const App = () => {
  const [count, setCount] = useStateCB(0);

  // Note: must use count state with method arguments instead of directly using the value of count state defined above
  function doSomeActions(count) {
    document.title = `Count: ${count}`
  }

  return (
    <div>
      {count}

      <button type="button" onClick={() => setCount(count + 1, doSomeActions)}>
        Increase
      </button>
    </div>
  );
};
```

- useLifeCycle

Support lifecycle methods to make code organization more readable, rather than using a bunch of useEffect.

```
import React from 'react';

import { useLifeCycle } from 'nice-hooks';

const App = () => {
  
  useLifeCycle({

    didMount() {
      // Do something after mounted
    },

    willUnmount() {
      // Do something when the component is about to be unmount
    },

    didUpdate() {
      // Do something after re-rendered.
    },

    didMountAndWillUnmount: [
      {
        didMount() {
          // Example a: setTimeout
          // Example b: on event
          // ...
        },
        willUnmount() {
          // Example a: clearTimeout
          // Example b: off event 
          // ...
        }
      }
    ]
  })

  return (
    <div></div>
  );
};
```

- useInstanceVar

Keep the instance value after every re-render.

```
# Example

import React, { useState } from 'react';

import { useInstanceVar } from 'nice-hooks';

const App = () => {

  const [intervalVal, setIntervalVal] = useInstanceVar(null);

  const [count, setCount] = useState(0);

  function start() {
    const interval = setInterval(() => setCount(oldVal => oldVal + 1), 1000);
    setIntervalVal(interval);
  }

  function stop() {
    clearInterval(intervalVal);
    setIntervalVal(null);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

```

## Contribute

* `git clone https://github.com/daniel-dx/nice-hooks.git`
* `cd nice-hooks`
* `npm install`
* `npm run test`
