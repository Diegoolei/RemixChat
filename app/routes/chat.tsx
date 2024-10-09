import { json, redirect, useLoaderData, useRouteError, isRouteErrorResponse, Link, } from "@remix-run/react";
import { LinksFunction, ActionFunction } from "@remix-run/node";

import NewMessage, { links as newMessageLinks } from "~/components/NewMessage";
import ChatList, { links as chatListLinks } from "~/components/ChatList";
import { getStoredChats } from "~/utils/chat.js";

interface Chats {
  id: string;
  firstUserMessage: string;
  timeStamp: Date;
}

export default function ChatPage() {
  const chat = useLoaderData<Chats[]>();
  const random = Math.random();
  
  if (!chat || chat.length === 0) { return (
    <div>
      <p className="info-message">No chats found</p>
      <Link to={`/chats/${random}`} className="newChatLink">+</Link>
    </div>
  ); }
  return <main id="chat">
    <div className="main-container">
      <ChatList chats={chat} />
      <Link to={`/chats/${random}`} className="newChatLink">+</Link>
    </div>;
  </main>
}

export async function loader() {
  const message = await getStoredChats();
  return message
}

export const action: ActionFunction = async ({ request }) => {
}

export const links: LinksFunction = () => [
  ...newMessageLinks(), ...chatListLinks()
];

export function ErrorBoundary() {
  const error = useRouteError();
  const random = Math.random();
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p className="info-message">{error.data.message}</p>
        <Link to={`/chats/${random}`} className="newChatLink">+</Link>
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