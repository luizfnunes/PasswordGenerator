<template>
    <span :class="'badge '+setColor">
    {{ value }}
    </span>
</template>

<script>
export default {
    name: 'TopBadge',
    props: {
        value: {
            //type: Number,
            required: true
        },
        color:{
            type: String,
        }
    },
    computed:{
        setColor(){
            if(!this.color) return 'bg-info'
            return this.color
        }
    }
}
</script>