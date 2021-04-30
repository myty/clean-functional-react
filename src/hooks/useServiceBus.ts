export interface Event {
    data: Object;
}

export interface Message {
    type: string;
}

export interface MessageEvent<T extends Message> extends Event {
    data: T;
}

export interface MessageEventMap {
    message: MessageEvent<{ type: "message" }>;
    on: MessageEvent<{ type: "on" }>;
    off: MessageEvent<{ type: "off" }>;
}

interface UseMessageBusResult<T extends keyof MessageEventMap> {
    events: Array<MessageEventMap[T]>;
}

export function useMessageBus<T extends keyof MessageEventMap>(
    messageType: T
): UseMessageBusResult<T> {
    return {
        events: [],
    };
}

export function useOnMessageBusEvent<T extends keyof MessageEventMap>(
    messageType: T,
    onEvent: (event: MessageEventMap[T]) => void
): void {}

const Component = () => {
    useOnMessageBusEvent("message", (event) => {
        event.data.type;
    });

    return <div></div>;
};
