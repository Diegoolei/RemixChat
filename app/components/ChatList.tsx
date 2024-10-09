import { Link, useRouteError } from '@remix-run/react';

import styles from './ChatList.css?url';


interface Chats {
  chatID: string;
  firstUserMessage: string;
  timeStamp: Date;
}

interface ChatListProps {
  chats: Chats[];
}

function ChatList({ chats }: ChatListProps) {
  return (
    <div id="chat-list">
      {chats.map((chat, index) => (
        <li key={chat.chatID} className="chat">
          <Link to={`/chats/${chat.chatID}`} className="chat-link">
            <article>
              <header>
                <ul className="chat-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time>
                      {chat.timeStamp.toString()}
                    </time>
                  </li>
                </ul>
                <h2>{chat.firstUserMessage}</h2>
              </header>
            </article>
          </Link>
        </li>
      ))}
    </div>
  );
}

export default ChatList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body>
        {<p className="error">{error.data}</p>}
      </body>
    </html>
  );
}