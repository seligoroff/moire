<template>
    <form class="filter__form form" action="#" method="get" @submit.prevent="filterProducts">
        <fieldset class="form__block">
          <legend class="form__legend">Цена</legend>
          <label class="form__label form__label--price" for="minPrice">
            <input class="form__input" type="text" v-model.number="filters.minPrice">
            <span class="form__value">От</span>
          </label>
          <label class="form__label form__label--price" for="maxPrice">
            <input class="form__input" type="text" v-model.number="filters.maxPrice" >
            <span class="form__value">До</span>
          </label>
        </fieldset>

        <p v-if="loadingCategories">Загрузка категорий...</p>
        <p v-else-if="loadingCategoriesError">Ошибка загрузки! {{ loadingCategoriesError }}</p>
        <fieldset class="form__block" v-else>
          <legend class="form__legend">Категория</legend>
          <label class="form__label form__label--select" for="category">
            <select class="form__select" type="text" v-model="filters.categoryId" >
              <option value="">Все категории</option>
              <option :value="category.id" v-for="category in categories"
                    :key="category.id" >{{ category.title }}</option>
            </select>
          </label>
        </fieldset>
        <p v-if="loadingMaterials">Загрука материалов...</p>
        <p v-else-if="loadingMaterialsError">Ошибка загрузки! {{ loadingMaterialsError }}</p>
        <fieldset class="form__block" v-else>
          <legend class="form__legend">Материал</legend>
          <ul class="check-list">
            <li class="check-list__item" v-for="material in materials" :key="material.id">
              <label class="check-list__label" for="material"
                   @click.prevent="checkMaterial(material.id)"
                   @keyup.space="checkMaterial(material.id)">
    <input class="check-list__check sr-only" type="checkbox"
           v-model="filters.materialIds" :value="material.id"
           >
                <span class="check-list__desc">
                  {{ material.title }}
                  <span>({{ material.productsCount }})</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <p v-if="loadingSeasons">Загрука коллекций...</p>
        <p v-else-if="loadingSeasonsError">Ошибка загрузки! {{ loadingSeasonsError }}</p>
        <fieldset class="form__block" v-else >
          <legend class="form__legend">Коллекция</legend>
          <ul class="check-list">
            <li class="check-list__item" v-for="season in seasons" :key="season.id">
              <label class="check-list__label" for="collection"
                    @click.prevent="checkSeason(season.id)"
                    @keyup.space="checkSeason(season.id)">
    <input class="check-list__check sr-only"
           type="checkbox" v-model="filters.seasonIds" :value="season.id">
                <span class="check-list__desc">
                  {{ season.title }}
                  <span>({{ season.productsCount }})</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <button class="filter__submit button button--primery" type="submit">
          Применить
        </button>
        <button class="filter__reset button button--second" type="button"
            @click.prevent="reset" v-if="filterUsed">
          Сбросить
        </button>
    </form>
</template>
<script>
export default {
  data() {
    return {
      filterUsed: false,
      filters: {
        minPrice: 0,
        maxPrice: 0,
        categoryId: '',
        materialIds: [],
        seasonIds: [],
      },
    };
  },
  computed: {
    seasons() {
      return this.$store.state.seasons;
    },
    materials() {
      return this.$store.state.materials;
    },
    categories() {
      return this.$store.state.categories;
    },
    loadingCategories() {
      return this.$store.state.loadingCategories;
    },
    loadingCategoriesError() {
      return this.$store.state.loadingCategoriesError;
    },
    loadingSeasons() {
      return this.$store.state.loadingSeasons;
    },
    loadingSeasonsError() {
      return this.$store.state.loadingSeasonsError;
    },
    loadingMaterials() {
      return this.$store.state.loadingMaterials;
    },
    loadingMaterialsError() {
      return this.$store.state.loadingMaterialsError;
    },
  },
  methods: {
    checkMaterial(value) {
      if (this.filters.materialIds.includes(value)) {
        this.filters.materialIds = this.filters.materialIds.filter((item) => item !== value);
      } else {
        this.filters.materialIds.push(value);
      }
    },
    checkSeason(value) {
      if (this.filters.seasonIds.includes(value)) {
        this.filters.seasonIds = this.filters.seasonIds.filter((item) => item !== value);
      } else {
        this.filters.seasonIds.push(value);
      }
    },
    filterProducts() {
      this.$store.commit('changeFilters', this.filters);
      this.$store.dispatch('loadProducts');
      this.filterUsed = true;
    },
    reset() {
      this.filters.minPrice = 0;
      this.filters.maxPrice = 0;
      this.filters.categoryId = '';
      this.filters.materialIds = [];
      this.filters.seasonIds = [];
      this.filterProducts();
      this.filterUsed = false;
    },
  },
  created() {
    this.$store.dispatch('loadSeasons');
    this.$store.dispatch('loadMaterials');
    this.$store.dispatch('loadProductCategories');
  },
};
</script>
