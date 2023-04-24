<template>
    <img :src="defaultImage" :alt="title" >
</template>
<script>
import { PLACEHOLDER_SERVICE_URL } from '@/config';

export default {
  props: {
    title: {
      default: '',
    },
    imageWidth: {
      default: 530,
    },
    imageHeight: {
      default: 701,
    },
  },
  computed: {
    defaultImage() {
      return `${PLACEHOLDER_SERVICE_URL}/${this.imageWidth}x${this.imageHeight}/bbb/fff`;
    },
  },
};
</script>
