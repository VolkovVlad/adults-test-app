<template>
  <div class="screen-description">
    <div class="screen-description-content">
      <screen-item
          class="screen-description-pic"
          :as-view="true"
          :order="order"
          :screenshot="element.pic"
      >
      </screen-item>
      <p class="uniq-selector">Uniq Selector: <b> {{ element.selector }} </b></p>
      <pre class="pre">
        {{element.html}}
      </pre>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import ScreenItem from '../screens/screen-item';

export default {
  name: 'screen-description',
  components: { ScreenItem },
  props: {
    order: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapState({
      element({screenshots}) {
        return (screenshots[this.order])
      }
    })
  }
};
</script>

<style scoped lang="scss">
  .screen-description {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
  }

  .screen-description-content {
    padding: 30px;
  }

  .screen-description-pic {
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .uniq-selector {
    font-size: 16px;
    text-align: center;
    max-width: 500px;
    margin: 20px auto;

    white-space: nowrap;

    b {
      font-weight: bold;
      font-style: italic;
    }
  }

  .pre {
    max-width: 500px;
    padding: 10px;
    background: #f8f5dd;
    white-space: pre-line;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: center;
    word-break: break-word;
  }
</style>
