<template>
    <div class="container">
        <div class="header">
            <div class="logo">Todos List</div>
            <div class="header-left">
                <span class="name">{{ account.name }}</span>
                <div class="logout" @click="logout">
                    Logout
                </div>
            </div>
        </div>
        <div class="left-side">
            <ul>
                <li :class="{'act': clickId==1}" @click="clickId=1">
                    <router-link to="/list">All List</router-link>
                </li>       
                <li :class="{'act': clickId==2}" @click="clickId=2">
                    <router-link to="/list/addlist">Add List</router-link>
                </li>  
                <li :class="{'act': clickId==3}" @click="clickId=3">
                    <router-link to="/list/account">Account</router-link>
                </li>  
            </ul>
        </div>
        <div class="right-side">
            <router-view
                :items="items"
                :account="account"
                @remove="removeItem"
                @add="addItem"
                @change="changeItem"
                @changeOwn="changeOwn"
            ></router-view>
        </div>
    </div> 
</template>

<script>  
    import { mapActions, mapState } from 'vuex'

    export default {
        data(){
            return{
                clickId: 1
            };
        }, 
        computed:  mapState({
            account: state => state.details.account,
            items: state => state.details.items  
        }),
        beforeCreate(){    
            this.$store.dispatch('userInit');    
        },
        methods: { 
            ...mapActions([
                'logOut', 
                'userAdd',
                'userRemove',
                'userChange',
                'ownChange'
            ]),
            addItem(item){ 
                this.userAdd(item);
            },
            removeItem(id){
                this.userRemove(id); 
            },
            changeItem(obj){
                this.userChange(obj); 
            },
            changeOwn(obj){  
                this.ownChange(obj);    
            },
            logout(){ 
                this.logOut();
                this.$router.replace('/home/login');
            }
        } 
    }
</script>

<style scoped>
@import '../assets/scss/css/menuList.css';
</style>
