function searchProducts() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    let hasResults = false;
    
    // 跨页面搜索（所有页面
    productCards.forEach(card => {
    const productTitle = card.querySelector('.product-title').textContent.toLowerCase();
    const match = productTitle.includes(searchTerm);
    card.style.display = match ? 'block' : 'none';
    if(match) hasResults = true;
    });
    
    // 无结果搜索
    const existingMessage = document.getElementById('no-results');
    if(!hasResults && searchTerm) {
    if(!existingMessage) {
    const message = document.createElement('div');
    message.id = 'no-results';
    message.className = 'no-results';
    message.textContent = '未找到相关商品';
    document.querySelector('.product-grid').parentNode.appendChild(message);
    }
    } else if(existingMessage) {
    existingMessage.remove();
    }
    }
    
    // 初始化搜索功能
    function initSearch() {
    // 搜索按钮点击事件
    document.querySelector('.search-button').addEventListener('click', searchProducts);
    
    // 绑定回车键事件
    document.querySelector('.search-input').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') searchProducts();
    });
    }
    
    // 页面加载后初始化
    document.addEventListener('DOMContentLoaded', initSearch);