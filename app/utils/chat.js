import fs from 'fs/promises';

export async function getStoredChats() {
  const rawFileContent = await fs.readFile('chats.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedChats = data.chats ?? [];
  return storedChats;
}

export function storeChat(chats) {
  return fs.writeFile('chats.json', JSON.stringify({ chats: chats || [] }));
}
