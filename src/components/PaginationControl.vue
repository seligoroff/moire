<template>
    <ul class="catalog__pagination pagination">
        <li class="pagination__item">
          <a class="pagination__link pagination__link--arrow"
             :class="{'pagination__link--disabled' : current < 2}"
             aria-label="Предыдущая страница"
             :href="current < 2 ? false : '#'"
             @click.prevent="prev">
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-left"></use>
            </svg>
          </a>
        </li>
        <li class="pagination__item" v-for="page in pages" :key="page">
          <a class="pagination__link"  :href="page != current"
             :class="{'pagination__link--current' : page == current }"
             @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>
        <li class="pagination__item">
          <a class="pagination__link pagination__link--arrow"
             :class="{'pagination__link--disabled' : current + 1 >= pages}"
             :href="current + 1 >= pages ? false : '#'"
             aria-label="Следующая страница"
             @click.prevent="next"
             >
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </a>
        </li>
    </ul>
</template>
<script>
export default {
  props: ['pages', 'current'],
  methods: {
    changePage(page) {
      this.$store.commit('changePage', page);
    },
    prev() {
      this.$store.commit('changePage', this.current - 1);
    },
    next() {
      this.$store.commit('changePage', this.current + 1);
    },
  },
};
</script>
