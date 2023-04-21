<template>
    <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>
    </div>

    <div class="content__catalog">
        <aside class="filter">
            <form-filter></form-filter>
        </aside>

      <section class="catalog">
        <ul class="catalog__list">
          <li class="catalog__item">
            <a class="catalog__pic" href="#">
              <img src="img/product-1.jpg" srcset="img/product-1@2x.jpg 2x" alt="Название товара">
            </a>

            <h3 class="catalog__title">
              <a href="#">Кружевной бюстгалтер без косточек</a>
            </h3>

            <span class="catalog__price">
              3 690 ₽
            </span>

            <ul class="colors colors--black">
              <li class="colors__item">
                <label class="colors__label" for="color-1">
       <input class="colors__radio sr-only" type="radio" name="color-1"  value="#73B6EA" checked="">
                  <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                </label>
              </li>
            </ul>
          </li>
        </ul>
        <pagination-control></pagination-control>
      </section>
    </div>
  </main>

</template>

<script>
import FormFilter from '@/components/FormFilter.vue';
import PaginationControl from '@/components/PaginationControl.vue';

export default {
  data() {
    return {
      test: false,
    };
  },
  components: {
    FormFilter,
    PaginationControl,
  },
};
</script>
