<template>
	<div class="cart">
		<div class="cart__container">
			<div class="cart__title">Моя корзина</div>
			<div class="cart__count">В корзине {{ cartStore.totalQuantity }} товаров</div>
			<div class="cart__row">
				<div class="cart__item item" v-for="product in products" :key="product.id">
					<img :src="product.image" :alt="product.title" class="item__image">
					<p class="item__title">{{ product.title }}</p>
					<div class="item__desc">
						<p class="item__price">Цена: {{ product.regular_price.value }} {{ product.regular_price.currency }}</p>
						<p>Бренд: {{ product.brand }}</p>
						<p>Артикул: {{ product.sku }}</p>
						<div data-quantity class="quantity">
							<button data-quantity-plus type="button" class="quantity__button quantity__button_plus"
								@click="() => plusQuantity(product.id)"></button>
							<div class="quantity__input">
								<input data-quantity-value autocomplete="off" type="text" name="form[]"
									:value="cartStore.products.find((i: any) => i.id === product.id).quantity">
							</div>
							<button data-quantity-minus type="button" class="quantity__button quantity__button_minus"
								@click="() => minusQuantity(product.id)"></button>
						</div>
					</div>
				</div>
			</div>
			<div class="cart__info">
				<form class="form" @submit.prevent="sendData">
					<div class="form__title">Ваши данные</div>
					<div class="form-group">
						<label for="validationCustom01">Имя</label>
						<input type="text" class="form-control" v-model="name" id="validationCustom01" required>
						<div class="invalid-feedback">Пожалуйста введите свое имя</div>
					</div>
					<div class="form-group">
						<label for="validationCustom02">Телефон</label>
						<input type="number" class="form-control" v-model="number" id="validationCustom02"
							placeholder="+7 800 800 80 80" required>
						<div class="invalid-feedback">Пожалуйста введите свой номер телефона</div>
					</div>
					<div class="cart__purchase">
						<div class="cart__amount">Итого: {{ getSumm() }} USD</div>
						<button class="cart__button button" type="submit">Оформить заказ</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
		Launch demo modal
	</button>
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
					<button type="button" class="close" data-dismiss="modal" @click="closeModal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="alert alert-success" role="alert">
						Заказ успешно оформлен!
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from "vue";
import dataCatalog from "../assets/products.json";
import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();

const name = ref<string>('')
const number = ref<string>('')
const products = ref([])

const sendData = () => {
	if (products.value.length && name.value && number.value) {
		const orderData = {
			customerName: name.value,
			customerNumber: number.value,
			products: cartStore.products
		};

		axios.post('https://app.aaccent.su/js/confirm.php', JSON.stringify(orderData))
			.then((response: { data: { result: string; }; }) => {
				if (response.data.result === "ok") {
					const modal = document.querySelector('.modal') as HTMLElement;
					modal.classList.add('show');
					modal.style.display = 'block';
				}
			})
			.catch(error => console.log(error));
	}
}

const closeModal = () => {
	const modal = document.querySelector('.modal') as HTMLElement;
	modal.classList.remove('show');
	modal.style.display = 'none';
}

const getSumm = () => {
	let summ = 0;
	products.value.forEach(product => {
		summ += product.regular_price.value * cartStore.products.find((i: any) => i.id === product.id).quantity
	});
	return summ.toFixed(2);
}

onMounted(() => {
	products.value = cartStore.products.map((i: any) => dataCatalog.find((j: any) => j.id === i.id));
})

const plusQuantity = (id: number) => {
	cartStore.products.find((i: any) => i.id === id).quantity++;
	localStorage.setItem('cart', JSON.stringify(cartStore.products));
}

const minusQuantity = (id: number) => {
	cartStore.products.find((i: any) => i.id === id).quantity ? cartStore.products.find((i: any) => i.id === id).quantity-- : null;
	localStorage.setItem('cart', JSON.stringify(cartStore.products));
}
</script>

<style lang="scss" scoped>
@import "../style.scss";

.form {
	margin-bottom: 20px;

	&__title {
		font-size: 20px;
		margin-bottom: 10px;
	}
}

.close {
	margin-bottom: 5px;
	font-size: 25px;
}

.cart {
	&__container {
		padding-top: 30px;
	}

	&__info {
		margin-top: 80px;
		display: flex;
		flex-direction: column;

		label {
			margin-bottom: 5px;
		}

		input {
			max-width: 700px;
			margin-bottom: 10px;
		}
	}

	&__amount {
		font-size: 25px;
		margin-bottom: 20px;
	}

	&__button {
		padding: 12px 20px;
		max-width: 200px;
	}


	&__title {
		font-size: 25px;
		margin-bottom: 20px;
	}

	&__count {
		font-size: 18px;
		margin-bottom: 20px;
	}

	&__row {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__item {
		justify-content: space-between;
		display: flex;
		border-bottom: 1px solid $colorDark;
		padding-bottom: 10px;
		flex-wrap: wrap;


	}
}

.item {
	@media (max-width: 425.98px) {
		justify-content: center;
		text-align: center;
	}


	&__desc {
		display: flex;
		flex-direction: column;
		gap: 5px;

		@media (max-width: 425.98px) {
			flex: 1 1 100%;
			margin: 0 auto;
		}
	}

	&__image {
		img {
			width: 100px;
			height: 100px;
			object-fit: cover;
		}

		@media (max-width: 425.98px) {
			flex: 1 1 100%;
		}

		max-width: 130px;
	}

	&__title {
		@media (max-width: 425.98px) {
			flex: 1 1 100%;
		}

		font-size: 18px;
	}

}
</style>

<style scoped lang="scss">
.quantity {
	width: 100px;
	height: 33px;
	display: flex;
	border: 1px solid rgba(0, 0, 0, 0.45);

	@media (max-width: 425.98px) {
		margin: 0 auto;
	}

	&__button {
		flex: 0 0 30px;
		position: relative;
		cursor: pointer;

		&::before,
		&::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transition: all 0.3s ease 0s;
			margin: 0px 0px 0px -4.5px;
			background-color: #000;
			width: 9px;
			height: 1px;
		}

		@media (any-hover: hover) {
			&:hover {

				&::before,
				&::after {
					background-color: rgba(0, 0, 0, 0.5);
				}
			}
		}

		&_plus {
			&::before {
				transform: rotate(-90deg);
			}
		}

	}

	&__input {
		flex: 1 1 auto;

		input {
			outline: none;
			border: none;
			height: 100%;
			font-size: 14px;
			width: 100%;
			text-align: center;
		}
	}
}
</style>