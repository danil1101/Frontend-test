<template>
	<div class="sidebar">
		<div class="sidebar__body">
			<div class="sidebar__collapses collapse">
				<div class="collapse__item item">
					<button class="item__title">
						Бренды
					</button>
					<div class="collapse item__body">
						<div class="checkbox " v-for="brand in dataBrands" :key="brand.id">
							<input :id="brand.code" v-model="selectedBrands" class="checkbox__input" type="checkbox" :value="brand.id">
							<label :for="brand.code" class="checkbox__label">
								<span class="checkbox__text">{{ brand.title }}</span>
							</label>
						</div>
					</div>
				</div>
				<div class="collapse__item item">
					<button class="item__title">
						Сортировка по цене
					</button>
					<div class="collapse item__body">
						<label class="options" v-for="sortOption in sortOptions" :key="sortOption">
							<input type="radio" class="options__input" name="sortOption" :value="sortOption"
								v-model="selectedSortOption" />
							<span class="options__label"> {{ sortOption }}</span>
						</label>
					</div>
				</div>
			</div>
			<div class="sidebar__footer">
				<button class="sidebar__button button" @click="sendFilter">Применить</button>
				<button class="sidebar__reset" @click="resetCheckboxs">⨉ Сбросить</button>
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">
import dataBrands from "../assets/brands.json";
import { defineEmits, ref } from 'vue';

const emits = defineEmits(['sendSort']);

const selectedBrands = ref([]);

const selectedSortOption = ref([]);
const sortOptions = ["price-low-to-high", "price-high-to-low"];

const sendFilter = () => {
	const sort = { 'brand': selectedBrands.value, 'price': selectedSortOption.value };
	emits('sendSort', sort);
}

const resetCheckboxs = () => {
	selectedSortOption.value = [];
	selectedBrands.value = [];
}

</script>

<style lang="scss" scoped>
@import "../style.scss";

.sidebar {
	flex: 0 1 20%;

	&__body {
		display: flex;
		flex-direction: column;
	}

	&__collapses {
		display: flex;
	}

	&__footer {
		display: flex;
		flex-direction: column;
	}

	&__button {
		margin-bottom: 10px;
	}

	&__reset {
		text-decoration: underline;
		font-size: 14px;
		text-align: center;
		color: $colorLight;

		&:hover {
			text-decoration: none;
		}
	}
}

.collapse {
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 20px;

	&__item {
		display: flex;
		flex-direction: column;
	}
}

.item {

	&__title {



		font-size: 18px;
		font-weight: 500;
		color: $colorDark;
		margin: 0;
		padding: 0;
		margin-bottom: 10px;
		text-align: left;
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
}

.checkbox {
	position: relative;

	&:not(:last-child) {
		margin-bottom: em(5);
	}

	&__input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;

		&:checked+.checkbox__label:before {
			color: $colorLight;
		}
	}

	&__label {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		position: relative;
		gap: 10px;
		user-select: none;

		&:before {
			content: '\2713';
			flex: 0 0 20px;
			position: relative;
			top: 1px;
			width: 20px;
			height: 20px;
			border: 1px solid $colorLight;
			font-size: 14px;
			color: #fff;
			text-align: center;

			display: inline-block;
		}
	}
}
</style>

<style lang="scss" scoped>
@import "../style.scss";

.options {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	position: relative;

	&__item {
		position: relative;
		cursor: pointer;

		&:not(:last-child) {
			margin-bottom: em(5);
		}
	}

	&__input {
		width: 0;
		height: 0;
		opacity: 0;
		position: absolute;

		&:focus+.options__label:before {
			box-shadow: 0 0 5px #000;
		}

		&:checked+.options__label:after {
			transform: scale(1);
		}
	}

	&__label {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		gap: 10px;

		&:before {
			content: "";
			margin-top: 3px;
			display: inline-block;
			align-self: flex-start;
			width: 20px;
			height: 20px;
			flex: 0 0 20px;
			border-radius: 50%;
			border: 1px solid #a7a9ac;
		}

		&:after {
			content: "";
			transition: all 0.3s ease 0s;
			transform: scale(0);
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-top: 3px;
			display: inline-block;
			background-color: $colorLight;
			position: absolute;
			left: 5px;
			top: 5px;
		}
	}

}
</style>