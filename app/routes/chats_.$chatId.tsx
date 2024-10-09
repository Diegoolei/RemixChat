import { json, redirect, useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { LinksFunction, ActionFunction, LoaderFunction } from "@remix-run/node";

import NewMessage, { links as newMessageLinks } from "~/components/NewMessage";
import MessageList, { links as messageListLinks } from "~/components/MessageList";
import { links as chatListLinks } from "~/components/ChatList";
import { getStoredMessages, storeMessages } from "~/utils/messages.js";

export default function ChatPage() {
  const Messages = useLoaderData();
  return (
    <main id="content">
      <div id="chat-container">
        <MessageList messages={Messages} />
        {(!Messages || Messages.length === 0) && (
          <img className="logo" src="/logo-light.png" />
        )}
        <NewMessage />
      </div>
    </main>
  );
};

export let loader: LoaderFunction = async ({ params }) => {
  const messages = await getStoredMessages(params.chatId);
  return json(messages);
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const messageData = Object.fromEntries(formData);
  const { chatId } = params;

  const existingMessages = await getStoredMessages(chatId);
  messageData.id = existingMessages.length + 1;
  messageData.user = 'user';
  messageData.timeStamp = new Date().toISOString();
  const updatedMessages = existingMessages.concat(messageData);

  await storeMessages(chatId, updatedMessages);
  return redirect(`/chats/${chatId}`);
};

export const links: LinksFunction = () => [
  ...newMessageLinks(),
  ...chatListLinks(),
  ...messageListLinks(),
];

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p className="info-message">{error.data.message}</p>
        <NewMessage />
      </div>
    );
  }

  let errorMessage = "Unknown error";
  errorMessage = error.data.message;


  return (
    <div className="error">
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}
