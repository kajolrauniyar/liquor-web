<template>
  <div class="mini-cart">
   
          <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="miniCartLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="miniCartLabel">My Bag</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                  <ul>
                    <li v-for="item in this.$store.state.cart" class="media">
                      <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                      <div class="media-body">
                        <h5 class="mt-0">{{item.productName}}
                          <span class="float-right remove-item" @click="$store.commit('removeFromCart',item)">X</span>
                        </h5>
                        <p class="mt-0">{{item.productPrice | currency}}</p>
                        <p class="mt-0">Quantity:{{item.productQuantity}}</p>
                      </div>
                    </li>

                  </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue</button>
              <button type="button" class="btn btn-primary" @click="checkout">Checkout</button></button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "mini-cart",
  props: {
    msg: String
  },
  methods:{
    checkout(){
      $('#miniCart').modal('hide')
      this.$router.push('/checkout')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .remove-item{
    cursor: pointer;
  }
</style>
