<template>
    <div>
        <Header :loginAfterHead="true"></Header>
        个人中心
        <Bar></Bar>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import Bar from '../components/Bar.vue'

    export default {
        name: "Mine",
        components:{
            Header,
            Bar,
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>