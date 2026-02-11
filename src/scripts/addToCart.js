// src/scripts/addToCart.js
import { addItem } from '../stores/cartStore';

document.addEventListener('astro:page-load', () => {
  const btn = document.getElementById('add-btn');
  
  if (btn) {
    // Rimuoviamo eventuali vecchi listener per evitare duplicati nelle transizioni
    // (Pattern avanzato: cloneNode o uso di { once: true }, ma qui gestiamo con replace semplice)
    const newBtn = btn.cloneNode(true);
    if(btn.parentNode) {
        btn.parentNode.replaceChild(newBtn, btn);
    }

    newBtn.addEventListener('click', () => {
      const id = newBtn.getAttribute('data-id');
      if (!id) return;

      addItem(id);
      
      const spanText = newBtn.querySelector('span');
      if (spanText) {
          const originalText = spanText.innerText;
          spanText.innerText = "AGGIUNTO!";
          
          setTimeout(() => {
             spanText.innerText = originalText;
          }, 1000);
      }
    });
  }
});