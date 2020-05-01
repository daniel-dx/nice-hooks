interface callbackFn {
  (): void
}

type partialStates<T> = { [K in keyof T]?: T[K] };

interface setSingleStateFn<T> {
  (partialStates: partialStates<T>, callback?: callbackFn): void;
}

interface getStateFn<T> {
  (): T
}

interface setStateFn<T> {
  (newState: T, callback?: callbackFn): void;
}

interface lifeCycle {
  didMount?: {(): void},
  willUnmount?: {(): void},
  didUpdate?: {(): void},
  didMountAndWillUnmount?: Array<{
    didMount: {(): void},
    willUnmount: {(): void}
  }>
}

interface getIntervalValFn<T> {
  (): T
}

interface setIntervalValFn<T> {
  (val: T): void
}

export function useStateCB<T>(initialState?:T): [getStateFn<T>, setStateFn<T>]

export function useSingleState<T>(initialState?:T): [T, setSingleStateFn<T>]

export function useLifeCycle(lifeCycle: lifeCycle): void

export function useInstanceVar<T>(initialValue?: T): [getIntervalValFn<T>, setIntervalValFn<T>]

export function useSingleInstanceVar<T>(initialState?:T): T