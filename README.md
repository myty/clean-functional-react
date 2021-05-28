# Clean Functional React

React hooks were first introduced in October 2018 and released with React v16.8.  Since then, we've been enamored with their simplicity and composability. Anyone that uses hooks extensively, quickly finds out that the components that consume them, get complicated and messy...real fast. Trying to do hooks in any large scale codebase becomes even more difficult, not to mention, testing is most likely an after thought. My hope, is to bring some clarity and structure to our custom react hooks and the components that use them.  The end goal is that our hooks are clean, organized, understandable, and dare I say testable. 😲

## Table of Contents

- [Clean Functional React](#clean-functional-react)
  - [Table of Contents](#table-of-contents)
    - [Reactive Data Flow Pattern](#reactive-data-flow-pattern)
      - [React Hooks](#react-hooks)
        - [useState](#usestate)
        - [useContext](#usecontext)
        - [useRef](#useref)
        - [useMemo](#usememo)
        - [useCallback](#usecallback)
        - [useReducer](#usereducer)
        - [useEffect](#useeffect)
      - [Clear Boundaries](#clear-boundaries)
    - [Anti-Patterns](#anti-patterns)
    - [Testability](#testability)

### Reactive Data Flow Pattern

One of the first difficulties encountered when working with hooks is trying to understand why a component rendered and re-rendered. It's why hooks such as [why-did-you-render](https://github.com/welldone-software/why-did-you-render) and [useWhyDidYouUpdate](https://usehooks.com/useWhyDidYouUpdate/) exist.

```text
// TODO
```

Properties returned from a hook should either be a data field or a command/action field.  It either gets something or does something. It should never be both. This closely follows the [command query separation principle](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation).

![react hooks data flow diagram](./docs/assets/clean-react-hook.drawio.svg)

- ❌ Avoid async functions that return data. _The example below is not only displaying the returned data, but also handling state and data flow logic. It is not doing a good job at separating concerns._

    ```typescriptreact
    const Component = (props: ComponentProps) => {
        const { id } = props;
        const [ error, setError ] = useState();
        const [ loading, setLoading ] = useState();
        const [ value, setValue ] = useState();
        const { getValue } = useSomeHook({ id });

        const load = useCallback(async () => {
            setLoading(true);

            try {
                const value = await getValue();
                setState(value);
            } catch (error) {
                setError(error);
            }

            setLoading(false);
        }, [getValue]);

        return (
            <div>
                <button onClick={load}>Load</button>
                <div>Value: {value}</div>
                <div>Loading: {loading}</div>
                <div>Error: {error}</div>
            </div>
        );
    }
    ```

- ✅ Prefer synchronous fire-and-forget action commands. Any returned data should flow back through the properties of the hook. _Components that consume a hook like this are easier to read and do a better job at separating concerns.  The component is only concerned with displaying the data returned from the hook rather than also handling state and data control logic._

    ```typescriptreact
    const Component = (props: ComponentProps) => {
        const { id } = props;
        const { value, error, loading, load } = useSomeHook({ id });

        return (
            <div>
                <button onClick={load}>Load</button>
                <div>Value: {value}</div>
                <div>Loading: {loading}</div>
                <div>Error: {error}</div>
            </div>
        );
    }
    ```

#### React Hooks

The built-in React hooks generally follow the command/query separation principle in two ways.

1. The hook itself either returns something or does something.
2. If the hook does return properties, they are either a command(action) or a query(data).

##### useState

```typescriptreact
const [state, setState] = useState<string>();
state    // [data]    -> string
setState // [command] -> (state: value) => void
         // [command] -> ((previousState: value) => string) => void
```

##### useContext

```typescriptreact
const value = useContext(MyContext);
value // [data] -> any
```

##### useRef

```typescriptreact
const ref = useRef<string>();
ref // [data] -> { current: string }
```

##### useMemo

```typescriptreact
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
memoizedValue // [data] -> any
```

##### useCallback

```typescriptreact
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
memoizedCallback // [command] -> () => any
```

##### useReducer

At first glance it appears that `useReducer` is doing something as well as also returning something, but in reality it is returning an action and data with zero side-effects.  The action is what will force the data to change and return.

```typescriptreact
const { state, dispatcher } = useReducer (
    (state, action) => state,
    { initialState }
);
state    // [data]    -> any
dispatch // [command] -> (action) => void
```

##### useEffect

useEffect is a special case and is actually an illustration where the hook itself is either a command or a query. Most hooks are returning something, but the `useEffect` hook is in fact __doing__ something.

```typescriptreact
useEffect(() => {
  if (a != null && b != null) {
    doSomething();
  }
}, [a, b]);
```

#### Clear Boundaries

- Eliminate confusion of where a change originates or why a component re-renders

```markdown
TODO
```

### Anti-Patterns

```markdown
TODO
```

### Testability

- Starting development of a component or hook with a TDD approach
  - Separate concerns
  - Enforce clean code guidelines
