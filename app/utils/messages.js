import fs from 'fs/promises';

export async function getStoredMessages() {
  const rawFileContent = await fs.readFile('messages.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedMessages = data.messages ?? [];
  return storedMessages;
}

export function storeMessages(messages) {
  return fs.writeFile('messages.json', JSON.stringify({ messages: messages || [] }));
}
