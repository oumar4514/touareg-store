const products = [
  { id: 1, title: "Marketing Digital 2025", price: 19.99, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", description: "Guide pratique pour développer ta présence en ligne et booster tes ventes." },
  { id: 2, title: "Freelance Starter", price: 24.99, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", description: "Tout pour commencer ton activité freelance de manière simple et rentable." },
  { id: 3, title: "Design d'Interface", price: 21.99, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", description: "Apprends à créer des interfaces belles, modernes et faciles à utiliser." },
  { id: 4, title: "Gestion du Temps", price: 17.99, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", description: "Booste ta productivité et organise ta journée comme un pro." },
  { id: 5, title: "Communication Persuasive", price: 18.99, image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", description: "Apprends à mieux convaincre, vendre et transmettre ton message." },
  { id: 6, title: "Stratégie de Vente", price: 29.99, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", description: "Une méthode simple pour vendre plus sans stress." },
  { id: 7, title: "Création de Brand", price: 25.99, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80", description: "Construis une identité de marque forte et mémorable." },
  { id: 8, title: "Langue Anglaise", price: 16.99, image: "https://images.unsplash.com/photo-1516979187454-437ec7d5d8d5?auto=format&fit=crop&w=800&q=80", description: "Améliore ton anglais professionnel et ta communication." },
  { id: 9, title: "Monétiser un Blog", price: 22.99, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", description: "Découvre les meilleures méthodes pour générer des revenus avec ton blog." },
  { id: 10, title: "E-commerce Débutant", price: 27.99, image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80", description: "Crée et lance ta boutique en ligne sans erreurs." },
  { id: 11, title: "Vendre sur Internet", price: 26.99, image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80", description: "Apprends à vendre des produits ou services en ligne avec efficacité." },
  { id: 12, title: "Le Business Digital", price: 31.99, image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80", description: "Un guide pratique pour lancer et développer une activité digitale rentable." }
];
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");
const cartPanel = document.getElementById("cartPanel");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");

function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="price">${product.price.toFixed(2)} €</span>
          <button class="add-btn" data-id="${product.id}">Ajouter</button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.id));
    });
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const item = cart.find((c) => c.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Votre panier est vide.</p>";
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";

      row.innerHTML = `
        <div>
          <h4>${item.title}</h4>
          <p>${item.quantity} x ${item.price.toFixed(2)} €</p>
        </div>
        <button data-id="${item.id}">Supprimer</button>
      `;

      cartItems.appendChild(row);
    });

    document.querySelectorAll(".cart-item button").forEach((button) => {
      button.addEventListener("click", () => {
        removeFromCart(Number(button.dataset.id));
      });
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `${total.toFixed(2)} €`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    cartCount.textContent = "0";
  }
}

cartButton.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

renderProducts();
renderCart();