<template>
    <div class="login">
        <!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                            </li>
                        </ul>

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active text-left" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                                <h5 class="text-center">Login</h5>
                                   <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                   </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" v-model="password" @keyup.enter="login" class="form-control" id="password" placeholder="Password">
                                    </div>
                                    <button @click="login" class="btn btn-primary">Submit</button>
                            </div>
                            <div class="tab-pane fade text-left" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                                <h5 class="text-center">Create a new account</h5>
                                   <div class="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control" v-model="name" aria-describedby="nameHelp" placeholder="Enter name">
                                   </div>                                
                                   <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" class="form-control"  v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                   </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control"  v-model="password" placeholder="Password">
                                    </div>
                                    <button  class="btn btn-primary" @click="register">Signup</button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {fb,db} from '../firebase'
export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return {
          name:null,
          email:null,
          password:null
      }
  },
  methods:{
      login(){
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() =>{
                this.$router.replace('admin');
                $('#login').modal('hide')
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                Toast.fire({
                    type: "danger",
                    title: errorMessage
                });
            }
            console.log(error);
            });          
      },
      register(){
            fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    $('#login').modal('hide')
                    db.collection("profiles").doc(user.user.uid).set({
                        name:this.name,
                        email:this.email,
                        password:this.password
                    })
                    .then(()=>{
                        console.log("Profile created sucessfully");
                    })
                    .catch((error)=>{
                        console.error("Error creating Profile:", error);
                    });
                    this.$router.replace('admin');
                })
                .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
            });
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>