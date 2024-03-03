const API_BASE_URL = 'http://localhost:8080';

export const API_ROUTES = {
  analytical: `${API_BASE_URL}/api/analytical`,
  clothingItems: `${API_BASE_URL}/api/clothingitems`,
  scenarios: `${API_BASE_URL}/api/scenarios`,
  users: `${API_BASE_URL}/api/users`,

  // Specific routes for Clothing Items
  createClothingItem: `${API_BASE_URL}/api/clothingitems`,
  getClothingItems: `${API_BASE_URL}/api/clothingitems`,
  getClothingItem: (item_id) => `${API_BASE_URL}/api/clothingitems/${item_id}`,
  updateClothingItem: (item_id) => `${API_BASE_URL}/api/clothingitems/${item_id}`,
  deleteClothingItem: (item_id) => `${API_BASE_URL}/api/clothingitems/${item_id}`,
  deleteAllClothingItems: `${API_BASE_URL}/api/clothingitems`,

  // Specific routes for Users
  createUser: `${API_BASE_URL}/api/users`,
  getUsers: `${API_BASE_URL}/api/users`,
  getUser: (userId) => `${API_BASE_URL}/api/users/${userId}`,
  updateUser: (userId) => `${API_BASE_URL}/api/users/${userId}`,
  deleteUser: (userId) => `${API_BASE_URL}/api/users/${userId}`,
  deleteAllUsers: `${API_BASE_URL}/api/users`,

  // Specific route for fetching pending orders for a seller
  getPendingOrdersForSeller: (sellerId) => `${API_BASE_URL}/api/pendingOrder/${sellerId}`,
};