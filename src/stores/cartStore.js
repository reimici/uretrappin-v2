import { persistentMap } from '@nanostores/persistent';

// Creiamo una mappa persistente (si salva da sola nel browser)
// La chiave sarà l'ID del prodotto, il valore la quantità.
// Esempio struttura interna: { '1': '2', '3': '1' } -> ID 1 (qta 2), ID 3 (qta 1)
export const cartItems = persistentMap('uretrappin-cart', {});

/**
 * Funzione per aggiungere un prodotto
 * @param {string} id - L'ID del prodotto
 */
export function addItem(id) {
  const existingEntry = cartItems.get()[id];
  const currentQty = existingEntry ? parseInt(existingEntry) : 0;
  
  // Aggiorna lo store impostando la nuova quantità (+1)
  cartItems.setKey(id, (currentQty + 1).toString());
  
  console.log(`[CART SYSTEM] Added Item ID: ${id}. New Qty: ${currentQty + 1}`);
}