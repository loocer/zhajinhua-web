<template>
  <div class="hello">
    <header-layer></header-layer>
    <!-- <p>{{ msg }}</p> -->
    <div class="container">
        <form class="bs-example bs-example-form" role="form">
        <div class="row">
          <div class="col-lg-12">
            <div class="input-group input-group-lg">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                  房间号：
                </button>
              </span>
              <input type="text" class="form-control">
            </div><!-- /input-group -->
           
          </div><!-- /.col-lg-6 --><br>
        </div><!-- /.row -->
      </form>
      <p>
      <button type="button" class="btn btn-primary btn-lg" @click="comeRoom">进入</button>
    </p>
    </div>
    
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'home',
  components: {
    'header-layer': Header
  },
  data () {
    return {
      msg: '哟嗬喂扎金花',
      gamerNum: 4
    }
  },
  methods: {
    comeRoom () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
