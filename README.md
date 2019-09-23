# useStateCB React Hook

Let react useState hook have callback capability.

## Installation

`npm install use-state-cb`

## Usage

```
import React from 'react';

import useStateCB from 'use-state-cb';

const App = () => {
  const [count, setCount] = useStateCB(0);

  return (
    <div>
      {count}

      <button type="button" onClick={() => setCount(count + 1, count => { console.log("count's value after rendering:" + count) })}>
        Increase
      </button>
    </div>
  );
};
```

## Contribute

* `git clone https://github.com/daniel-dx/use-state-cb.git`
* `cd use-state-with-callback`
* `npm install`
* `npm run test`
