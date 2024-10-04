import { LinksFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation, useRouteError } from '@remix-run/react';

import NewMessageStyle from './NewMessage.css?url';


function NewMessage() {
  const navigation = useNavigation()
  const isSubmiting = navigation.state === 'submitting'
  return (
    <Form method="post" id="message-form" action="">
      <input type="text" name="text" placeholder="Escribe un mensaje..." required />
      <div className="form-actions">
        <button disabled={isSubmiting}> {isSubmiting ? "Waiting..." : "Send Message"}</button>
      </div>
    </Form>
  );
}

export default NewMessage;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: NewMessageStyle },
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