import { defineStore  } from 'pinia';

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		products:  JSON.parse(localStorage.getItem('cart') || '[]'),
	}),
	actions: {
		addProduct(id: number) {
			localStorage.setItem('cart', JSON.stringify(this.products));
			const productIndex = this.products.findIndex(product => product.id === id);
			if (productIndex !== -1) {
				this.products[productIndex].quantity++;
			} else {
				this.products.push({ id, quantity: 1 });
			}
		},
	},
	getters: {
		totalQuantity(): any {
			return this.products.reduce((total: any, product: any) => total + product.quantity, 0);
		},
	},
});
