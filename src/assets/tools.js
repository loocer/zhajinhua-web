export const stateColor={
    OVER : 'OVER',
    ONGOING : "ONGOING",
    NORMAL : "NORMAL"
};
export const AllPosations = {
    TYPE_TWO:[{x:80,y:0.1,z:0,rt:-0.5},{x:-50,y:0.1,z:0,rt:-0.8}],
    TYPE_THREE:[
        {x:0,y:0.1,z:80,rt:-0.8},
        {x:80,y:0.1,z:0,rt:-0.2},
        {x:-50,y:0.1,z:0,rt:-0.6}
    ],
    TYPE_FUOR:[
        {class:"rr",x:0,y:0.1,z:80,rt:-0.8,state:stateColor.NORMAL},
        {class:'gt',x:80,y:0.1,z:0,rt:-0.2,state:stateColor.OVER},
        {class:'gjyu',x:0,y:0.1,z:-80,rt:-0.6,state:stateColor.NORMAL},
        {class:'uil',x:-50,y:0.1,z:0,rt:0.3,state:stateColor.ONGOING}
    ],
    TYPE_FIVE:[
        {x:-30,y:0.1,z:80,rt:-0.8,state:stateColor.NORMAL},
        {x:50,y:0.1,z:80,rt:-0.2,state:stateColor.NORMAL},
        {x:80,y:0.1,z:0,rt:-0.6,state:stateColor.NORMAL},
        {x:0,y:0.1,z:-80,rt:0.3,state:stateColor.NORMAL},
        {x:-50,y:0.1,z:0,rt:0.3,state:stateColor.NORMAL}
    ],
    TYPE_SIX:[{x:0,y:0,z:0,state:stateColor.NORMAL},{x:0,y:0,z:0,state:stateColor.NORMAL}],
    TYPE_SEVEN:[{x:0,y:0,z:0,state:stateColor.NORMAL},{x:0,y:0,z:0,state:stateColor.NORMAL}],
    TYPE_EIGHT:[
        {x:-30,y:0.1,z:80,rt:-0.8,state:stateColor.NORMAL},
        {x:0,y:0.1,z:80,rt:-0.2,state:stateColor.NORMAL},
        {x:80,y:0.1,z:0,rt:-0.6,state:stateColor.NORMAL},
        {x:0,y:0.1,z:-80,rt:0.3,state:stateColor.NORMAL},
        {x:-50,y:0.1,z:0,rt:0.3,state:stateColor.NORMAL}
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


