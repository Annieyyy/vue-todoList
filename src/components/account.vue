<template>
    <div class="container">
        <div class="row">
            <h2>Account Information</h2>
            <div class="form-group">
                <label for="name">Username:</label>
                <input :class="className.name" 
                            type="text" 
                            id="name" 
                            v-model="name" 
                            :disabled='edit'/>
                <small class="nameIn" v-show="nameIn">* Username can not be empty</small>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input :class="className.phone" type="text" id="phone" v-model="phone" :disabled='edit'/>
                <small class="telIn" v-show="telIn">* The length can not be less than 6</small>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input :class="className.password" type="text" id="password" v-model="password" :disabled='edit'/>
                <small class="pswIn" v-show="pswIn">* name can not be empty</small>
            </div>
            <div class="editBtn" v-if="edit">
                <button class="btn btn-primary" @click="edit=false">Edit</button>
            </div>
            <div class="editBtn" v-else>
                <button class="btn btn-primary" :class="{'save': !save, 'return': save}" @click="change" :disabled="save">Save</button>
                <button class="return btn btn-primary" @click="notChange">Cancel</button>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        props: ["account"],
        data(){
            return{
                name: this.account.name,
                phone: this.account.phone,
                password: this.account.password,   
                edit: true,
                nameIn: false,
                telIn: false,
                pswIn: false
            }
        }, 
        methods:{
            change(){ 
                if(this.name&&this.phone&&this.password){
                    this.edit = true;  
                    this.$emit('changeOwn', {
                        name: this.name,
                        phone: this.phone,
                        password: this.password
                    });
                } 
            },
            notChange(){
                this.edit = true; 
                this.name = this.account.name;
                this.phone = this.account.phone;
                this.password = this.account.password;   

                this.nameIn = false;
                this.telIn = false;
                this.pswIn = false;
            } 
        },
        computed:{ 
            save: function(){
                this.nameIn = /\W/g.test(this.name)||this.name.length<1; 
                this.telIn = /\D/g.test(this.phone)||this.phone.length<1; 
                this.pswIn = (this.password.length < 6)||(/\W/g.test(this.password));

                var result = !(!this.nameIn&&!this.telIn&&!this.pswIn);
                return result;
            },
            className: function(){
                return{
                    name:{
                        read: this.edit,
                        error: this.nameIn
                    },
                    phone:{
                        read: this.edit,
                        error: this.telIn
                    },
                    password:{
                        read: this.edit,
                        error: this.pswIn
                    }
                };
            }
        }
    }
</script>

<style>
@import '../assets/scss/css/account.css';
</style>
