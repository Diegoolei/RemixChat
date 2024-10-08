import { json, redirect, useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { LinksFunction, ActionFunction, LoaderFunction } from "@remix-run/node";

import NewChat, { links as newChatLinks } from "~/components/NewMessage";
import MessageList, { links as messageListLinks } from "~/components/MessageList";
import { links as chatListLinks } from "~/components/ChatList";
import { getStoredMessages, storeMessages } from "~/utils/messages.js";

export default function ChatPage() {
  const Messages = useLoaderData();
  return (
    <main id="content">
      <div id="chat-container">
        <MessageList messages={Messages} />
        <NewChat />
      </div>
    </main>
  );
};

export let loader: LoaderFunction = async () => {
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
};

export const links: LinksFunction = () => [
  ...newChatLinks(),
  ...chatListLinks(),
  ...messageListLinks(),
];

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p className="info-message">{error.data.message}</p>
        <NewChat />
      </div>
    );
  }

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
