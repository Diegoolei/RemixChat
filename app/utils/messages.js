import fs from 'fs/promises';

export async function getStoredMessages(chatID) {
  const rawFileContent = await fs.readFile('messages.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);

  // Verificar si existe un chat con el chatID proporcionado
  const chat = data.chat.find(c => c.chatID === chatID);
  
  // Si se encuentra el chat, devolver sus mensajes; de lo contrario, devolver un array vacío
  return chat ? chat.messages : [];
}
export async function storeMessages(chatID, newMessage) {
  let data;

  // Leer el archivo y parsear su contenido
  try {
    const rawFileContent = await fs.readFile('messages.json', { encoding: 'utf-8' });
    data = JSON.parse(rawFileContent);
  } catch (error) {
    data = { chat: [] }; // Si el archivo no existe, inicializa con un array vacío
  }

  // Buscar si el chat ya existe
  const existingChat = data.chat.find(c => c.chatID === chatID);
  
  if (existingChat) {
    // Si existe, reemplazar los mensajes con el nuevo mensaje
    existingChat.messages = newMessage; // Guardar solo el último mensaje
  } else {
    // Si no existe, añadir un nuevo chat con el nuevo mensaje
    data.chat.push({ chatID, messages: newMessage });
  }

  // Escribir el archivo actualizado
  await fs.writeFile('messages.json', JSON.stringify(data, null, 2)); // Formato legible
}