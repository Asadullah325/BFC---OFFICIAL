import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/orders";

export const createOrder = async (orderData) => {
    console.log("Sending Order Data:", JSON.stringify(orderData, null, 2));

    try {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const token = user.token ? `Bearer ${user.token}` : null;

        const formattedOrder = {
            order: {
                ...orderData,
                items: orderData.items?.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price ?? 0 // Ensure price is always present
                })) || []
            }
        };

        const { data } = await axios.post(`${API_BASE_URL}/create`, formattedOrder, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        });

        return data;
    } catch (error) {
        console.error("Order creation failed:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Order creation failed");
    }
};



