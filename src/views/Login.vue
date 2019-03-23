<template>
    <div>
        <Header :loginHead="true"></Header>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'

    export default {
        name: "Login",
        components:{
            Header,
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>