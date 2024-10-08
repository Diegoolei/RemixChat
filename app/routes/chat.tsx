import { json, redirect, useLoaderData, useRouteError, isRouteErrorResponse, Link, } from "@remix-run/react";
import { LinksFunction, ActionFunction } from "@remix-run/node";

import NewChat, { links as newChatLinks } from "~/components/NewMessage";
import ChatList, { links as chatListLinks} from "~/components/ChatList";
import { getStoredChats, storeChat } from "~/utils/chat.js";


interface Chats {
    id: string;
    title: string;
    content: string;
}

export default function ChatPage() {
    const chat = useLoaderData<Chats[]>();
    return <main id="chat">
        <>
            <ChatList chats={chat} />
            <Link to="/chat">New Chat</Link>
        </>;
    </main>
}

export async function loader() {
    const message = await getStoredChats();
    if (!message || message.length === 0) { throw json({message: "No Chats started"}, { status: 200 }); }
    return message
}

export const action: ActionFunction = async ({ request }) => {
}

export const links: LinksFunction = () => [
    ...newChatLinks(), ...chatListLinks()
];

export function ErrorBoundary() {
    const error = useRouteError();
  
    // when true, this is what used to go to `CatchBoundary`
    if (isRouteErrorResponse(error)) {
      return (
        <div>
          <p className="info-message">{error.data.message}</p>
        </div>
      );
      //TODO: Add NewChat component
    }
  
    // Don't forget to typecheck with your own logic.
    // Any value can be thrown, not just errors!
    let errorMessage = "Unknown error";
    if (isRouteErrorResponse(error)) {
      errorMessage = error.data.message;
    }
  
    return (
      <div className="error">
        <h1>Uh oh ...</h1>
        <p>Something went wrong.</p>
        <pre>{errorMessage}</pre>
      </div>
    );
  }