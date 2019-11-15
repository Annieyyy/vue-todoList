import Vue from 'vue'; 

const REGISTER = 'REGISTER';
const LOG_IN = 'LOGIN_IN';
const LOG_OUT = 'LOG_OUT';

export default{
    state: {},  
    mutations: {  
        [REGISTER](state, user){
            var b = 0;
            for(var i = 0; i < localStorage.length; i++)
                if(localStorage.key(i).indexOf('user') != -1)
                    if(JSON.parse(localStorage.getItem(localStorage.key(i))).name == user.name){
                        b = 1;
                        break;
                    } 

            if(b == 0){
                localStorage.setItem('user'+localStorage.length, JSON.stringify(user));  
                sessionStorage.register = 1;
            }else{
                sessionStorage.register = 0;
            }
        },
        [LOG_IN](state, user) {  
            var localuser = '';
            var f = 0;

            for(var i = 0; i < localStorage.length; i++)
                if(localStorage.key(i).indexOf('user') != -1)
                    if(JSON.parse(localStorage.getItem(localStorage.key(i))).name == user.name){
                        localuser = JSON.parse(localStorage.getItem(localStorage.key(i)));
                        f = 1;
                        break;
                    } 
 
            if(f == 1 && user.psw == localuser.psw){
                sessionStorage.login = 1;
                sessionStorage.user = JSON.stringify(localuser);
                sessionStorage.userId = localStorage.key(i);
            }else{
                sessionStorage.login = 0;
            }  
        },
        [LOG_OUT](state){
            sessionStorage.register = 0;
            sessionStorage.login = 0;
        }
    },
    actions: {
        register({commit}, user){
            commit(REGISTER, user);
        },
        logIn({commit}, user){
            commit(LOG_IN, user);
        },
        logOut({commit}){
            commit(LOG_OUT);
        }
    }
}
 