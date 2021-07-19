<template>
  <div class="api-history">
    <table v-if="apiHistoryCount > 0">
      <thead>
      <tr>
        <th>Method</th>
        <th>Url</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(req, index) in shortApiHistory" :key="index" @click="openRequest(req.id)">
        <td class="upcase">{{ req.method }}</td>
        <td>{{ req.url }}</td>
      </tr>
      </tbody>
    </table>
    <p class="total">
      Total Requests Count: {{apiHistoryCount}}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Router from '@/router'
export default {
  name: 'api-history',
  computed: {
    ...mapGetters(['shortApiHistory', 'apiHistoryCount'])
  },
  methods: {
    openRequest: (requestId) => Router.push({ name: 'Request', params: { requestId } })
  }
};
</script>

<style scoped lang="scss">
  .api-history {
    background: #fff;
    min-height: 100%;
    padding: 30px;
  }

  .total {
    font-weight: bold;
    max-width: 597px;
    margin: 20px auto;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
    width: calc(100% - 60px);
    max-width: 500px;
    overflow: auto;
  }

  thead {
    background: #ccc;
    border-bottom: 1px solid #ccc;
  }

  tr {
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background: #ddd !important;
    }
  }

  tr:nth-of-type(2n) {
    background: #f9f9f9;
  }

  td, th {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
    max-width: 500px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &.upcase{
      text-transform: uppercase;
    }
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
