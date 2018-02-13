export const stateColor={
    OVER : 'OVER',
    ONGOING : "ONGOING",
    NORMAL : "NORMAL"
};
export const acType = {
  ON_READY : 'ON_READY',
  ON_START : 'ON_START',
  SHOW_VALUE : 'SHOW_VALUE',
  GAME_PASS : 'GAME_PASS',
  GAME_PK : 'GAME_PK',
  RAISE: 'RAISE'
}
export const AllPosations = {
    TYPE_TWO:[{x:80,y:0.1,z:0,rt:-0.5},{x:-50,y:0.1,z:0,rt:-0.8}],
    TYPE_THREE:[
        {x:0,y:0.1,z:80,rt:-0.8},
        {x:80,y:0.1,z:0,rt:-0.2},
        {x:-50,y:0.1,z:0,rt:-0.6}
    ],
    // TYPE_FUOR:[
    //     {class:'a1',x:100,y:0.1,z:0,rt:-0.2,state:stateColor.OVER},
    //     {class:'a3',x:40,y:0.1,z:80,rt:-0.6,state:stateColor.OVER},
    //     {class:"a5",x:-40,y:0.1,z:80,rt:-0.8,state:stateColor.OVER},
    //     {class:'a4',x:-100,y:0.1,z:0,rt:0.3,state:stateColor.OVER},
    //     {class:'a2',x:40,y:0.1,z:-80,rt:-0.6,state:stateColor.OVER},
    //     {class:'a6',x:-40,y:0.1,z:-80,rt:-0.6,state:stateColor.OVER}
    // ],
    TYPE_FUOR:[
        {
          class:'a1',state:stateColor.OVER,nickName:'tom',account:-4,
          pointPosition:{x:100,y:0.1,z:0},
          pokerPosition:{x:100,y:0.1,z:-20,rt:-0.2},
          avatarPosition:{x:100,y:0.1,z:-20,rz:-0.5},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a2',state:stateColor.OVER,nickName:'HTYHEYTH',account:23,
          pointPosition:{x:35,y:0.1,z:-85},
          pokerPosition:{x:40,y:0.1,z:-70,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:-60},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a3',state:stateColor.OVER,nickName:'王二个',account:12,
          pointPosition:{x:-45,y:0.1,z:-85},
          pokerPosition:{x:-40,y:0.1,z:-80,rt:-0.6},
          avatarPosition:{x:-50,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a4',state:stateColor.OVER,nickName:'王二个',account:9,
          pointPosition:{x:-100,y:0.1,z:0},
          pokerPosition:{x:40,y:0.1,z:80,rt:-0.6},
          avatarPosition:{x:-100,y:0.1,z:-20,rz:-0.6},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a5',state:stateColor.OVER,nickName:'王二个',account:-24,
          pointPosition:{x:-45,y:0.1,z:85},
          pokerPosition:{x:-100,y:0.1,z:0,rt:0.3},
          avatarPosition:{x:-50,y:0.1,z:70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a6',state:stateColor.OVER,nickName:'王二个',account:-52,
          pointPosition:{x:35,y:0.1,z:85},
          pokerPosition:{x:-40,y:0.1,z:80,rt:-0.8},
          avatarPosition:{x:30,y:0.1,z:70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        }
        
    ],
    TYPE_FIVE:[
        {x:-30,y:0.1,z:80,rt:-0.8,state:stateColor.OVER},
        {x:50,y:0.1,z:80,rt:-0.2,state:stateColor.OVER},
        {x:80,y:0.1,z:0,rt:-0.6,state:stateColor.OVER},
        {x:0,y:0.1,z:-80,rt:0.3,state:stateColor.OVER},
        {x:-50,y:0.1,z:0,rt:0.3,state:stateColor.OVER}
    ],
    TYPE_SIX:[{x:0,y:0,z:0,state:stateColor.OVER},{x:0,y:0,z:0,state:stateColor.OVER}],
    TYPE_SEVEN:[{x:0,y:0,z:0,state:stateColor.OVER},{x:0,y:0,z:0,state:stateColor.OVER}],
    TYPE_EIGHT:[
        {x:-30,y:0.1,z:80,rt:-0.8,state:stateColor.OVER},
        {x:0,y:0.1,z:80,rt:-0.2,state:stateColor.OVER},
        {x:80,y:0.1,z:0,rt:-0.6,state:stateColor.OVER},
        {x:0,y:0.1,z:-80,rt:0.3,state:stateColor.OVER},
        {x:-50,y:0.1,z:0,rt:0.3,state:stateColor.OVER}
    ],
};

export const getStateColor = (state) => {
  let color = 'green'
  switch (state) {
      case stateColor.OVER:
        color = '#807f7f'
        break;
      case stateColor.ONGOING:
        color = '#ff0000'
        break;
      case stateColor.NORMAL:
        color = '#00ff0a'
        break;
    }
    return color
}
export const peopleNumType = {
    TYPE_ONE : 'TYPE_ONE',
    TYPE_TWO : 'TYPE_TWO',
    TYPE_THREE : 'TYPE_THREE',
    TYPE_FUOR : 'TYPE_FUOR',
    TYPE_FIVE : 'TYPE_FIVE',
    TYPE_SIX : 'TYPE_SIX',
    TYPE_SEVEN : 'TYPE_SEVEN',
    TYPE_EIGHT : 'TYPE_EIGHT'
};
export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[ key ] = key
      }
    }
  }
  return mirrored
}


