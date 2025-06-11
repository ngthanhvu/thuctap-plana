import { ref, computed, provide, inject, onMounted } from "vue";
import axios from "axios";

const POS_STORE_KEY = Symbol("pos-store");

export function usePosStore() {
  const store = inject(POS_STORE_KEY);
  if (!store) {
    throw new Error("usePosStore must be used within a PosProvider");
  }
  return store;
}

// State
// const categories = ref([
//     { id: 1, name: 'Tất cả', active: true },
//     { id: 2, name: 'Đồ uống', active: false },
//     { id: 3, name: 'Đồ ăn', active: false },
//     { id: 4, name: 'Khai vị', active: false },
//     { id: 5, name: 'Tráng miệng', active: false },
//     { id: 6, name: 'Combo', active: false },
// ])

// const products = ref([
//     { id: 1, name: 'Sushi', price: 75000, category: 3, image: '🍣' },
//     { id: 2, name: 'Cà phê', price: 35000, category: 2, image: '☕' },
//     { id: 3, name: 'Hamburger', price: 65000, category: 3, image: '🍔' },
//     { id: 4, name: 'Pizza', price: 120000, category: 3, image: '🍕' },
//     { id: 5, name: 'Nước ép', price: 45000, category: 2, image: '🍹' },
//     { id: 6, name: 'Bánh ngọt', price: 55000, category: 5, image: '🍰' },
// ])
export function createPosStore() {
    
  const categories = ref([]);
  const products = ref([]);
 async function fetchCategories() {
  try {
    const res = await axios.get("http://localhost:3000/api/categories");
    categories.value = res.data;
  } catch (error) {
    console.error("Lỗi khi fetch categories:", error);
  }
}

async function fetchProducts() {
  try {
    const res = await axios.get("http://localhost:3000/api/products");
    products.value = res.data;
  } catch (error) {
    console.error("Lỗi khi fetch products:", error);
  }
}

onMounted(() => {
  fetchCategories();
  fetchProducts();
});

  const cart = ref([]);
  const searchQuery = ref("");
  const selectedCategory = ref(1);

  // Getters
  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesCategory =
        selectedCategory.value === 1 ||
        product.category === selectedCategory.value;
      return matchesSearch && matchesCategory;
    });
  });

  const cartTotal = computed(() => {
    return cart.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  const cartDiscount = computed(() => {
    return cartTotal.value > 200000 ? 10000 : 0;
  });

  const cartTax = computed(() => {
    return (cartTotal.value - cartDiscount.value) * 0.1;
  });

  const cartFinalTotal = computed(() => {
    return cartTotal.value - cartDiscount.value + cartTax.value;
  });

  // Actions
  function setCategory(categoryId) {
    selectedCategory.value = categoryId;
    categories.value.forEach((cat) => {
      cat.active = cat.id === categoryId;
    });
  }

  function addToCart(product) {
    const existingItem = cart.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({
        ...product,
        quantity: 1,
      });
    }
  }

  function removeFromCart(productId) {
    const index = cart.value.findIndex((item) => item.id === productId);
    if (index > -1) {
      cart.value.splice(index, 1);
    }
  }

  function updateQuantity(productId, quantity) {
    const item = cart.value.find((item) => item.id === productId);
    if (item) {
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        removeFromCart(productId);
      }
    }
  }

  function clearCart() {
    cart.value = [];
  }

  const store = {
    categories,
    products,
    cart,
    searchQuery,
    selectedCategory,
    filteredProducts,
    cartTotal,
    cartDiscount,
    cartTax,
    cartFinalTotal,
    setCategory,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  provide(POS_STORE_KEY, store);
  return store;
}
