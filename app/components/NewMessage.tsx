import { LinksFunction } from "@remix-run/node";
import { Form, useNavigation, useRouteError } from '@remix-run/react';
import { useState } from 'react';

import NewMessageStyle from './NewMessage.css?url';

function NewMessage() {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // Puedes realizar otras acciones aquí si es necesario
    setInputValue(''); // Limpia el campo de entrada después de enviar
  };

  return (
    <Form method="post" id="message-form" action="" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          name="text"
          placeholder="Escribe un mensaje..."
          required
          value={inputValue}
          onChange={handleChange}
          maxLength={255}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            "Waiting..."
          ) : (
            <img src="/icons/arrow-up.jpg" alt="Enviar" style={{ width: '20px', height: '20px' }} />
          )}
        </button>
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
