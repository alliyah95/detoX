/* used by the content and background scripts */
type ProcessingState = "tweetProcessingError" | "tweetProcessingSuccess";
interface ProcessingStateObject {
    action?: ProcessingState;
}
enum TwitterTheme {
    White = "css-1dbjc4n r-j5o65s r-qklmqi r-1adg3ll r-1ny4l3l",
    Dim = "css-1dbjc4n r-1ila09b r-qklmqi r-1adg3ll r-1ny4l3l",
    Dark = "css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l",
}
type TweetBodyWrapper = HTMLDivElement | Node | ChildNode;
interface LocalStorage {
    extensionEnabled?: boolean;
}

/* used by the popup */
interface ReactNode {
    children?: React.ReactNode;
}
type MessageType = "info" | "error";
interface MessageBoxProps {
    message: string;
    type: MessageType;
    forceMultiline: boolean;
}
interface ToggleProps {
    isOn: boolean;
    onChange: (newState: boolean) => void;
}
interface AboutCardProps {
    heading: string;
    description: string;
    icon: React.ReactNode;
}

interface CTAProps {
    linkTo: string;
    buttonText: string;
}

export {
    ProcessingState,
    ProcessingStateObject,
    TwitterTheme,
    ReactNode,
    MessageType,
    MessageBoxProps,
    ToggleProps,
    TweetBodyWrapper,
    LocalStorage,
    AboutCardProps,
    CTAProps,
};
