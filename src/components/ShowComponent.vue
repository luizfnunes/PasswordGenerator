<template>
    <div id="show-container">
        <div class="password-item" v-for="(password, index) in passwords" :key="index">
            <button type="button" class="position-absolute top-0 start-100 translate-middle p-0 rounded-circle border-0 bg-transparent text-danger" @click="closeEvent(index)"><i class="bi bi-x-circle-fill"></i></button>
            <div class="password" @click="copyEvent(index)">{{ password }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowComponent',
    props:{
        passwords:{
            type: Array,
            required: true
        }
    },
    methods:{
        closeEvent(index){
            this.$emit('removePassword', index);
        },
        copyEvent(index){
            this.$emit('copiedPassword', index);
        }
    }
}
</script>

<style scoped>
#show-container{
    position: relative;
    display: flex;
    gap: 10px;
    background-color: #ecf0f1;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    flex-wrap: wrap;
}
.password-item{
    padding: 10px;
    background-color: #95a5a6;
    border-color: #dfe4e4;
    border-radius: 0.375rem;
    color: #FFF;
    position: relative;
}
.password{
    cursor: pointer;
}
</style>