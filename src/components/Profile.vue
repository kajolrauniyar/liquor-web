<template>
  <div class="overview">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Orders</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium facilis voluptate eligendi porro, asperiores cum voluptatem eaque expedita, nam velit rerum laborum adipisci tempora vero fuga ea amet numquam?</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/profile.svg" alt class="img-fluid">
          </div>
        </div>
      </div>
      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >Profile</a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              id="account-tab"
              data-toggle="tab"
              href="#account"
              role="tab"
              aria-controls="account"
              aria-selected="false"
            >Account settings</a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      v-model="profile.name"
                      class="form-control"
                    >
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name="phpne"
                      placeholder="Phone"
                      class="form-control"
                      v-model="profile.phone"
                    >
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      class="form-control"
                      v-model="profile.address"
                    >
                  </div>
                </div>

                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="text"
                      name="postal-code"
                      placeholder="Postcode"
                      class="form-control"
                      v-model="profile.postCode"
                    >
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                      @click="updateProfile"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade pt-3"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" placeholder="User name" class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" placeholder="Email address" class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" placeholder="New password" class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" placeholder="Confirm password" class="form-control">
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input type="file" class="form-control-file">
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input type="submit" value="Save Changes" class="btn btn-primary w-100">
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input type="button" value="Reset Password" class="btn btn-success w-100" @click="resetPassword">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "Overview",
  props: {
    msg: String
  },
  data(){
      return{
          profile:{
              name:null,
              phone:null,
              address:null,
              postcode:null
          },
          account:{
              name:null,
              email:null,
              photoUrl:null,
              emailVerified:null,
              password:null,
              confirmPassword:null,
              uid:null
          }
      }
  },
  firestore() {
      const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid),
    }
  },
  methods: {
    resetPassword(){
      const auth = fb.auth();
      auth.sendPasswordResetEmail(auth.currentUser.email)
      .then(()=>{
          Toast.fire({
            type: "info",
            title: "Password reset email sent."
          });
      })
      .catch((error)=>{
          Toast.fire({
            type: "danger",
            title: error.message
          });
      });

    },
    updateProfile() {
      this.$firestore.profile.update(this.profile)
      .then(()=>{
          Toast.fire({
            type: "success",
            title: "Profile updated"
          });
      }).catch((error)=>{
        Toast.fire({
          type: "danger",
          title: error.message
        });
      });

    },
    uploadImage(){
        
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
