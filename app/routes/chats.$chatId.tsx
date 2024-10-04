import { json, redirect, useLoaderData, useRouteError, isRouteErrorResponse,  } from "@remix-run/react";
import { LinksFunction, ActionFunction, LoaderFunction,  } from "@remix-run/node";

import NewChat, { links as newChatLinks } from "~/components/NewMessage";
import { links as chatListLinks } from "~/components/ChatList";
import { getStoredMessages, storeMessages } from "~/utils/messages.js";


export default function ChatPage() {
  const botMessages = useLoaderData();
  return <main id="content">
    <>
      <div id="chat-container">
        <div id="messages">
          {botMessages.map((message) => (
            <div key={message.id} className={`message ${message.user === 'bot' ? 'bot' : 'user'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <NewChat />
      </div>
    </>;
  </main>
}

export let loader: LoaderFunction = async () => {
  // const response = await fetch(); // fetch messages from the server
  // const messages = await response.json();
  const messages = await getStoredMessages();
  return json(messages);
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const messageData = Object.fromEntries(formData);

  const existingMessages = await getStoredMessages();
  messageData.id = existingMessages.length + 1;
  messageData.user = 'user';
  const updatedMessages = existingMessages.concat(messageData);
  await storeMessages(updatedMessages);
  return redirect(`/chats/${params.chatId}`);
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
        <NewChat />
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