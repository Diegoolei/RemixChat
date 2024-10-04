import { Link, useRouteError } from '@remix-run/react';

import styles from './ChatList.css?url';


interface Chats {
  id: string;
  title: string;
  content: string;
}

interface ChatListProps {
  chats: Chats[];
}

function ChatList({ chats }: ChatListProps) {
  return (
    <ul id="chat-list">
      {chats.map((chat, index) => (
        <li key={chat.id} className="chat">
          <Link to={`/chats/${chat.id}`} className="chat-link">
            <article>
              <header>
                <ul className="chat-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={chat.id}>
                      {new Date(chat.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{chat.title}</h2>
              </header>
              <p>{chat.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
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