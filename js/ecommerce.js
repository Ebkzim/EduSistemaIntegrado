
document.addEventListener('DOMContentLoaded', function() {
    
    setupEventListeners();
    loadProducts();
    updateCartCount();
  });
  
  
  const cartItems = []; 
  const discountCoupons = {
    'EDU10': 10, 
    'EDU20': 20, 
    'BLACKFRIDAY': 30 
  };
  let appliedCoupon = null;
  let shippingCost = 0;
  
  
  const products = [
    {
        id: 1,
        name: 'Processador AMD Ryzen 7 5800X',
        category: 'processor',
        price: 1999.90,
        salePrice: 1799.90,
        rating: 4.8,
        reviews: 356,
        image: 'https://m.media-amazon.com/images/I/61DYLoyNRWL._AC_SX679_.jpg',
        description: 'Processador AMD Ryzen 7 5800X, 8 núcleos, 16 threads, 3.8GHz (4.7GHz Max Boost), Cache 36MB, AM4, Sem Vídeo.'
      },
      {
        id: 2,
        name: 'Placa de Vídeo NVIDIA RTX 3070',
        category: 'gpu',
        price: 3999.90,
        salePrice: 3699.90,
        rating: 4.9,
        reviews: 289,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxH7QjlyWrp5qGOJDcDWGYBvzcWSwP4-CelA&s',
        description: 'Placa de Vídeo NVIDIA GeForce RTX 3070, 8GB GDDR6, DLSS, Ray Tracing, design térmico avançado.'
      },
      {
        id: 3,
        name: 'Placa-Mãe ASUS ROG Strix B550-F',
        category: 'motherboard',
        price: 1499.90,
        salePrice: null,
        rating: 4.7,
        reviews: 124,
        image: 'https://m.media-amazon.com/images/I/81x069mwcbL._AC_SX679_.jpg',
        description: 'Placa-Mãe ASUS ROG Strix B550-F Gaming WiFi 6, AMD AM4, ATX, PCIe 4.0, Intel 2.5Gb Ethernet, SATA 6Gbps, USB 3.2 Gen 2.'
      },
      {
        id: 4,
        name: 'Memória RAM Corsair Vengeance RGB Pro 16GB',
        category: 'memory',
        price: 599.90,
        salePrice: 549.90,
        rating: 4.8,
        reviews: 216,
        image: 'https://images.kabum.com.br/produtos/fotos/108450/memoria-corsair-vengeance-rgb-pro-16gb-2x8gb-3600mhz-ddr4-cl18-cmw16gx4m2z3600c18_1575379797_g.jpg',
        description: 'Memória RAM Corsair Vengeance RGB Pro 16GB (2x8GB) DDR4 3200MHz, iluminação RGB dinâmica, PCB personalizado.'
      },
      {
        id: 5,
        name: 'SSD Samsung 970 EVO Plus 1TB',
        category: 'storage',
        price: 999.90,
        salePrice: 899.90,
        rating: 4.9,
        reviews: 342,
        image: 'https://m.media-amazon.com/images/I/81zE8qvJbdL._AC_UF894,1000_QL80_.jpg',
        description: 'SSD Samsung 970 EVO Plus, 1TB, M.2, NVMe, Leitura 3500MB/s, Gravação 3300MB/s, tecnologia V-NAND.'
      },
      {
        id: 6,
        name: 'Gabinete Corsair 4000D Airflow',
        category: 'case',
        price: 799.90,
        salePrice: null,
        rating: 4.7,
        reviews: 178,
        image: 'https://images.kabum.com.br/produtos/fotos/115451/gabinete-gamer-corsair-4000d-airflow-mid-tower-atx-lateral-em-vidro-temperado-com-2x-fan-preto-cc-9011200-ww_1728041901_gg.jpg',
        description: 'Gabinete Corsair 4000D Airflow Mid-Tower, fluxo de ar otimizado, gerenciamento de cabos, painel lateral em vidro temperado.'
      },
      {
        id: 7,
        name: 'Fonte de Alimentação EVGA 750W 80 Plus Gold',
        category: 'power',
        price: 899.90,
        salePrice: 849.90,
        rating: 4.8,
        reviews: 205,
        image: 'https://images.kabum.com.br/produtos/fotos/60443/60443_index_g.jpg',
        description: 'Fonte de Alimentação EVGA SuperNOVA 750 G5, 750W, 80 Plus Gold, totalmente modular, Eco Mode, garantia de 10 anos.'
      },
      {
        id: 8,
        name: 'Monitor Gamer LG UltraGear 27"',
        category: 'peripheral',
        price: 2499.90,
        salePrice: 2299.90,
        rating: 4.8,
        reviews: 267,
        image: 'https://images.kabum.com.br/produtos/fotos/620992/monitor-gamer-lg-ultragear-27-ips-full-hd-180hz-1ms-displayport-e-hdmi-g-sync-freesync-hdr10-srgb-99-preto-27gs60f-b_1725043961_gg.jpg',
        description: 'Monitor Gamer LG UltraGear 27", 144Hz, 1ms, IPS, QHD (2560x1440), HDR 10, sRGB 99%, NVIDIA G-SYNC e AMD FreeSync.'
      },
      {
        id: 9,
        name: 'Teclado Mecânico Logitech G Pro X',
        category: 'peripheral',
        price: 799.90,
        salePrice: 749.90,
        rating: 4.6,
        reviews: 198,
        image: 'https://images.kabum.com.br/produtos/fotos/495547/teclado-gamer-sem-fio-logitech-g-pro-x-com-design-tkl-layout-us-rgb-lightsync-e-switch-exclusivo-gx-brown-tactile-preto-920-012127_1696620456_gg.jpg',
        description: 'Teclado Mecânico Gamer Logitech G Pro X, RGB LIGHTSYNC, switches GX Blue clicky, design compacto tenkeyless (TKL).'
      },
      {
        id: 10,
        name: 'Mouse Gamer Razer DeathAdder V2',
        category: 'peripheral',
        price: 399.90,
        salePrice: 349.90,
        rating: 4.8,
        reviews: 321,
        image: 'https://m.media-amazon.com/images/I/61doJ9AKCPL._AC_SX679_.jpg',
        description: 'Mouse Gamer Razer DeathAdder V2, sensor óptico 20.000 DPI, 8 botões programáveis, switches ópticos, cabo Speedflex.'
      },
      {
        id: 11,
        name: 'Headset Gamer HyperX Cloud II',
        category: 'peripheral',
        price: 699.90,
        salePrice: 599.90,
        rating: 4.7,
        reviews: 287,
        image: 'https://row.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1737720332',
        description: 'Headset Gamer HyperX Cloud II, som surround 7.1, espuma memory foam, estrutura de alumínio durável, certificado pelo TeamSpeak.'
      },
      {
        id: 12,
        name: 'Processador Intel Core i7-11700K',
        category: 'processor',
        price: 2399.90,
        salePrice: 2199.90,
        rating: 4.7,
        reviews: 243,
        image: 'https://images.kabum.com.br/produtos/fotos/148902/processador-intel-core-i7-11700k-11-geracao-cache-16mb-3-6-ghz-4-9ghz-turbo-lga1200-bx8070811700k_1615491329_gg.jpg',
        description: 'Processador Intel Core i7-11700K, 8 núcleos, 16 threads, 3.6GHz (5.0GHz Max Turbo), Cache 16MB, LGA1200, Vídeo Integrado.'
      },
      {
        id: 13,
        name: 'Water Cooler Corsair H100i RGB Pro XT',
        category: 'cooling',
        price: 899.90,
        salePrice: 849.90,
        rating: 4.6,
        reviews: 165,
        image: 'https://images.kabum.com.br/produtos/fotos/108804/water-cooler-corsair-icue-h100i-pro-xt-hydro-series-120mm-rgb-cw-9060043-ww_1577201550_original.jpg',
        description: 'Water Cooler Corsair H100i RGB Pro XT, Radiador de 240mm, RGB dinâmico, software iCUE, controle de velocidade PWM.'
      },
      {
        id: 14,
        name: 'Placa de Vídeo AMD Radeon RX 6800 XT',
        category: 'gpu',
        price: 4499.90,
        salePrice: 4299.90,
        rating: 4.8,
        reviews: 198,
        image: 'https://m.media-amazon.com/images/I/81ReRd8MrSL.jpg',
        description: 'Placa de Vídeo AMD Radeon RX 6800 XT, 16GB GDDR6, Ray Tracing, AMD Infinity Cache, tecnologia AMD RDNA 2.'
      },
      {
        id: 15,
        name: 'SSD Kingston A2000 1TB',
        category: 'storage',
        price: 799.90,
        salePrice: 699.90,
        rating: 4.6,
        reviews: 182,
        image: 'https://images.kabum.com.br/produtos/fotos/103381/ssd-kingston-a2000-1tb-m-2-nvme-leitura-2200mb-s-gravacao-2000mb-s-sa2000m8-1000g-_1566243598_original.jpg',
        description: 'SSD Kingston A2000, 1TB, M.2 2280 NVMe, Leitura 2200MB/s, Gravação 2000MB/s, PCIe Gen 3.0 x4, ideal para notebooks e sistemas compactos.'
      }
  ];
  
  
  function setupEventListeners() {
    
    document.getElementById('cart-button').addEventListener('click', toggleCart);
    document.getElementById('close-cart').addEventListener('click', toggleCart);
    document.getElementById('sidebar-overlay').addEventListener('click', toggleCart);
    
    
    document.getElementById('checkout-button').addEventListener('click', showCheckoutModal);
    document.getElementById('clear-cart-button').addEventListener('click', clearCart);
    
    
    document.getElementById('search-button').addEventListener('click', searchProducts);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchProducts();
      }
    });
    
    document.getElementById('filter-category').addEventListener('change', filterProducts);
    document.getElementById('filter-price').addEventListener('change', filterProducts);
    document.getElementById('filter-sort').addEventListener('change', filterProducts);
    
    
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
      card.addEventListener('click', function() {
        const category = this.dataset.category;
        document.getElementById('filter-category').value = category;
        filterProducts();
      });
    });
    
    
    setupModalClose('product-modal', 'close-button');
    
    
    document.getElementById('decrease-quantity').addEventListener('click', function() {
      const quantityInput = document.getElementById('quantity');
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    document.getElementById('increase-quantity').addEventListener('click', function() {
      const quantityInput = document.getElementById('quantity');
      const currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });
    
    
    document.getElementById('add-to-cart-button').addEventListener('click', addToCartFromModal);
    
    
    document.getElementById('buy-now-button').addEventListener('click', buyNow);
    
    
    setupModalClose('checkout-modal', 'close-button');
    document.getElementById('apply-coupon').addEventListener('click', applyCoupon);
    document.getElementById('place-order-button').addEventListener('click', placeOrder);
    
    
    document.getElementById('continue-to-payment').addEventListener('click', continueToPayment);
    document.getElementById('back-to-address').addEventListener('click', backToAddress);
    
    
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
      method.addEventListener('change', function() {
        
        document.getElementById('credit-card-fields').style.display = 'none';
        document.getElementById('boleto-fields').style.display = 'none';
        document.getElementById('pix-fields').style.display = 'none';
        
        
        if (this.value === 'credit-card') {
          document.getElementById('credit-card-fields').style.display = 'block';
        } else if (this.value === 'boleto') {
          document.getElementById('boleto-fields').style.display = 'block';
        } else if (this.value === 'pix') {
          document.getElementById('pix-fields').style.display = 'block';
          
          
          const pixCode = generateRandomPixCode();
          document.getElementById('pix-code').textContent = 'a67ca1ec-2d9b-46b2-baec-0de13c6c2813';
          
          
          const pixQrcode = document.getElementById('pix-qrcode');
          pixQrcode.style.opacity = '0.3';
          setTimeout(() => {
            pixQrcode.style.opacity = '1';
          }, 500);
        }
      });
    });
    
    
    setupModalClose('message-modal', 'close-button');
    document.getElementById('message-button').addEventListener('click', function() {
      document.getElementById('message-modal').style.display = 'none';
    });
    
    
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
      copyButton.addEventListener('click', function() {
        const pixCode = document.getElementById('pix-code').textContent;
        navigator.clipboard.writeText(pixCode).then(
          function() {
            
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.backgroundColor = '#d1fae5';
            copyButton.style.color = '#10b981';
            
            
            setTimeout(() => {
              copyButton.innerHTML = '<i class="fas fa-copy"></i>';
              copyButton.style.backgroundColor = '';
              copyButton.style.color = '';
            }, 2000);
          },
          function() {
            
            alert('Erro ao copiar o código. Por favor, copie manualmente.');
          }
        );
      });
    }
  }
  
  
  function setupModalClose(modalId, closeButtonClass) {
    const modal = document.getElementById(modalId);
    const closeButton = modal.querySelector(`.${closeButtonClass}`);
    
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  
  function toggleCart() {
    const cart = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    cart.classList.toggle('open');
    overlay.classList.toggle('open');
    
    updateCartDisplay();
  }
  
  
  function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  }
  
  
  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    productElement.dataset.id = product.id;
    
    const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
    const discountBadge = discount > 0 ? `<div class="product-discount">-${discount}%</div>` : '';
    
    productElement.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        ${discountBadge}
      </div>
      <div class="product-details">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-rating">
          <div class="price-container">
            ${product.salePrice ? `<div class="original-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>` : ''}
            <div class="sale-price">R$ ${(product.salePrice || product.price).toFixed(2).replace('.', ',')}</div>
          </div>
          <div class="stars">${generateStars(product.rating)}</div>
        </div>
        <span class="product-category">${getCategoryName(product.category)}</span>
      </div>
      <div class="product-card-actions">
        <button class="product-action-btn add-to-cart-btn" data-id="${product.id}">
          <i class="fas fa-cart-plus"></i> Adicionar
        </button>
        <button class="product-action-btn buy-now-btn" data-id="${product.id}">
          <i class="fas fa-bolt"></i> Comprar
        </button>
      </div>
    `;
    
    
    const imageWrapper = productElement.querySelector('.product-image-wrapper');
    const productName = productElement.querySelector('.product-name');
    
    imageWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      showProductDetails(product);
    });
    
    productName.addEventListener('click', (e) => {
      e.stopPropagation();
      showProductDetails(product);
    });
    
    
    const addToCartBtn = productElement.querySelector('.add-to-cart-btn');
    const buyNowBtn = productElement.querySelector('.buy-now-btn');
    
    addToCartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product.id, 1);
      showMessage('Produto Adicionado', 'O produto foi adicionado ao seu carrinho com sucesso!');
    });
    
    buyNowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      cartItems.length = 0;
      addToCart(product.id, 1);
      
      
      showCheckoutModal();
    });
    
    return productElement;
  }
  
  
  function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }
    
    
    if (halfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
  }
  
  
  function getCategoryName(categorySlug) {
    const categories = {
      'processor': 'Processadores',
      'motherboard': 'Placas-mãe',
      'memory': 'Memórias',
      'gpu': 'Placas de Vídeo',
      'storage': 'Armazenamento',
      'peripheral': 'Periféricos',
      'case': 'Gabinetes',
      'power': 'Fontes',
      'cooling': 'Refrigeração'
    };
    
    return categories[categorySlug] || categorySlug;
  }
  
  
  function showProductDetails(product) {
    const modal = document.getElementById('product-modal');
    
    
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-category').textContent = getCategoryName(product.category);
    document.getElementById('modal-product-stars').innerHTML = generateStars(product.rating);
    document.getElementById('modal-product-reviews').textContent = `${product.reviews} avaliações`;
    
    
    if (product.salePrice) {
      document.getElementById('modal-product-original-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
      document.getElementById('modal-product-original-price').style.display = 'block';
      document.getElementById('modal-product-sale-price').textContent = `R$ ${product.salePrice.toFixed(2).replace('.', ',')}`;
    } else {
      document.getElementById('modal-product-original-price').style.display = 'none';
      document.getElementById('modal-product-sale-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    }
    
    
    document.getElementById('quantity').value = 1;
    
    
    document.getElementById('add-to-cart-button').dataset.id = product.id;
    document.getElementById('buy-now-button').dataset.id = product.id;
    
    
    modal.style.display = 'flex';
  }
  
  
  function addToCartFromModal() {
    const productId = parseInt(document.getElementById('add-to-cart-button').dataset.id);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    addToCart(productId, quantity);
    
    
    document.getElementById('product-modal').style.display = 'none';
    
    
    showMessage('Produto Adicionado', 'O produto foi adicionado ao seu carrinho com sucesso!');
  }
  
  
  function buyNow() {
    const productId = parseInt(document.getElementById('buy-now-button').dataset.id);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    
    cartItems.length = 0;
    addToCart(productId, quantity);
    
    
    document.getElementById('product-modal').style.display = 'none';
    
    
    showCheckoutModal();
  }
  
  
  function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
      
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    
    updateCartCount();
    updateCartDisplay();
  }
  
  
  function updateCartCount() {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
  }
  
  
  function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    
    
    if (cartItems.length === 0) {
      cartItemsElement.innerHTML = '<div class="empty-cart-message">Seu carrinho está vazio.</div>';
      document.getElementById('cart-total').textContent = 'R$ 0,00';
      document.getElementById('checkout-button').disabled = true;
      document.getElementById('clear-cart-button').disabled = true;
      return;
    }
    
    
    document.getElementById('checkout-button').disabled = false;
    document.getElementById('clear-cart-button').disabled = false;
    
    
    cartItemsElement.innerHTML = '';
    
    
    let total = 0;
    
    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
          <div class="cart-item-quantity">Quantidade: ${item.quantity}</div>
          <span class="cart-item-remove" data-index="${index}">Remover</span>
        </div>
      `;
      
      
      itemElement.querySelector('.cart-item-remove').addEventListener('click', function(e) {
        e.stopPropagation();
        removeFromCart(parseInt(this.dataset.index));
      });
      
      cartItemsElement.appendChild(itemElement);
    });
    
    
    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
  
  
  function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      updateCartCount();
      updateCartDisplay();
    }
  }
  
  
  function clearCart() {
    cartItems.length = 0;
    updateCartCount();
    updateCartDisplay();
    showMessage('Carrinho Limpo', 'Todos os itens foram removidos do seu carrinho.');
  }
  
  
  function showCheckoutModal() {
    
    if (cartItems.length === 0) {
      showMessage('Carrinho Vazio', 'Adicione itens ao seu carrinho antes de finalizar a compra.');
      return;
    }
    
    
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
    
    
    document.getElementById('checkout-step-1').classList.add('active');
    document.getElementById('checkout-step-2').classList.remove('active');
    
    
    document.getElementById('checkout-processing').style.display = 'none';
    document.getElementById('checkout-sections').style.display = 'block';
    
    
    updateCheckoutItems();
    
    
    calculateShipping();
    
    
    updateCheckoutTotals();
    
    
    document.getElementById('checkout-modal').style.display = 'flex';
  }
  
  
  function continueToPayment() {
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cep = document.getElementById('cep').value;
    const street = document.getElementById('street').value;
    
    if (!name || !email || !cep || !street) {
      showMessage('Dados Incompletos', 'Por favor, preencha os campos obrigatórios para continuar.');
      return;
    }
    
    
    document.getElementById('checkout-step-1').classList.remove('active');
    document.getElementById('checkout-step-2').classList.add('active');
    
    
    document.getElementById('checkout-items-2').innerHTML = document.getElementById('checkout-items').innerHTML;
    document.getElementById('checkout-subtotal-2').textContent = document.getElementById('checkout-subtotal').textContent;
    document.getElementById('checkout-shipping-2').textContent = document.getElementById('checkout-shipping').textContent;
    
    
    const discountRow = document.getElementById('discount-row');
    const discountRow2 = document.getElementById('discount-row-2');
    
    if (discountRow.style.display === 'flex') {
      discountRow2.style.display = 'flex';
      document.getElementById('checkout-discount-2').textContent = document.getElementById('checkout-discount').textContent;
    } else {
      discountRow2.style.display = 'none';
    }
    
    document.getElementById('checkout-total-2').textContent = document.getElementById('checkout-total').textContent;
  }
  
  
  function backToAddress() {
    document.getElementById('checkout-step-2').classList.remove('active');
    document.getElementById('checkout-step-1').classList.add('active');
  }
  
  
  function updateCheckoutItems() {
    const checkoutItemsElement = document.getElementById('checkout-items');
    checkoutItemsElement.innerHTML = '';
    
    cartItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'checkout-item';
      
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
        <div class="checkout-item-details">
          <h3 class="checkout-item-name">${item.name}</h3>
          <div class="checkout-item-price-qty">
            <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span> | <span>Quantidade: ${item.quantity}</span>
          </div>
        </div>
      `;
      
      checkoutItemsElement.appendChild(itemElement);
    });
  }
  
  
  function calculateShipping() {
    
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    
    if (subtotal >= 500) {
      shippingCost = 0;
    } else {
      
      shippingCost = 25 + (totalItems * 2);
    }
    
    document.getElementById('checkout-shipping').textContent = shippingCost === 0 ? 
      'Grátis' : 
      `R$ ${shippingCost.toFixed(2).replace('.', ',')}`;
  }
  
  
  function updateCheckoutTotals() {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('checkout-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    
    let discount = 0;
    if (appliedCoupon) {
      discount = subtotal * (discountCoupons[appliedCoupon] / 100);
      document.getElementById('checkout-discount').textContent = `-R$ ${discount.toFixed(2).replace('.', ',')}`;
      document.getElementById('discount-row').style.display = 'flex';
    } else {
      document.getElementById('discount-row').style.display = 'none';
    }
    
    
    const total = subtotal + shippingCost - discount;
    document.getElementById('checkout-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
  
  
  function applyCoupon() {
    const coupon = document.getElementById('coupon').value.trim().toUpperCase();
    
    if (!coupon) {
      showMessage('Cupom Inválido', 'Por favor, digite um cupom válido.');
      return;
    }
    
    
    if (discountCoupons[coupon]) {
      appliedCoupon = coupon;
      updateCheckoutTotals();
      
      
      if (document.getElementById('checkout-step-2').classList.contains('active')) {
        const discountValue = document.getElementById('checkout-discount').textContent;
        document.getElementById('checkout-discount-2').textContent = discountValue;
        document.getElementById('discount-row-2').style.display = 'flex';
        document.getElementById('checkout-total-2').textContent = document.getElementById('checkout-total').textContent;
      }
      
      showMessage('Cupom Aplicado', `Cupom ${coupon} aplicado com sucesso! Desconto de ${discountCoupons[coupon]}% aplicado.`);
    } else {
      showMessage('Cupom Inválido', `O cupom ${coupon} não é válido ou expirou.`);
    }
  }
  
  
  async function placeOrder() {
    
    if (!document.getElementById('checkout-step-2').classList.contains('active')) {
      showMessage('Complete o Endereço', 'Por favor, preencha os dados de endereço e avance para pagamento.');
      return;
    }
    
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    if (paymentMethod === 'credit-card') {
      const cardNumber = document.getElementById('card-number').value;
      const cardName = document.getElementById('card-name').value;
      const cardExpiry = document.getElementById('card-expiry').value;
      const cardCvv = document.getElementById('card-cvv').value;
      
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        showMessage('Dados do Cartão Incompletos', 'Por favor, preencha todos os dados do seu cartão de crédito.');
        return;
      }
    }
    
    
    document.getElementById('checkout-sections').style.display = 'none';
    document.getElementById('checkout-processing').style.display = 'block';
    
    
    try {
      await updateProgressBar(10, 'Iniciando processamento do pedido...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      await updateProgressBar(30, 'Verificando estoque...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await updateProgressBar(50, 'Processando pagamento...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await updateProgressBar(70, 'Validando transação...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await updateProgressBar(90, 'Finalizando pedido...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      await updateProgressBar(100, 'Pedido concluído com sucesso!');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      document.getElementById('checkout-modal').style.display = 'none';
      
      
      const orderNumber = Math.floor(10000 + Math.random() * 90000);
      
      showMessage(
        'Pedido Realizado', 
        `Seu pedido #${orderNumber} foi processado com sucesso! Em breve você receberá um e-mail com os detalhes da sua compra.`
      );
      
      
      cartItems.length = 0;
      appliedCoupon = null;
      updateCartCount();
      
      
      document.getElementById('checkout-sections').style.display = 'grid';
      document.getElementById('checkout-processing').style.display = 'none';
      await updateProgressBar(0, '');
      
    } catch (error) {
      
      showMessage('Erro no Processamento', 'Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.');
      
      
      document.getElementById('checkout-sections').style.display = 'grid';
      document.getElementById('checkout-processing').style.display = 'none';
      await updateProgressBar(0, '');
    }
  }
  
  
  function searchProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchInput) {
      loadProducts();
      return;
    }
    
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchInput) ||
      product.description.toLowerCase().includes(searchInput) ||
      getCategoryName(product.category).toLowerCase().includes(searchInput)
    );
    
    displayFilteredProducts(filteredProducts);
  }
  
  
  function filterProducts() {
    const categoryFilter = document.getElementById('filter-category').value;
    const priceFilter = document.getElementById('filter-price').value;
    const sortFilter = document.getElementById('filter-sort').value;
    
    let filteredProducts = [...products];
    
    
    if (categoryFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    
    if (priceFilter !== 'all') {
      const price = product => product.salePrice || product.price;
      
      switch (priceFilter) {
        case 'under500':
          filteredProducts = filteredProducts.filter(product => price(product) < 500);
          break;
        case '500to1000':
          filteredProducts = filteredProducts.filter(product => price(product) >= 500 && price(product) <= 1000);
          break;
        case '1000to2000':
          filteredProducts = filteredProducts.filter(product => price(product) > 1000 && price(product) <= 2000);
          break;
        case 'over2000':
          filteredProducts = filteredProducts.filter(product => price(product) > 2000);
          break;
      }
    }
    
    
    switch (sortFilter) {
      case 'price-asc':
        filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      
    }
    
    displayFilteredProducts(filteredProducts);
  }
  
  
  function displayFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = '<p class="no-results">Nenhum produto encontrado.</p>';
      return;
    }
    
    filteredProducts.forEach(product => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  }
  
  
  function showMessage(title, text) {
    const modal = document.getElementById('message-modal');
    document.getElementById('message-title').textContent = title;
    document.getElementById('message-text').textContent = text;
    modal.style.display = 'flex';
  }
  
  
  function generateRandomPixCode() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let pixCode = '';
    
    
    for (let block = 0; block < 8; block++) {
      for (let i = 0; i < 4; i++) {
        pixCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (block < 7) pixCode += ' ';
    }
    
    return pixCode;
  }
  
  
  function updateProgressBar(value, message) {
    const progressBar = document.getElementById('payment-progress-bar');
    const progressMessage = document.getElementById('payment-progress-message');
    
    progressBar.style.width = `${value}%`;
    progressMessage.textContent = message;
    
    return new Promise(resolve => setTimeout(resolve, 500));
  }