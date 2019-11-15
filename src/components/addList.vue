<!-- add users -->
<template>   
    <div class="container">
        <div class="form-group">
            <label for="titlename">Title name:</label>
            <input type="text" 
                        v-model="title" 
                        :class="{'error': titleIn}" 
                        class="form-control" />
            <small class="titleIn" v-show="titleIn">* Title name can not be empty</small>
        </div>
        <div class="form-group">
            <label for="text">Text:</label>
            <textarea name="text" id="" cols="" rows="" v-model="text" :class="{'error': textIn}"></textarea>
            <small v-show="textIn"> * Text can not be empty</small>
        </div>

        <label class="status">Status: 
            <select v-model="status">
                <option selected>active</option>
                <option>completed</option>
            </select>
        </label>

        <button :class="{'nomal': true, 'btn': save}" class="btn btn-primary pull-right" @click.stop="add" :disabled="save">Save</button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title: '',
                text: '',
                status: 'active', 
            }
        },
        methods: {
            add(ev) { 
                if(this.title&&this.text&&this.status){
                    this.$emit('add', {
                        title: this.title,
                        text: this.text, 
                        status: this.status,
                    });
                    this.title = '';
                    this.text='';
                    this.status='';
                }else{
                    if(!this.title)
                        this.title = 'Please enter the title';
                    if(!this.text)
                        this.text = 'Please enter the text';
                }    
            }
        },
        computed:{  
            titleIn(){              
                return /\W/g.test(this.title); 
            },
            textIn(){ 
                return  /\W/g.test(this.text);
            },
            save(){
                var result = (this.titleIn||this.textIn);
                return result;
            } 
        }
    }
</script>

<style scoped>
@import '../assets/scss/css/addList.css'
</style>
