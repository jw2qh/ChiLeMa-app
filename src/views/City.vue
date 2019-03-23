<template>
    <div class="search-box">
        <Header :cityHead="true"></Header>
        <form action="" class="form-box">
            <div  class="input-box">
                <input type="text" v-model="searchword" placeholder="输入学校、商务楼、地址">
                <i @click="clearText">x</i>
            </div>
            <mu-flex justify-content="center" align-items="center" @click="search(searchword)">
                <mu-button full-width color="primary">提交</mu-button>
            </mu-flex>
        </form>
        <div v-if="history">
            <header class="search-title">搜索历史</header>
            <div class="result-box" v-for="(result, index) in $store.state.searchHistory" :key="index"
                 @click="secLocation(result)">
                <h4 class="result-title">{{result.name}}</h4>
                <p class="result-content">{{result.address}}</p>
            </div>
            <footer class="clear-all" v-show="$store.state.searchHistory.length!==0" @click="clearAllHistory">清空所有</footer>
        </div>
        <div v-else-if="find">
            <div class="result-box" v-for="(result, index) in findResult" :key="index" @click="secLocation(result)">
                <h4 class="result-title">{{result.name}}</h4>
                <p class="result-content">{{result.address}}</p>
            </div>
        </div>
        <div v-else>
            <p class="result-text">很抱歉！无搜索结果</p>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'

    const cityDetail = '/api/v1/cities/'
    const shopDetail = '/api/v1/pois?'

    export default {
        name: "City",
        components:{
            Header,
        },
        data(){
            return{
                cityInformation: '',
                searchword:'',
                history: true,
                find: false,
                loadVal: false,
                findResult: [],
            };
        },
        methods:{
            search(result){
                if(result !== ''){
                    this.history = false;
                    this.axios.get(shopDetail + 'city_id=' + this.$route.query.id + '&keyword=' + result + '&type=search')
                        .then( response => {
                            this.findResult = response.data;
                            if(this.findResult.length) this.find = true;
                            else this.find = false;
                        }, err => { alert(err); });
                }
            },
            secLocation(result){
                this.$store.commit('addSearch',result);
                this.$store.commit('changeTitle',result.name);
                this.$store.commit('getGeohash',result.geohash);
                this.$router.push({path:'/msite/4',query:{geohash:result.geohash}});
            },
            clearText(){
                this.searchword = '';
            },
            clearAllHistory(){
                this.$store.commit('clearAll');
            },
        },
        created(){
            this.axios.get(cityDetail + this.$route.query.id).then( res => {
                this.cityInformation = res.data;
            }, err => { alert(err); });
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .search-box{
        width: 100%;

        .form-box{
            margin-top: .6rem;
            padding: .8rem 1rem 0;
            background-color: #fff;
            border-top: 1px solid #e4e4e4;
            border-bottom: 2px solid #e4e4e4;
            box-sizing: border-box;

            .input-box{
                display: flex;
                width: 100%;
                height: 2rem;
                padding-left: .3rem;
                font-size: 14px;
                border: 1px solid #e4e4e4;
                box-sizing: border-box;
            }

            input{
                flex: 1;
                border: 0;
                outline: none;
            }

            i{
                width: 30px;
                height: 100%;
                padding-top: 4px;
            }

            .mu-button{
                margin: .8rem;
                vertical-align: middle;
                font-size: 16px;
            }
        }

        .search-title{
            padding-left: .6rem;
            text-align: left;
            font-size: 12px;
            border-bottom: 2px solid #e4e4e4;
            box-sizing: border-box;
        }

        .result-box{
            width: 100%;
            padding: .8rem .6rem .4rem;
            text-align: left;
            background-color: #fff;
            border-bottom: 1px solid #e4e4e4;
            box-sizing: border-box;

            .result-title{
                font-size: 14px;
                color: #333;
                padding-bottom: .3rem;
            }

            .result-content{
                font-size: 12px;
                color: #999;
            }

            .result-text{
                font-size: 16px;
            }
        }

        .clear-all{
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            font-size: 1rem;
            color: #666;
            background-color: #fff;
        }
    }

</style>