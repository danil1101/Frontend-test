<template>
	<div class="sidebar">
		<div class="sidebar__body">
			<div class="sidebar__selections selection">
				<div class="selection__item item">
					<a class="item__title" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
						aria-controls="collapseExample">
						Бренды
					</a>
					<div class="collapse item__body" id="collapseExample">
						<div class="checkbox " v-for="brand in dataBrands" :key="brand.id">
							<input :id="brand.code" ref="checkbox" class="checkbox__input" type="checkbox" :value="brand.sort">
							<label :for="brand.code" class="checkbox__label">
								<span class="checkbox__text">{{ brand.title }}</span>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar__footer">
				<button class="sidebar__button button">Применить</button>
				<button class="sidebar__reset" @click="resetCheckboxs">⨉ Сбросить</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import dataBrands from "../assets/brands.json";
import dataCatalog from "../assets/products.json";




const resetCheckboxs = () => {
	const checkboxs = document.querySelectorAll('.checkbox__input');
	checkboxs.forEach(checkbox => {
		checkbox.checked = false;
	});
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

	&__selections {
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

.selection {
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
		&:not(.collapsed)::after {
			transform: rotate(90deg);
		}

		position: relative;

		&::after {
			content: '';
			position: absolute;
			top: 6px;
			right: 0;
			display: inline-block;
			width: 1.20em;
			line-height: 0;
			content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
			transition: transform 0.25s ease;
			transform-origin: 0.5em 50%;
		}


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
