import fs from 'fs/promises';

export async function getStoredChats() {
  let rawFileContent = await fs.readFile('messages.json', { encoding: 'utf-8' });
  if (!rawFileContent) {
    initChatFile();
    rawFileContent = await fs.readFile('messages.json', { encoding: 'utf-8' });
  }
  const data = JSON.parse(rawFileContent);
  const storedChats = data.chat ?? []; // Acceder a la clave correcta

  // Filtrar para obtener chatID y el texto del primer mensaje de user
  const result = storedChats.map(chat => {
    const userMessage = chat.messages.find(message => message.user === 'user');
    return {
      chatID: chat.chatID,
      firstUserMessage: userMessage.text || null, // Retornar null si no hay mensaje de user
      timeStamp: userMessage.timeStamp || null,
    };
  });

  return result; // Devolver el array con chatID y el primer mensaje de user
}

export function storeChat(chats) {
  return fs.writeFile('messages.json', JSON.stringify({ chats: chats || [] }));
}

export function initChatFile() {
  fs.writeFile('messages.json', JSON.stringify({ chat: [] }));
}