# clean functional react _(needs a better title)_

React hooks were first introduced in October 2018 and released with React v16.8.  Since then, we've been enamored with their simplicity and composability. Anyone that uses hooks extensively, quickly finds out that the components that consume them, get complicated and messy...real fast. Trying to do hooks in any large scale codebase becomes even more difficult, not to mention, testing is most likely an after thought. My hope, is to bring some clarity and structure to our custom react hooks and the components that use them.  The end goal is that our hooks are clean, organized, understandable, and dare I say testable. 😲

## Guidelines

- ✅ Good hooks are easy to understand, easy to maintian and easy to test.

- ✅ Limit your hook parameters.  Aim to keep them as small and few as possible.

  _A parameter is a dependecy which means there are more reasons to update._

- ✅ Prefer properties that are either data fields or commands.

- ✅ Prefer data property fields over methods.

- ✅ Prefer fire-and-forget commands over promises.

  It's common to want to use a promise or callback that returns data when doing something such as updating or loading data. If the result is needed it is better to return any data back through the properties of the hook.

  _Components that consume hooks like this are easier to read and do a better job at separating concerns.  The component is only concerned with displaying the data returned from the hook rather than also handling state and data control logic. It is also much easier to test both the component and the hook._

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

- ❌ Avoid async functions that return data.

  _The example below is not only displaying the returned data, but also handling state and data flow logic. This should be avoided inmost situations._

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

## Reactive Data Flow Pattern

Based on the preceding guidelines, I'd like to call this the **Reactive Data Flow** pattern. If you look closely, it draws direct inspiration from the [Command Query Separation Principle](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation) (CQS)

![react hooks data flow diagram](../docs/assets/clean-react-hook.drawio.svg)

## Testability

Starting development of a component or hook with a TDD approach

- Separate concerns
- Enforce clean code guidelines

## Further Reading

- [Built-In React Hooks](./docs/built-in-react-hooks.md)