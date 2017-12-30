<template>
  <div class="hello">
    <header-layer></header-layer>
    <!-- <p>{{ msg }}</p> -->
    <div class="container">
        <div class="row" >
            <div class="col-sm-6 col-xs-6" >
                
                <button type="button" class="btn btn-default" @click="changeGamer(4)"><span>4人房</span></button>
            </div>
            <div class="col-sm-6 col-xs-6" >
                
                <button type="button" class="btn btn-default" @click="changeGamer(8)"><span>8入房</span></button>
            </div>
        </div>
        <div class="input-group input-group-lg">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                  房间号：
                </button>
              </span>
              <input type="text" v-model="roomNo" class="form-control">
            </div><!-- /input-group -->
      <p>
      <button type="button" class="btn btn-primary btn-lg" @click="createRoom">创建</button>
    </p>
    </div>
    
  </div>
</template>

<script>
import Header from '@/components/Header'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    'header-layer': Header
  },
  data () {
    return {
      msg: '哟嗬喂扎金花',
      gamerNum: 4,
      roomNo: null
    }
  },
  methods: {
    changeGamer (num) {
      this.gamerNum = num
    },
    createRoom () {
      // $.get("/create-room",{roomNo:roomId,peopleNum:5},function(result){
      //       alert(432434)
      //       socket = io();
      //       socket.on($("#my").val(), function(msg){
      //         $('#messages').append($('<li>').text(msg.msg));
      //         window.scrollTo(0, document.body.scrollHeight);
      //       });
      //     });
      var p = {}
      p.roomNo = this.roomNo
      p.peopleNum = this.gamerNum
      axios.get('/api/create-room', {params: p})
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
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
