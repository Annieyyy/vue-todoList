<template>
    <div class="login"> 
        <form>
          <div class="form-group">
            <label for="name"> </label>
            <input type="text" class="name" id="name" placeholder="Username" v-model="name">
          </div>

          <div class="form-group">
            <label for="password" class="last"></label>
                <input type="password" id="password" placeholder="Password" v-model="password">
          </div>

          <div class="err">
              <em v-show="req">*Usename or password error</em>
          </div>
          <button class="btn btn-primary" @click="login">Login</button>
        </form>
    </div>
</template> 

<script>
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                name: '',
                password: '',
                req: false
            };
        },
        methods: {
            ...mapActions(['logIn']),
            login(){ 
                this.req = false; 
                setTimeout(() => {
                    this.logIn({
                        name: this.name,
                        password: this.password
                    });
                    if(sessionStorage.login && sessionStorage.login == 1){  
                        this.$router.replace('/list');
                    }else{
                        this.req = true;
                    } 
                }, 1000);
            }
        }
    }
</script>

<style scoped>
@import '../assets/scss/css/login.css'
</style>