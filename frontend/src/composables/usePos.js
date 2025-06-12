import { ref, computed, provide, inject, onMounted, watch } from 'vue';
import axios from "axios";

const POS_STORE_KEY = Symbol("pos-store");

export function usePosStore() {
  const store = inject(POS_STORE_KEY);
  if (!store) {
    throw new Error("usePosStore must be used within a PosProvider");
  }
  return store;
}

export function createPosStore() {
  const categories = ref([]);
  const products = ref([]);
  const customers = ref([]);
  const cart = ref([]);
  const searchQuery = ref("");
  const selectedCategory = ref(1);
  const selectedCustomer = ref(null);
  const currentSession = ref(null);
  const currentUser = ref({ id: 1, name: 'Nhân viên', role: 'admin' });
  const salesReport = ref(null);
  const paymentQR = ref(null);
  const orders = ref([]);
  const currentView = ref('pos'); // pos, orders, report, inventory, teams, settings

  // Khôi phục session từ localStorage khi khởi tạo
  function restoreSession() {
    try {
      const savedSession = localStorage.getItem('pos_session');
      const savedCart = localStorage.getItem('pos_cart');
      const savedCustomer = localStorage.getItem('pos_selected_customer');
      
      if (savedSession) {
        currentSession.value = JSON.parse(savedSession);
      }
      if (savedCart) {
        cart.value = JSON.parse(savedCart);
      }
      if (savedCustomer) {
        selectedCustomer.value = JSON.parse(savedCustomer);
      }
    } catch (error) {
      console.error('Lỗi khi khôi phục session:', error);
    }
  }

  // Lưu session vào localStorage
  function saveSession() {
    try {
      if (currentSession.value) {
        localStorage.setItem('pos_session', JSON.stringify(currentSession.value));
      } else {
        localStorage.removeItem('pos_session');
      }
    } catch (error) {
      console.error('Lỗi khi lưu session:', error);
    }
  }

  // Lưu cart vào localStorage
  function saveCart() {
    try {
      localStorage.setItem('pos_cart', JSON.stringify(cart.value));
    } catch (error) {
      console.error('Lỗi khi lưu cart:', error);
    }
  }

  // Lưu customer đã chọn
  function saveSelectedCustomer() {
    try {
      if (selectedCustomer.value) {
        localStorage.setItem('pos_selected_customer', JSON.stringify(selectedCustomer.value));
      } else {
        localStorage.removeItem('pos_selected_customer');
      }
    } catch (error) {
      console.error('Lỗi khi lưu customer:', error);
    }
  }

  // Watch để tự động lưu khi có thay đổi
  watch(currentSession, saveSession, { deep: true });
  watch(cart, saveCart, { deep: true });
  watch(selectedCustomer, saveSelectedCustomer, { deep: true });

  // Fetch functions
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

  async function fetchCustomers() {
    try {
      const res = await axios.get("http://localhost:3000/api/customers");
      customers.value = res.data;
    } catch (error) {
      console.error("Lỗi khi fetch customers:", error);
    }
  }

  // Fetch orders
  async function fetchOrders() {
    try {
      const res = await axios.get('http://localhost:3000/api/pos/orders');
      orders.value = res.data;
    } catch (error) {
      console.error("Lỗi khi fetch orders:", error);
    }
  }

  async function searchCustomers(query) {
    try {
      const res = await axios.get(`http://localhost:3000/api/customers/search?query=${query}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi search customers:", error);
      return [];
    }
  }

  // POS Session functions
  async function startPosSession(openingCash = 0) {
    try {
      const res = await axios.post('http://localhost:3000/api/pos/session/start', {
        staff_id: currentUser.value.id,
        opening_cash: openingCash
      });
      currentSession.value = res.data;
      return res.data;
    } catch (error) {
      console.error('Lỗi khi khởi tạo phiên POS:', error);
      throw error;
    }
  }

  async function endPosSession(closingCash) {
    try {
      const res = await axios.post('http://localhost:3000/api/pos/session/end', {
        session_id: currentSession.value.id,
        closing_cash: closingCash
      });
      currentSession.value = null;
      // Xóa dữ liệu localStorage khi kết thúc session
      localStorage.removeItem('pos_session');
      localStorage.removeItem('pos_cart');
      localStorage.removeItem('pos_selected_customer');
      return res.data;
    } catch (error) {
      console.error('Lỗi khi đóng phiên POS:', error);
      throw error;
    }
  }

  // Order functions
  async function processPayment(paymentMethod) {
    try {
      if (!currentSession.value) {
        throw new Error('Chưa khởi tạo phiên POS');
      }

      const orderData = {
        customer_id: selectedCustomer.value?.id || null,
        staff_id: currentUser.value.id,
        pos_session_id: currentSession.value.id,
        items: cart.value.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        })),
        subtotal: cartTotal.value,
        discount: cartDiscount.value,
        tax: cartTax.value,
        total: cartFinalTotal.value,
        payment_method: paymentMethod
      };

      const res = await axios.post('http://localhost:3000/api/pos/orders', orderData);
      clearCart();
      selectedCustomer.value = null;
      // Cập nhật danh sách đơn hàng
      await fetchOrders();
      return res.data;
    } catch (error) {
      console.error('Lỗi khi xử lý thanh toán:', error);
      throw error;
    }
  }

  async function saveDraftOrder() {
    try {
      if (!currentSession.value) {
        throw new Error('Chưa khởi tạo phiên POS');
      }

      const orderData = {
        customer_id: selectedCustomer.value?.id || null,
        staff_id: currentUser.value.id,
        pos_session_id: currentSession.value.id,
        items: cart.value.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        })),
        subtotal: cartTotal.value,
        discount: cartDiscount.value,
        tax: cartTax.value,
        total: cartFinalTotal.value
      };

      const res = await axios.post('http://localhost:3000/api/pos/orders/draft', orderData);
      clearCart();
      selectedCustomer.value = null;
      // Cập nhật danh sách đơn hàng
      await fetchOrders();
      return res.data;
    } catch (error) {
      console.error('Lỗi khi lưu đơn hàng tạm:', error);
      throw error;
    }
  }

  // Cập nhật trạng thái đơn hàng
  async function updateOrderStatus(orderId, status) {
    try {
      const res = await axios.put(`http://localhost:3000/api/pos/orders/${orderId}/status`, {
        status: status
      });
      // Cập nhật danh sách đơn hàng
      await fetchOrders();
      return res.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      throw error;
    }
  }

  // Hủy đơn hàng
  async function cancelOrder(orderId) {
    try {
      const res = await axios.delete(`http://localhost:3000/api/pos/orders/${orderId}`);
      // Cập nhật danh sách đơn hàng
      await fetchOrders();
      return res.data;
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      throw error;
    }
  }

  onMounted(() => {
    restoreSession();
    fetchCategories();
    fetchProducts();
    fetchCustomers();
    fetchOrders();
  });

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

  function setSelectedCustomer(customer) {
    selectedCustomer.value = customer;
  }

  function setCurrentView(view) {
    currentView.value = view;
  }

  // Thống kê doanh thu
  async function fetchSalesReport(sessionId = null) {
    try {
      const params = sessionId ? `?session_id=${sessionId}` : '';
      const res = await axios.get(`http://localhost:3000/api/pos/reports/summary${params}`);
      salesReport.value = res.data;
      return res.data;
    } catch (error) {
      console.error('Lỗi khi lấy báo cáo doanh thu:', error);
      throw error;
    }
  }

  // Tạo QR code thanh toán
  async function generatePaymentQR(amount, orderNumber) {
    try {
      const res = await axios.post('http://localhost:3000/api/pos/payment/qr', {
        amount: amount,
        order_number: orderNumber
      });
      paymentQR.value = res.data;
      return res.data;
    } catch (error) {
      console.error('Lỗi khi tạo QR thanh toán:', error);
      throw error;
    }
  }

  // Tạo khách hàng mới
  async function createCustomer(customerData) {
    try {
      const res = await axios.post('http://localhost:3000/api/customers', customerData);
      // Cập nhật danh sách khách hàng
      await fetchCustomers();
      return res.data;
    } catch (error) {
      console.error('Lỗi khi tạo khách hàng:', error);
      throw error;
    }
  }

  const store = {
    // State
    categories,
    products,
    customers,
    cart,
    searchQuery,
    selectedCategory,
    selectedCustomer,
    currentSession,
    currentUser,
    salesReport,
    paymentQR,
    orders,
    currentView,
    // Computed
    filteredProducts,
    cartTotal,
    cartDiscount,
    cartTax,
    cartFinalTotal,
    // Actions
    setCategory,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setSelectedCustomer,
    setCurrentView,
    searchCustomers,
    startPosSession,
    endPosSession,
    processPayment,
    saveDraftOrder,
    updateOrderStatus,
    cancelOrder,
    fetchSalesReport,
    generatePaymentQR,
    createCustomer,
    fetchOrders,
    restoreSession
  };

  provide(POS_STORE_KEY, store);
  return store;
}
