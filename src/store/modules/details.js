import Vue from 'vue'; 
import router from '../../router';

const USER_INIT = 'USER_INIT';
const USER_ADD = 'USER_ADD';
const USER_REMOVE = 'USER_REMOVE'; 
const USER_CHANGE = 'USER_CHANGE';
const OWN_CHANGE = 'OWN_CHANGE';

var contactId = 0;

export default{
    state: {
        items: [],
        account: {}
    },
    mutations: {
        [USER_INIT](state, info){
            state.items = info.items;
            state.account = info.account; 
        },
        [USER_ADD](state, user){
            user.id = contactId++;
            state.items.push(user); 
            localStorage.items = JSON.stringify(JSON.parse(localStorage.items).push(user));
        },
        [USER_REMOVE](state, userId){
            state.items = state.items.filter(function(item){
                return item.id !== userId; 
            }); 
        },
        [USER_CHANGE](state, user){
            for(var key in state.items) 
                if(state.items[key].id == user.id){
                    state.items[key].title = user.title;
                    state.items[key].text = user.text; 
                    state.items[key].status = user.status;
                } 
        },
        [OWN_CHANGE](state, user){
            var oldTitle = state.account.title;
            var oldTitle = state.account.status;
            state.account = user;
            sessionStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem(sessionStorage.userId, JSON.stringify(user));
        }
    },
    actions: {
        userInit({commit}){ 
            if(sessionStorage.login && sessionStorage.login == 1) {
                var items = [
                    {title: 'list1', text: "list1", status: "active"},
                    {title: 'list2', text: "list2", status: "completed"}  
                ];
                items = items.filter((item)=>{
                    item.id = contactId++;
                    return item;
                });
                localStorage.items = JSON.stringify(items);
                var account = JSON.parse(sessionStorage.user);

                commit(USER_INIT,{
                    items: JSON.parse(localStorage.items),
                    account: account
                });
            }else{
                alert('Please login'); 
                router.replace('/home/login');
            }
        },
        userAdd({commit}, user){
            commit(USER_ADD, user);
        },
        userRemove({commit}, userId){
            commit(USER_REMOVE, userId);
        },
        userChange({commit}, user){
            commit(USER_CHANGE, user);
        },
        ownChange({commit}, user){
            commit(OWN_CHANGE, user);
        }
    }
}