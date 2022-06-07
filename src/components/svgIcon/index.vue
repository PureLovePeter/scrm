<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners" :style="{width: width +'em', height:height+'em'}">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  /* width: 2em;
  height: 2em; */
  vertical-align: -0.15em;
  fill: currentColor !important;
  overflow: hidden;
}
</style>
