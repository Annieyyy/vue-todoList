<!-- list content details -->
<template> 
    <div class="detail">
        <div v-if="display" class="detail-list">
            <div class="content-header">
                <h3 class="title">{{item.title}}</h3>
                <div class="button">
                    <button type="button" class="btn btn-primary edit"@click="display=false">edit</button>
                    <button type="button" class="btn btn-primary delete"@click="toRemove">delete</button>
                </div>
            </div>
            
            <div class="text">{{item.text}}</div>
        </div>  
        <div v-else class="detail-list">
            <div class="content-header">
                <input class="title" type="text" v-model="title"/>
                <div class="button">
                    <button type="button" class="btn btn-primary save"@click="save">save</button>
                    <button type="button" class="btn btn-primary cancel" @click="cancel">cancel</button>
                </div>    
            </div>

            <textarea name="" id="" cols="" rows="" v-model="text"></textarea>

            <label>
                <select v-model="status">
                    <option selected>active</option>
                    <option>completed</option>
                </select>
            </label>
        </div>
    </div> 
</template>

<script>
export default {
    props: ["item"],
    data() {
        return{
            display: true,
            title: this.item.title,
            text: this.item.text,
            status: this.item.status, 
            oldTitle: this.item.title,
            oldText: this.item.text,
            oldStatus: this.item.status
        };
    },
    methods:{
        toRemove(){
            this.$emit('remove', this.item.id);
        }, 
        save(){
            this.display = true;
            this.$emit('change', {
                id: this.item.id,
                title: this.title,
                text: this.text,
                status: this.status
            });
        },
        cancel(){
            this.display = true;
            this.title = this.item.title;
            this.text = this.item.text;
            this.status = this.status.text;
        }
    }
}
</script>

<style scoped>
@import '../assets/scss/css/todoListDetail.css';
</style>
