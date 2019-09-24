# useStateCB React Hook

Let react useState hook has callback capability.

## Installation

`npm install use-state-cb`

## Usage

```
import React from 'react';

import useStateCB from 'use-state-cb';

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

## Contribute

* `git clone https://github.com/daniel-dx/use-state-cb.git`
* `cd use-state-cb`
* `npm install`
* `npm run test`
