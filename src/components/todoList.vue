<!-- todo-list -->
<template>

    <div class="container search">
        <div class="content-header">
            <p class="all">Total: {{items.length}}</p>
            <div class="form-list">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" @click="selectStatus=1" checked>
                    <label class="form-check-label" for="inlineRadio1">All</label>
  
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" @click="selectStatus=2">
                    <label class="form-check-label" for="inlineRadio2">Active</label>

                     <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" @click="selectStatus=3">
                    <label class="form-check-label" for="inlineRadio2">Completed</label>

            </div>
            <div class="search">
                <form class="form-inline my-2 my-lg-0 pull-right search">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
                </form>
            </div>   
        </div>

            <div class="detail" v-if="newItems.length">
                <listItem
                    v-for="item in newItems" 
                    :key="item.id"
                    :item="item"
                    @remove="removeTodo"
                    @change="change"
                /> 
            </div>
    </div>

</template>

<script>
    import listItem from './todoListDetail'

    export default { 
        props: ["items"],
        data(){
            return{
                search: '', 
                selectStatus: 1,
            }
        },
        methods:{ 
            removeTodo(id){
                this.$emit('remove', id); 
            },
            change(obj){
                this.$emit('change', obj);
            }
        },
        computed:{
            newItems: function(){ 
                if(this.items.length==0)
                    return '';
                    
                if(this.search){ 
                    return this.items.filter((item)=>{
                        return(item.title.indexOf(this.search) != -1);
                        });
                }else{
                     switch (this.selectStatus){
                    case 1:
                        return this.items;
                        break;
                    case 2:
                        return this.items.filter(function(item){
                            return item.status === 'active';
                        });
                        break;
                    case 3:
                        return this.items.filter(function(item){
                            return item.status === 'completed';
                        });
                        break;   
                    } 
                }
            }
        },
        components: {
            listItem
        }
    }
</script>

<style scoped>
@import '../assets/scss/css/todoList.css';
</style>

