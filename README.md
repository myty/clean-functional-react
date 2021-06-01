# Clean Functional React

React hooks were first introduced in October 2018 and released with React v16.8.  Since then, we've been enamored with their simplicity and composability. Anyone that uses hooks extensively, quickly finds out that the components that consume them, get complicated and messy...real fast. Trying to do hooks in any large scale codebase becomes even more difficult, not to mention, testing is most likely an after thought. My hope, is to bring some clarity and structure to our custom react hooks and the components that use them.  The end goal is that our hooks are clean, organized, understandable, and dare I say testable. 😲

## Table of Contents

- [Clean Functional React](#clean-functional-react)
  - [Table of Contents](#table-of-contents)
    - [Pitfalls](#pitfalls)
      - [Why Did I Render?](#why-did-i-render)
    - [What makes a clean hook?](#what-makes-a-clean-hook)
      - [Observation One](#observation-one)
      - [Observation Two](#observation-two)
      - [Observation Three](#observation-three)
      - [Observation Four](#observation-four)
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

### Pitfalls

While writing React apps in a functional manner enables composibility, it also enables you to create some headaches for yourself.

#### Why Did I Render?

One of the first difficulties encountered when working with hooks is trying to understand why a component rendered and re-rendered. It's why hooks such as [why-did-you-render](https://github.com/welldone-software/why-did-you-render) and [useWhyDidYouUpdate](https://usehooks.com/useWhyDidYouUpdate/) exist.

```text
// TODO
```

### What makes a clean hook?

Clean hooks are easy to understand, maintian and test. When done well, components that consume hooks do not need to handle much state or control flow logic.

#### Observation One

Properties returned from a hook are either data fields or commands.  They either get something or do something. It is never be both.

#### Observation Two

Data fields are properties and not methods

#### Observation Three

Commands are fire-and-forget methods.  They do not return a value such as a Promise.

#### Observation Four

The ceremony of hooks and components act in part as MVC. The hook is the Controller, the data return as the model, the commands as the action on the on the controller. This leaves the compnent to mearly be the view.  All that it needs to concern itself with is how it will display the data returned from the hooks.

### Reactive Data Flow Pattern

From these observations the pattern that has emerged I'd propose calling the **Reactive Data Flow** pattern. If you look closely, it draws inspiration and influence from Model-View-Controller (MVC) and the [Command Query Separation Principle](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation) (CQS)

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
