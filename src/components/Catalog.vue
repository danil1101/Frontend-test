<template>
	<div class="catalog">
		<div class="catalog__row">
			<div class="catalog__item item" v-for="product in paginatedProducts" :key="product.id">
				<div class="item__body">
					<img :src="'/Frontend-test' + product.image" class="item__image" :alt="product.title">
					<p class="item__title">{{ product.title }}</p>
					<p class="item__price">Цена: {{ product.regular_price.value }} {{ product.regular_price.currency }}</p>
					<p>Бренд: {{ product.brand }}</p>
					<p>Артикул: {{ product.sku }}</p>
					<button class="item__button button" @click="() => addProduct(product.id)">Добавить в коризну</button>
				</div>
			</div>
		</div>
		<div class="pagination">
			<button @click="previousPage" class="pagination__button" :disabled="currentPage === 1">Previous</button>
			<button @click="nextPage" class="pagination__button"
				:disabled="currentPage === totalPages || currentPage === 1">Next</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import dataCatalog from "../assets/products.json";
import { ref, computed, watch } from 'vue';
import { useCartStore } from "@/stores/CartStore";
import { defineProps } from 'vue';
const cartStore = useCartStore();

const addProduct = (id: number) => {
	cartStore.addProduct(id)
}


const props = defineProps({
	sort: {
		type: Object
	},
});

const filterProducts = computed(() => {
	if (props.sort?.brand?.length) {
		return dataCatalog.filter((i: any) => props.sort?.brand.includes(i.brand))
	} else if (props.sort?.price == 'price-low-to-high') {
		return dataCatalog.sort((a: any, b: any) => a.regular_price.value - b.regular_price.value);
	} else if (props.sort?.price == 'price-high-to-low') {
		return dataCatalog.sort((a: any, b: any) => b.regular_price.value - a.regular_price.value);
	} else {
		return dataCatalog
	}
})

const productsPerPage = 6;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(dataCatalog.length / productsPerPage));

const paginatedProducts = computed(() => {
	const startIndex = (currentPage.value - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	return filterProducts.value.slice(startIndex, endIndex);
});


const previousPage = () => {
	currentPage.value -= 1;
}

const nextPage = () => {
	currentPage.value += 1;
}
</script>

<style lang="scss" scoped>
.catalog {
	flex: 1 1 auto;
	margin-left: 50px;

	@media (max-width: 767.98px) {
		margin: 0;
	}

	&__row {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		row-gap: 10px;
		column-gap: 5px;
	}

}

.pagination {
	margin: 20px;
	display: flex;
	justify-content: center;
	gap: 30px;

	&__button {
		font-size: 16px;
	}
}

.item {
	color: #000;

	@media (max-width: 544.98px) {
		justify-content: center;
		text-align: center;
	}

	&__image {
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		max-width: 300px;

		@media (max-width: 767.98px) {
			max-width: 250px;
		}
	}

	&__body {
		padding: 5px;
	}

	&__title {
		font-size: 18px;
	}


	&__button {
		margin-top: 10px;
	}
}
</style>