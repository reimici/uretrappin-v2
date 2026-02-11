// src/scripts/cartWidget.js
import { cartItems } from '../stores/cartStore';

// Sottoscrizione alle modifiche del carrello
cartItems.subscribe((value) => {
  const countElement = document.getElementById('cart-count');
  
  if (countElement && countElement.parentElement) {
    const values = Object.values(value || {});
    
    // Calcolo totale sicuro
    const total = values.reduce((acc, qty) => {
        return acc + parseInt(String(qty));
    }, 0);
    
    countElement.innerText = total.toString();
    
    // Effetto Pulse
    const parent = countElement.parentElement;
    parent.classList.add('updated');
    
    setTimeout(() => {
      parent.classList.remove('updated');
    }, 300);
  }
});