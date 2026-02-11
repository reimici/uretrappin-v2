import { cartItems, addItem, decreaseItem, removeItem } from '../stores/cartStore';
import prodotti from '../data/prodotti.json';

document.addEventListener('astro:page-load', () => {
  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');
  const totalEl = document.getElementById('cart-total-price');
  const clearBtn = document.getElementById('clear-cart-btn');

  // 1. GESTIONE CLICK (Event Delegation)
  // Intercettiamo i click su tutto il contenitore carrello
  if (container) {
    container.addEventListener('click', (e) => {
      const target = e.target.closest('button'); // Cerca il bottone cliccato
      if (!target) return;

      const action = target.dataset.action;
      const id = target.dataset.id;

      if (action === 'increase') addItem(id);
      if (action === 'decrease') decreaseItem(id);
      if (action === 'remove') removeItem(id);
      
      // Il renderCart avverrà automaticamente perché siamo iscritti allo store?
      // No, dobbiamo chiamare renderCart. Ma aspetta!
      // Se chiamiamo renderCart qui, lo chiamiamo due volte (una per il click, una per la sottoscrizione).
      // Meglio lasciare che sia cartItems.subscribe a ridisegnare tutto.
    });
  }

  // 2. FUNZIONE DI RENDER (Reattiva)
  function renderCart() {
      if (!container) return;

      const cartData = cartItems.get() || {}; 
      const itemIds = Object.keys(cartData);

      // CASO VUOTO
      if (itemIds.length === 0) {
          container.innerHTML = `<div class="empty-state">IL TUO CARRELLO È VUOTO.<br><a href="/">TORNA ALLO SHOP</a></div>`;
          if (footer) footer.style.display = 'none';
          return;
      }

      // CASO PIENO
      container.innerHTML = '';
      let grandTotal = 0;

      itemIds.forEach(id => {
          const qty = parseInt(cartData[id]);
          if (qty > 0) {
              const product = prodotti.find(p => String(p.id) === id);
              
              if (product) {
                  const lineTotal = parseFloat(product.prezzo) * qty;
                  grandTotal += lineTotal;

                  const itemHTML = `
                      <div class="cart-item">
                          <img src="${product.img_fronte}" alt="${product.nome}" class="cart-thumb">
                          
                          <div class="item-details">
                              <h3>${product.nome}</h3>
                              <p class="item-single-price">€ ${product.prezzo}</p>
                              
                              <div class="qty-controls">
                                  <button class="qty-btn" data-action="decrease" data-id="${id}">−</button>
                                  <span class="qty-display">${qty}</span>
                                  <button class="qty-btn" data-action="increase" data-id="${id}">+</button>
                              </div>
                          </div>

                          <div class="item-actions">
                              <div class="item-total">€ ${lineTotal.toFixed(2)}</div>
                              <button class="remove-btn" data-action="remove" data-id="${id}">ELIMINA</button>
                          </div>
                      </div>
                  `;
                  container.innerHTML += itemHTML;
              }
          }
      });

      if (totalEl) totalEl.innerText = '€ ' + grandTotal.toFixed(2);
      if (footer) footer.style.display = 'flex';
  }

  // 3. COLLEGAMENTO REATTIVO
  // Ogni volta che lo store cambia (da ovunque), ridisegniamo la lista.
  // Questo sostituisce la chiamata manuale renderCart() all'avvio.
  const unsubscribe = cartItems.subscribe(() => {
     renderCart();
  });

  // Gestione tasto SVUOTA TUTTO
  if (clearBtn) {
      // Clone per pulire vecchi listener
      const newBtn = clearBtn.cloneNode(true);
      if(clearBtn.parentNode) clearBtn.parentNode.replaceChild(newBtn, clearBtn);

      newBtn.addEventListener('click', () => {
          if(confirm('SEI SICURO DI VOLER CANCELLARE TUTTO?')) {
              cartItems.set({});
          }
      });
  }
});