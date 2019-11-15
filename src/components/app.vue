<template>
    <div class="container"> 
    	<h1>Todos List</h1>
    	<div class="btn-link">
    		<router-link to="/home/register" class="btn">Register</router-link>
    		<router-link to="/home/login" class = "btn">Login</router-link>
    	</div>
		<router-view></router-view> 
    </div> 
</template>  

<style scoped>
@import '../assets/scss/css/app.css'
</style>