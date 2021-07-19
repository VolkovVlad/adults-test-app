<template>
  <div class="request">
    <table v-if="requestLog">
      <tr>
        <th>Url</th>
        <td>{{requestLog.url}}</td>
      </tr>
      <tr>
        <th>Method</th>
        <td class="upcase">{{requestLog.method}}</td>
      </tr>
      <tr>
        <th>State</th>
        <td>{{requestLog.state}}</td>
      </tr>
      <tr>
        <th>Request Headers</th>
        <td><pre class="scroller">{{ tryJson(requestLog.send.headers) || '-' }}</pre></td>
      </tr>
      <tr>
        <th>Request Body</th>
        <td><pre class="scroller">{{ tryJson(requestLog.send.body) || '-' }}</pre></td>
      </tr>
      <tr>
        <th>Response Headers</th>
        <td><pre class="scroller">{{ tryJson(requestLog.received.headers) || '-' }}</pre></td>
      </tr>
      <tr>
        <th>Response Body</th>
        <td><pre class="scroller">{{ tryJson(requestLog.received.body) || '-' }}</pre></td>
      </tr>
      <tr>
        <th>Response Status</th>
        <td>{{ requestLog.status }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex';
  import { RequestLog, StoreModel } from '@app-common/state';

  export default {
    name: 'request',
    methods: {
      tryJson(source: string | unknown) {
        if (typeof source !== 'string') {
          return source
        }

        try {
          const validObj = JSON.parse(source);
          const beautifyJSON = JSON.stringify(validObj, null , 2);
          return beautifyJSON
        } catch (err) {
          return source
        }
      }
    },
    props: {
      requestId: {
        type: [String, Number],
        required: true
      }
    },
    computed: {
      ...mapState({
        requestLog({apiHistory}: StoreModel) {
          return apiHistory.find(({id}: RequestLog) => this.requestId === `${id}`)
        }
      })
    }
  };
</script>

<style scoped lang="scss">
  .request {
    background: #fff;
    min-height: 100%;
    padding: 30px;
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
    vertical-align: top;
    overflow: hidden;

    &.upcase{
      text-transform: uppercase;
    }
  }

  pre {
    white-space: pre-wrap;
    display: block;
    overflow: auto;
    margin: 0;
  }
</style>
