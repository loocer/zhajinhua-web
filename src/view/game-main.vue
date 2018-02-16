<template>
  <div class="game-main">
    <div id="Stats-output">
    </div>
    <div class="main-panel">
      
    </div>
    <!-- <div class="buttons-1">
        <span @click="fapai">翻牌</span>
        <span @click="resice(0)">1投注</span>
        <span @click="resice(1)">1投注</span>
        <span @click="resice(2)">1投注</span>
        <span @click="resice(3)">1投注</span>
        <span @click="showValue('gjyu')">任意查看</span>
        <span @click="hideValue('gjyu')">任意影藏</span>
        <span @click="checkValue()">查看</span>
        <span @click="changeState({class:'a3',state:'ONGOING'})">改变状态</span>
        <span @click="compare('gjyu')">对比</span>
        <span @click="compare2('gjyu')">对比</span>
        <span @click="initPuker">初始化牌</span>
        <span></span>
    </div> -->
    <div class="buttons-2">
        <span @click="fapai('gt')">fapai</span>
        <span @click="hideValue('gt')">任意影藏</span>
        <span @click="checkValue()">查看</span>
        <span @click="changeState({class:'gjyu',state:'ONGOING'})">改变状态</span>
        <span @click="pass('gt')">pass</span>
        <span @click="compare2('gjyu')">对比</span>
        <span @click="initPuker">初始化牌</span>
        <span @click="sendSo('地球人你好，我是太阳之子，我叫tom！')">发送一个消息</span>
        <span></span>
    </div>
     <div class="buttons-3">
        <span @click="rtfhgt()">既然已经无缘入围奖</span>
    </div>
    <!-- Div which will hold the Output -->
    <div id="WebGL-output">
    </div>
  </div>
</template>

<script>
// import * as THREE from "three";
import * as tools from '../assets/tools'
import GameObject from '../assets/gameObject'
import * as io from 'socket.io-client'
import axios from 'axios'
// import * as TWEEN from "tween";
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      gamerNum: 4,
      showLooker:[],
      showMesh:[],
      avadarUrl:[
        '/static/1avatar.jpg',
        '/static/2avatar.jpg',
        '/static/3avatar.jpg',
        '/static/4avatar.jpg',
        '/static/5avatar.jpg',
        '/static/6avatar.jpg',
      ],
      pokerValue:null,
      gsocket:null,
      gameObject: null,
      peopleNumType:[
        'TYPE_TWO',
        'TYPE_THREE',
        'TYPE_FUOR',
        'TYPE_FIVE',
        'TYPE_SIX',
        'TYPE_SEVEN',
        'TYPE_EIGHT'
      ]
    }
  },
  computed: {
    roomBaseInfo() {
      return this.$store.state.roomBaseInfo
    },
    userId(){
      return window.localStorage.userId
    }
  },
  methods: {
    receiveSo (msg) {
      let id = this.userId
      let datas = msg.roomPlayers.players
      let gameObjd = this.gameObject
      let gameAllObj = this.gameObject._allPosations
      let dataArray = []
      for(let g in gameAllObj){
        dataArray.push(false)
      }
      for(let d in datas){
        dataArray[d] = datas[d]
      }

      if(dataArray[0].id == id){
        datas = dataArray 
      }else{
        for(let l in dataArray){
          if(dataArray[l].id === id){
            datas = dataArray.slice(l,dataArray.length).concat(dataArray.slice(0,l))
          }
        }
      }
      let acType = tools.acType
      if(msg.acType === acType.ON_READY){
        let picArray = []
        for(let g in dataArray){
          if(dataArray[g]){
            picArray.push(dataArray[g].user.avatarUrl)
            gameAllObj[g].id = dataArray[g].id
            gameAllObj[g].state = tools.stateColor.NORMAL
            this.gameObject.setAvatarTextures(picArray)
            this.gameObject.changeState({state:tools.stateColor.NORMAL,class:gameAllObj[g].class})
          }  
        }
        this.gameObject.setBasePic()
        console.log(4444999999999999999999999999444)
        console.log(this.gameObject.avatarTextures)
      }

      if(msg.acType === acType.ON_START){
        if(msg.allow){
          axios.post('/api/get-value?roomNo=' + msg.roomPlayers.id).then(function (response) {
            console.log(response)
            this.pokerValue = response.data.data.value
          }).catch(function (error) {
            console.log(error)
          })
          this.gameObject.createPanel()
          console.log(msg.roomPlayers)
          // rooms[i].setPokersValue()
          // sendObj = {acType:acType.ON_START,allow:true,roomPlayers:rooms[i]}
        }else{
          if(msg.backObj.playerId == id){
             alert('人员还没到齐，不能发牌！')
          }
        }
      }
      if(msg.acType === acType.SHOW_VALUE){
        rooms[i].showValue(msg.playerId)
        frontRoomPlayers.acType = acType.SHOW_VALUE
        frontRoomPlayers.playerId = msg.playerId
        sendObj = {acType:acType.SHOW_VALUE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
      }
      if(msg.acType === acType.GAME_PK){
        frontRoomPlayers.acType = acType.GAME_PK
        frontRoomPlayers.playerId = msg.playerId
        frontRoomPlayers.raiseMoney = msg.raiseMoney
        rooms[i].onRaise(msg)
        sendObj = {acType:acType.RAISE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
      }
      if(msg.acType === acType.ON_RAISE){
        for(let g in gameAllObj){
          for(let i in datas){
            if(gameAllObj[g].id == datas[i].id){
              this.gameObject.changeStateText({state:datas[i].state,class:gameAllObj[g].class})
            }
          }
        }
      }
      if(msg.acType === acType.GAME_PASS){
        frontRoomPlayers.acType = acType.GAME_PASS
        frontRoomPlayers.playerId = msg.playerId
        rooms[i].onPass(msg)
        sendObj = {acType:acType.GAME_PASS,roomPlayers:rooms[i],backObj:frontRoomPlayers}
      }
    },
    sendSo (msg) {
      var temp = this
      var roomInfo = this.roomBaseInfo
      this.gsocket.emit(roomInfo.roomNo, msg);
    },
    fapai () {
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'ON_START',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
      // this.gameObject.createPanel()
    },
    initPuker(){
      this.gameObject.initPuker()
    },
    resice (i) {
      var p = this.gameObject._allPosations[i]
      this.gameObject.resice({x:p.x,y:70,z:p.z})
    },
    changeState(obj){
      this.gameObject.changeState(obj)
    },
    rtfhgt(){
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'ON_RAISE',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
    },
    checkValue(){
      this.gameObject.checkValue()
    },
    compare(className){
      this.gameObject.compareTemp1(className)
    },
    compare2(className){
      this.gameObject.compareTemp2(className)
    },
    showValue(className){
      this.gameObject.showValue(className)
    },
    hideValue(className){
      this.gameObject.hideValue(className)
    },
    pass(className){
      this.gameObject.pass(className)
    }
  },
  mounted () {
    var temp = this
    var roomInfo = this.roomBaseInfo
    this.gsocket = io('http://localhost:3000')
    this.gsocket.on(roomInfo.roomNo, function(msg){
      temp.receiveSo(msg)
    })

    var parameter = {}
    for(let i in this.peopleNumType){
        if(i == roomInfo.peopleNum - 1){
            parameter.type = this.peopleNumType[i - 1]
            break;
        }
    }
    parameter.roomNo = roomInfo.roomNo
    parameter.renderElement = document.getElementById("WebGL-output")
    temp.gameObject = new GameObject(parameter) 
    temp.gameObject.init()
    let ff = {acType: 'ON_READY',roomId: roomInfo.roomNo,playerId:temp.userId}
    this.sendSo(ff)
    // function fuckWhy(){
    //   temp.gameObject.getMeshOnMourse(temp.gameObject)
    // }
    // document.addEventListener('mousedown',fuckWhy , false);
 
  }
}
</script>
<style scoped>
body {
  margin: 0;
  overflow: hidden;
  height:100%;
}
.buttons-1{
  position: fixed;
  left: 200px;
}
.buttons-2{
  position: fixed;
  top:30px;
  left: 200px;
}
.buttons-3{
  position: fixed;
  top:50px;
  left: 200px;
  color:red;
  font-size: 30px;
}
.game-main{
    position: absolute;
    top:0;
}
.main-panel{
  position: absolute;
  width: 100%;
  height:100%;
  background: rgba(0, 0, 0, .5);
}
</style>
