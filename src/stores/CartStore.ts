import { defineStore } from 'pinia';

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		products: Array(),
	}),
	actions: {
		addProduct(id: number) {
			const productIndex = this.products.findIndex(product => product.id === id);
			if (productIndex !== -1) {
				// Товар уже есть в корзине, увеличить количество
				this.products[productIndex].quantity++;
			} else {
				// Добавить новый товар в корзину
				this.products.push({ id, quantity: 1 });
			}
		},
	},
	getters: {
		totalQuantity(): any {
			return this.products.reduce((total, product) => total + product.quantity, 0);
		},
	},
});