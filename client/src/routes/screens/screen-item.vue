<template>
  <router-link
    :to="link"
    :class="{disabled: asView}"
    class="screen-card"
  >
    <div class="screen-layer">
      <img class="screenshot" :src="screenshot">
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'screen-item',
  props: {
    order: {
      type: Number,
      required: true
    },
    screenshot: {
      type: String,
      required: true
    },
    asView: {
      type: Boolean
    }
  },
  computed: {
    link() {
      return `/screens/${this.order}`
    }
  }
};
</script>

<style scoped lang="scss">
  .screen-card {
    display: block;
    padding: 15px;
    background: #fff;
    border: 1px solid #dedede;
    width: 200px;
    border-radius: 6px;
    text-decoration: none;

    transition: 0.3s; 
    
    &:hover {
      background: #f1f1f1;
    }

    &.disabled {
      pointer-events: none;
    }
  }

  .screen-layer {
    position: relative;
    height: 200px;
    background: #ccc
        url('data:image/gif;base64,R0lGODlhDAAMAIAAAMzMzP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQjk4OTI0MUY5NTIxMUUyQkJDMEI5NEFEM0Y1QTYwQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQjk4OTI0MkY5NTIxMUUyQkJDMEI5NEFEM0Y1QTYwQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNCOTg5MjNGRjk1MjExRTJCQkMwQjk0QUQzRjVBNjBDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNCOTg5MjQwRjk1MjExRTJCQkMwQjk0QUQzRjVBNjBDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAAwADAAAAhaEH6mHmmzcgzJAUG/NVGrfOZ8YLlABADs=')
        top left repeat;
    background-size: 20px;
    border: 1px solid #dedede;
    border-radius: 6px;
  }

  .screenshot {
    position: absolute;
    top: 10px;
    left: 10px;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    object-position: center;
    object-fit: contain;
  }
</style>
