document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const navBtns = document.querySelectorAll('.slider-nav button');
    let currentSlide = 0;
    let slideInterval;

    // 初始化自动播放
    startSlideShow();

    // 切换到指定幻灯片
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        navBtns[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        navBtns[currentSlide].classList.add('active');
    }

    // 下一张幻灯片
    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= slides.length) index = 0;
        goToSlide(index);
    }

    // 上一张幻灯片
    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) index = slides.length - 1;
        goToSlide(index);
    }

    // 开始自动播放
    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 5000);
    }

    // 停止自动播放
    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // 事件监听
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideShow();
    });

    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            goToSlide(index);
            startSlideShow();
        });
    });

    // 鼠标悬停时停止自动播放
    slider.addEventListener('mouseenter', stopSlideShow);
    slider.addEventListener('mouseleave', startSlideShow);
});


// Shopping cart function module
const cart = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  
  // add product
  addToCart(productId) {
    const product = this.product[productId];
    const existingItem = this.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({
        ...product,
        quantity: 1
      });
    }
    this.saveToStorage();
    this.updateUI();
  },

  // Modify quantity
  changeQuantity(productId, delta) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity < 1) {
        this.items = this.items.filter(i => i.id !== productId);
      }
      this.saveToStorage();
      this.updateUI();
    }
  },

  // Delete products
  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveToStorage();
    this.updateUI();
  },

  // Calculate the total price
  calculateTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // 保存到本地存储
  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },

  // 更新界面
  updateUI() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    // 清空购物车列表
    cartItems.innerHTML = '';
    
    // 填充新数据
    this.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-info">
          <span class="item-name">${item.name}</span>
          <div class="item-controls">
            <button class="btn-quantity" onclick="cart.changeQuantity(${item.id}, -1)">-</button>
            <span class="item-quantity">${item.quantity}</span>
            <button class="btn-quantity" onclick="cart.changeQuantity(${item.id}, 1)">+</button>
          </div>
          <span class="item-price">HK$${item.price * item.quantity}</span>
        </div>
        <button class="btn-remove" onclick="cart.removeItem(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      `;
      cartItems.appendChild(li);
    });

    // 更新总价
    totalPrice.textContent = this.calculateTotal();
  },

  // 商品数据
  product: {
    1: { id: 1, name: 'iphone 16', price: 6899 },
    2: { id: 2, name: 'iphone 16 pro max', price: 9999 },
    3: { id: 3, name: 'iphone 16e', price: 4499 },
    4: { id: 4, name: 'Airpods Max', price: 4599 },
    5: { id: 5, name: 'Apple Watch Series 10', price: 5399 },
    6: { id: 6, name: 'Airpods pro 2', price: 1849 },
    7: { id: 7, name: 'Airpods 4', price: 1499 },
    8: { id: 8, name: 'Apple Watch Ultra 2', price: 2999 },
    9: { id: 9, name: 'Air Jordan XXXIX', price: 1499 },
    10: { id: 10, name: 'Nike G.T. Cut 3', price: 1349 },
    11: { id: 11, name: 'KD17', price: 1039 },
    12: { id: 12, name: 'Nike Alphafly 3', price: 2299 },
    13: { id: 13, name: 'Nike Vaporfly 3', price: 1699 },
    14: { id: 14, name: 'Nike Pegasus Plus', price: 1019 },
    15: { id: 15, name: "Nynern", price: 8000},
    16: { id: 16, name: "Hel", price: 7000},
    17: { id: 17, name: "Dragon Hunter", price: 999},
    18: { id: 18, name: "Nxy",price:7500},
    19: { id: 19, name: "Aeon",price:5000},
    20: { id: 20, name: "butterfly knife",price:150000},
    21: { id: 21, name: "Bongo Cat",price:50},
    22: { id: 22, name: "Nyan Cat",price:45},
    23: { id: 23, name: "Penguin",price:100},
    24: { id: 24, name: "Panda",price:228},
    25: { id: 25, name: "BugCat",price:15},
    26: { id: 26, name: "Pikachu",price:50},    
  },

  // Settlement function
  checkout() {
    if (this.items.length === 0) {
      alert('The shopping cart is empty, please add items first! ');
      return;
    }
    
    if (confirm(`Confirm settlement HK$${this.calculateTotal()}?`)) {
      this.items = [];
      this.saveToStorage();
      this.updateUI();
      alert('Checkout successful! Thank you for your purchase!');
    }
  }
};

// 初始化购物车
document.addEventListener('DOMContentLoaded', () => cart.updateUI());

