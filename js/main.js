// js/script.js

// Data sản phẩm mẫu
const products = [
    { id: 1, name: 'Bánh Mì Que', price: 15000, image: 'https://via.placeholder.com/300x200/FFD700/FFFFFF?text=Banh+Mi+Que', description: 'Giòn rụm, đậm vị', category: 'Bánh' },
    { id: 2, name: 'Khoai Tây Lắc', price: 25000, image: 'https://via.placeholder.com/300x200/FF8C00/FFFFFF?text=Khoai+Tay+Lac', description: 'Thơm lừng, cay nhẹ', category: 'Món Chiên' },
    { id: 3, name: 'Chè Khúc Bạch', price: 30000, image: 'https://via.placeholder.com/300x200/87CEEB/FFFFFF?text=Che+Khuc+Bach', description: 'Mát lạnh, thanh nhiệt', category: 'Đồ Uống' },
    { id: 4, name: 'Bánh Tráng Cuộn', price: 20000, image: 'https://via.placeholder.com/300x200/ADFF2F/FFFFFF?text=Banh+Trang+Cuon', description: 'Đậm đà, chuẩn vị', category: 'Ăn Vặt Khác' },
    { id: 5, name: 'Trà Sữa Trân Châu', price: 35000, image: 'https://via.placeholder.com/300x200/FF69B4/FFFFFF?text=Tra+Sua', description: 'Ngọt ngào, béo ngậy', category: 'Đồ Uống' },
    { id: 6, name: 'Nem Chua Rán', price: 40000, image: 'https://via.placeholder.com/300x200/CD5C5C/FFFFFF?text=Nem+Chua+Ran', description: 'Giòn tan, hấp dẫn', category: 'Món Chiên' },
    { id: 7, name: 'Nước ép Trái Cây', price: 28000, image: 'https://via.placeholder.com/300x200/87CEEB/FFFFFF?text=Nuoc+Ep', description: 'Tươi mát, vitamin', category: 'Đồ Uống' },
    { id: 8, name: 'Chân Gà Sả Ớt', price: 45000, image: 'https://via.placeholder.com/300x200/FF4500/FFFFFF?text=Chan+Ga', description: 'Cay nồng, đậm đà', category: 'Món Mặn' },
];

// Biến giỏ hàng toàn cục
let cart = [];

/**
 * Renders products to the product list section.
 */
function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return; // Đảm bảo phần tử tồn tại

    productList.innerHTML = ''; // Xóa sản phẩm cũ trước khi render

    products.forEach(product => {
        const productCard = `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden product-card group">
                <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover group-hover:scale-105 transition duration-500">
                <div class="p-5">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-yellow-600">${product.price.toLocaleString('vi-VN')}₫</span>
                        <button data-product-id="${product.id}" class="add-to-cart-btn bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 transform hover:scale-105 flex items-center space-x-2">
                            <i class="fas fa-cart-plus"></i>
                            <span>Thêm</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });

    // Gán lại event listener sau khi render
    attachAddToCartListeners();
}

/**
 * Adds a product to the cart.
 * @param {number} productId - The ID of the product to add.
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
    }
}

/**
 * Updates the cart item count displayed in the header.
 */
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

/**
 * Displays a temporary notification.
 * @param {string} message - The message to display.
 * @param {'success'|'error'|'info'} type - Type of notification (for styling).
 */
function showNotification(message, type = 'info') {
    const notificationContainer = document.createElement('div');
    notificationContainer.className = `fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white z-50 transform translate-x-full transition-transform duration-500 ease-out ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notificationContainer.textContent = message;

    document.body.appendChild(notificationContainer);

    // Hiển thị notification
    setTimeout(() => {
        notificationContainer.classList.remove('translate-x-full');
    }, 100);

    // Ẩn và xóa notification sau 3 giây
    setTimeout(() => {
        notificationContainer.classList.add('translate-x-full');
        notificationContainer.addEventListener('transitionend', () => {
            notificationContainer.remove();
        });
    }, 3000);
}

/**
 * Attaches click event listeners to all "Add to Cart" buttons.
 */
function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.removeEventListener('click', handleAddToCartClick); // Tránh gắn nhiều lần
        button.addEventListener('click', handleAddToCartClick);
    });
}

function handleAddToCartClick(event) {
    const productId = parseInt(event.currentTarget.dataset.productId);
    addToCart(productId);
}


// Event listener cho menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    renderProducts(); // Gọi hàm render sản phẩm khi DOM đã tải xong
    updateCartCount(); // Cập nhật số lượng giỏ hàng ban đầu
});