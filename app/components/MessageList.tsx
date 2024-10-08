import { LinksFunction } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';


import MessageListStyle from './MessageList.css?url';

function MessageList(inputMessages) {
    const Messages = inputMessages.messages;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Hace scroll al final del contenedor de mensajes
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [Messages]); // Se activa cuando Messages cambia

    return (
        <div id="messages">
            {Messages.map((message) => (
                <div key={message.id} className={`message ${message.user === 'bot' ? 'bot' : 'user'}`}>
                    {message.user === 'bot' ? (
                        <div className="message-with-icon">
                            <div className="icon-container">
                                <img src="/logo-light.png" alt="Bot Icon" className="icon" />
                            </div>
                            <div className="message-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {message.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        <div className="message-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {message.text}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} /> {/* Referencia al final de los mensajes */}
        </div>);

}

export default MessageList;

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: MessageListStyle },
];

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
