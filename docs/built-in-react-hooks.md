# React Hooks

The built-in React hooks generally follow the command/query separation principle in two ways.

1. The hook itself either returns something or does something.
2. If the hook does return properties, they are either a command(action) or a query(data).

- [React Hooks](#react-hooks)
  - [useState](#usestate)
  - [useContext](#usecontext)
  - [useRef](#useref)
  - [useMemo](#usememo)
  - [useCallback](#usecallback)
  - [useReducer](#usereducer)
  - [useEffect](#useeffect)

## useState

```typescriptreact
const [state, setState] = useState<string>();
state    // [data]    -> string
setState // [command] -> (state: value) => void
         // [command] -> ((previousState: value) => string) => void
```

## useContext

```typescriptreact
const value = useContext(MyContext);
value // [data] -> any
```

## useRef

```typescriptreact
const ref = useRef<string>();
ref // [data] -> { current: string }
```

## useMemo

```typescriptreact
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
memoizedValue // [data] -> any
```

## useCallback

```typescriptreact
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
memoizedCallback // [command] -> () => any
```

## useReducer

At first glance it appears that `useReducer` is doing something as well as also returning something, but in reality it is returning an action and data with zero side-effects.  The action is what will force the data to change and return.

```typescriptreact
const { state, dispatcher } = useReducer (
    (state, action) => state,
    { initialState }
);
state    // [data]    -> any
dispatch // [command] -> (action) => void
```

## useEffect

useEffect is a special case and is actually an illustration where the hook itself is either a command or a query. Most hooks are returning something, but the `useEffect` hook is in fact __doing__ something.

```typescriptreact
useEffect(() => {
  if (a != null && b != null) {
    doSomething();
  }
}, [a, b]);
```