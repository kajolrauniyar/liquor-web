<template>
  <div class="overview">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Product</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium facilis voluptate eligendi porro, asperiores cum voluptatem eaque expedita, nam velit rerum laborum adipisci tempora vero fuga ea amet numquam?</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/admin-product.svg" alt class="img-fluid">
          </div>
        </div>

        <hr>
        <h4 class="d-inline-block">Products list</h4>
        <button class="btn btn-primary float-right" @click="addNew()">Add Prouduct</button>
        <div class="row">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td>{{product.name}}</td>
                <td>{{product.price}}</td>
                <td>
                  <button
                    class="btn btn-primary"
                    @click="editProduct(product)"
                    data-toggle="modal"
                    data-target="#product"
                  >Edit</button>
                  <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Product modal -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-8 col-lg-8">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Product name"
                    v-model="product.name"
                  >
                </div>
                <div class="form-group">
                  <vue-editor v-model="product.description"></vue-editor>
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="Product Price"
                    v-model="product.price"
                  >
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    @keyup.188="addTag"
                    placeholder="Product tags"
                    v-model="tag"
                    class="form-control"
                  >
                </div>
                <div class="d-flex">
                  <p v-for="tag in product.tags">
                    <span class="p-1">{{tag}}</span>
                  </p>
                </div>
                <div class="form-group text-left">
                  <label for="image">Product Images</label>
                  <input type="file" class="form-control-file" id="image" @change="uploadImage">
                </div>
                <div class="form-group d-flex">
                  <div v-for="(image,index) in product.images" class="p-1">
                    <div class="img-wrapp">
                      <img :src="image" alt width="80px">
                      <span class="delete-img" @click="deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addProduct()"
              v-if="modal == 'new'"
            >Save changes</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
              v-if="modal == 'edit'"
            >Apply changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../firebase";

export default {
  name: "Overview",
  props: {
    msg: String
  },
  components: {
    VueEditor
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      activeItem: null,
      modal: null,
      tag: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    deleteImage(img,index){
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index,1);
      image.delete().then(()=>{
        console.log('Image deleted');
      }).catch((error)=>{
        console.log(error.message);
      });
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb.storage().ref("products/" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    reset(){
      this.product ={
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []        
      }
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        type: "success",
        title: "Product updated in successfully"
      });
      $("#product").modal("hide");
    },
    editProduct(product) {
      (this.modal = "edit"), (this.product = product);
      this.activeItem = product[".key"];
    },
    deleteProduct(doc){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete()
          Toast.fire({
            type: 'success',
            title: 'Deleted  successfully'
          })
        
        }
      })
        
    },
    addProduct() {
      this.$firestore.products.add(this.product);
      Toast.fire({
        type: "success",
        title: "Product created in successfully"
      });
      $("#product").modal("hide");
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp {
  position: absolute;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
</style>
