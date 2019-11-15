<template>
    <div class="login"> 
        <form>
          <div class="form-group">
            <label for="name"></label>
            <input type="text" id="name" @focus.stop="focus=1" @blur="focus=0" placeholder="Username" v-model="account.name">
            <div class="err">
               <em v-show="nameIn==false">*Username can not empty</em>
               <em v-show="req===false&&focus!=1">*This name has already been used</em>
            </div>
          </div>

          <div class="form-group">
            <label for="phone" class="last"></label>
                <input type="text" id="phone" @focus="focus=2" @blur="focus=0" placeholder="Phone" v-model="account.phone">
          </div>
          <div class="err">
              <em v-show="telIn==false">*The phone number should be all Numbers.</em>
          </div>

          <div class="form-group">
            <label for="password" class="last"></label>
                <input type="password" id="password" @focus="focus=3" @blur="focus=0"  placeholder="Password" v-model="account.password">
          </div>
          <div class="err">
              <em v-show="pswIn==false">*The password should be all Numbers</em>
          </div>
          <button class="btn btn-primary" @click="addToSql">
            <span v-show="!result">Register</span>
            <span v-if="req" v-show="result">Registered successfully</span>
            <span v-else v-show="result">Register</span>
            </button>
        </form>
    </div>
</template> 


<script>  
    import { mapActions } from 'vuex' 

    export default {
        data(){
            return{
                account:{
                    name: '',
                    phone: '',
                    password: '',
                },
                result: false, 
                req: '',
                focus: 0,
                nameIn: true,
                telIn: true,
                pswIn: true
            };
        },
        methods: {
            ...mapActions(['register']),
            addToSql(){   
                this.nameIn = (this.account.name==''|| /\W/g.test(this.account.name)) ? false : true;
                this.telIn = (!this.account.phone.length) ? false : true;
                this.pswIn = (this.account.password.length<6) ? false : true;

                if(this.nameIn&&this.telIn&&this.pswIn){
                    this.result = false;
                    this.req = '';

                    setTimeout(() =>{
                        this.result = true;
                        this.register(this.account);
                        if(sessionStorage.register && sessionStorage.register==1){
                            this.req = true;
                            this.account.name = "";
                            this.account.phone = '';
                            this.account.password = '';
                        }else{ 
                            this.req = false;
                          }
                    }, 1000);
                } 
            }
        }
    }
</script>


<style scoped>
@import '../assets/scss/css/login.css'
</style> 