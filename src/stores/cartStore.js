import { persistentMap } from '@nanostores/persistent';

export const cartItems = persistentMap('uretrappin-cart', {});

/**
 * Aumenta la quantità (+1)
 */
export function addItem(id) {
  const existingEntry = cartItems.get()[id];
  const currentQty = existingEntry ? parseInt(existingEntry) : 0;
  cartItems.setKey(id, (currentQty + 1).toString());
}

/**
 * Diminuisce la quantità (-1). Se arriva a 0, rimuove l'oggetto.
 */
export function decreaseItem(id) {
  const existingEntry = cartItems.get()[id];
  const currentQty = existingEntry ? parseInt(existingEntry) : 0;

  if (currentQty > 1) {
    // Sottrai 1
    cartItems.setKey(id, (currentQty - 1).toString());
  } else {
    // Se è 1 e tolgo 1, rimuovo tutto
    removeItem(id);
  }
}

/**
 * Rimuove totalmente l'oggetto dal carrello (Tasto Cestino)
 */
export function removeItem(id) {
  // In Nano Stores, impostare a undefined rimuove la chiave
  cartItems.setKey(id, undefined); 
}