<template>
  <div
    :class="'toast '+showAlert+' align-items-center'"
  >
    <div class="d-flex">
      <div class="toast-body">{{ message }}</div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        aria-label="Close"
        @click.prevent="closeToast()"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastAlert',
  props:{
    show:{
      required: true
    },
    message: {
      type: String
    }
  },
  methods:{
    closeToast(){
      this.$emit('closeToast');
    }
  },
  computed:{
    showAlert(){
      if(this.show){
        return 'show';
      }
      return '';
    }
  },
  watch:{
    show(val){
      if(val === true){
        setTimeout(() => {
          this.$emit('closeToast')
        }, 4000)
      }
    }
  }
}
</script>

<style scoped>
.toast{
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 20px;
  margin-bottom: 20px
}
</style>