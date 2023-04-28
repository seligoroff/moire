<template>
          <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link"
               @click.prevent="tab = 'info'"
               @keydown.space="tab = 'info'"
               :class="{'tabs__link--current' : tab === 'info'}"
               :href="{'#' : tab !== 'info'}">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link"
               @click.prevent="tab = 'delivery'"
               @keydown.space="tab = 'delivery'"
               :class="{'tabs__link--current' : tab === 'delivery'}"
               :href="{'#' : tab !== 'delivery'}">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content" v-if="tab === 'info'">
            <article>
            <h3>Состав:</h3>
            <div>
              <p v-for="material in materials"
                    :key="material.id">{{ emulatePercent() }}%
                  {{ material.title.toLowerCase() }}</p>
            </div>
            <h3>Уход:</h3>
            <p>
              Машинная стирка при макс. 30ºC короткий отжим<br>
              Гладить при макс. 110ºC<br>
              Не использовать машинную сушку<br>
              Отбеливать запрещено<br>
              Не подвергать химчистке<br>
            </p>
            </article>
        </div>
        <div class="item__content" v-else>
            Товар возврату не подлежит!
        </div>
      </div>
</template>
<script>
export default {
  props: ['materials'],
  data() {
    return {
      tab: 'info',
    };
  },
  methods: {
    emulatePercent() {
      return Math.floor(Math.random() * 100);
    },
  },
};
</script>
