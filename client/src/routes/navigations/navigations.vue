<template>
  <div class="navigations">
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(navStep, index) in navigation" :key="index">
          <td>{{ navStep.event }}</td>
          <td><a :href="navStep.from" target="_blank"> {{ navStep.from }}</a></td>
          <td><a :href="navStep.to" target="_blank"> {{ navStep.to }}</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'navigations',
  computed: {
    ...mapState(['navigation'])
  }
};
</script>

<style scoped lang="scss">
  .navigations {
    background: #fff;
    min-height: 100%;
    padding: 30px;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
    max-width: calc(100% - 60px);
    overflow: auto;
  }

  thead {
    background: #ccc;
    border-bottom: 1px solid #ccc;
  }

  tr:nth-of-type(2n) {
    background: #f9f9f9;
  }

  td, th {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
    max-width: 500px;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
