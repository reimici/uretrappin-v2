import { cartItems } from '../stores/cartStore';

// Funzione centralizzata per calcolare e stampare il totale
function updateWidgetUI(mapValue) {
  const countElement = document.getElementById('cart-count');
  
  if (countElement) {
    const values = Object.values(mapValue || {});
    const total = values.reduce((acc, qty) => acc + parseInt(String(qty)), 0);
    
    // Aggiorniamo il testo
    countElement.innerText = total.toString();
    
    // NOTA: Non facciamo l'animazione "pulse" qui, altrimenti
    // lampeggerebbe a ogni cambio pagina, il che è fastidioso.
  }
}

// 1. Sottoscrizione Reattiva (Scatta quando AGGIUNGI qualcosa)
cartItems.subscribe((value) => {
  updateWidgetUI(value);
  
  // L'effetto Pulse lo vogliamo SOLO quando i dati cambiano davvero
  const countElement = document.getElementById('cart-count');
  if (countElement && countElement.parentElement) {
      countElement.parentElement.classList.add('updated');
      setTimeout(() => countElement.parentElement.classList.remove('updated'), 300);
  }
});

// 2. Sottoscrizione alla Navigazione (Scatta quando CAMBI PAGINA)
document.addEventListener('astro:page-load', () => {
  // Leggiamo lo stato attuale "a freddo" e forziamo l'aggiornamento grafico
  const currentState = cartItems.get();
  updateWidgetUI(currentState);
});