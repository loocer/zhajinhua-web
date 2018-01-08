export const AllPosations = {
    TYPE_TWO:[{x:80,y:0.1,z:0,rt:-0.5},{x:-50,y:0.1,z:0,rt:-0.8}],
    TYPE_THREE:[
        {x:0,y:0.1,z:80,rt:-0.8},
        {x:80,y:0.1,z:0,rt:-0.2},
        {x:-50,y:0.1,z:0,rt:-0.6}
    ],
    TYPE_FUOR:[
        {x:0,y:0.1,z:80,rt:-0.8},
        {x:80,y:0.1,z:0,rt:-0.2},
        {x:0,y:0.1,z:-80,rt:-0.6},
        {x:-50,y:0.1,z:0,rt:0.3}
    ],
    TYPE_FIVE:[
        {x:-30,y:0.1,z:80,rt:-0.8},
        {x:50,y:0.1,z:80,rt:-0.2},
        {x:80,y:0.1,z:0,rt:-0.6},
        {x:0,y:0.1,z:-80,rt:0.3},
        {x:-50,y:0.1,z:0,rt:0.3}
    ],
    TYPE_SIX:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
    TYPE_SEVEN:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
    TYPE_EIGHT:[
        {x:-30,y:0.1,z:80,rt:-0.8},
        {x:0,y:0.1,z:80,rt:-0.2},
        {x:80,y:0.1,z:0,rt:-0.6},
        {x:0,y:0.1,z:-80,rt:0.3},
        {x:-50,y:0.1,z:0,rt:0.3}
    ],
};
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


