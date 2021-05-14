# Clean Functional React

React hooks was released in 2019.  Since then, we've been enamored with their simplicity and composability. Anyone that uses hooks extensively, quickly finds out that the components that consume them, get complicated and messy...real fast. Trying to do hooks in any large scale codebase becomes even more difficult, not to mention, testing is most likely an after thought. My hope with this series is to bring some clarity and structure to our custom react hooks and the components that use them.  The end goal is that our hooks are clean, organized, understandable, and dare I say testable. 😲

## Table of Contents

- [Clean Functional React](#clean-functional-react)
  - [Table of Contents](#table-of-contents)
    - [Reactive Data Flow Pattern](#reactive-data-flow-pattern)
      - [Command-Query Separation](#command-query-separation)
        - [useState](#usestate)
        - [useEffect](#useeffect)
        - [useContext](#usecontext)
        - [useRef](#useref)
        - [useMemo](#usememo)
        - [useCallback](#usecallback)
      - [Clear Boundaries](#clear-boundaries)
    - [Anti-Patterns](#anti-patterns)
    - [Testability](#testability)

### Reactive Data Flow Pattern

![react hooks data flow diagram](./docs/assets/clean-react-hook.drawio.svg)

- Properties returned from a hook should either be a data field or a command/action field.  It either gets something or does something. It should never be both. This is usually referred to as the command query separation principle. Further more, while you should avoid returning async actions from a hook, you should avoid awaiting an async command from within a component. Reasons for this are illustrated in the following example: `TODO`

#### Command-Query Separation

The built-in React hooks generally follow the command/query separation principle in two ways.

1. The hook itself either returns something or does something.
2. If the hook does return properties, they are either a command or a query(data).

##### useState

```typescriptreact
const [state, setState] = useState<string>();
state    // [data]    -> string
setState // [command] -> (state: value) => void
         // [command] -> ((previousState: value) => string) => void
```

##### useEffect

useEffect is an illustration where the hook itself is either a command or a query. Most hooks are returning something, but the `useEffect` hook is in fact __doing__ something.

```typescriptreact
useEffect(() => {
  if (a != null && b != null) {
    doSomething();
  }
}, [a, b]);
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
