import { json, useLoaderData, useRouteError, isRouteErrorResponse, Link, MetaFunction } from "@remix-run/react";
import { LinksFunction, ActionFunction } from "@remix-run/node";

import { links as newMessageLinks } from "~/components/NewMessage";
import ChatList, { links as chatListLinks } from "~/components/ChatList";
import { getStoredChats, initChatFile } from "~/utils/chat.js";

interface Chats {
  id: string;
  firstUserMessage: string;
  timeStamp: Date;
}

export default function ChatPage() {
  const chat = useLoaderData<Chats[]>();
  const chatID = Math.random();

  return (
    <main id="chat">
      <div className="main-container">
        {(!chat || chat.length === 0) ? (
          <p className="info-message">No chats found</p>
        ) : (
          <ChatList chats={chat} />
        )}
        <Link to={`/chats/${chatID}`} className="newChatLink">+</Link>
      </div>
    </main>
  );
}


export async function loader() {
  const message = await getStoredChats();
  if (!message) {
    initChatFile();
    return json({ message: "No chats found" }, { status: 404 });
  }
  return message
}

export const action: ActionFunction = async ({ request }) => {
}

export const links: LinksFunction = () => [
  ...newMessageLinks(), ...chatListLinks()
];

export function ErrorBoundary() {
  const error = useRouteError();
  const chatID = Math.random();
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p className="info-message">{error.data.message}</p>
        <Link to={`/chats/${chatID}`} className="newChatLink">+</Link>
      </div>
    );
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

export const meta: MetaFunction = () => {
  return [
    { title: " ChatAI | CMCABA" },
    {
      property: "og:title",
      content: "¡Bienvenido a el chat oficial de CMCABA!",
    },
    {
      name: "description",
      content: "¡Bienvenido a el chat oficial de CMCABA!",
    },
  ];
};