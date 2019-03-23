<template>
    <div>
        <Header :loginAfterHead="true"></Header>
        订单详情
        <Bar></Bar>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import Bar from '../components/Bar.vue'

    export default {
        name: "Order",
        components:{
            Header,
            Bar,
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>