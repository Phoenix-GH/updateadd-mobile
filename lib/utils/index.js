Object.defineProperty(exports,"__esModule",{value:true});exports.replaceNull=undefined;var _reactNativeSentry=require('react-native-sentry');function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}



var replaceNull=exports.replaceNull=function replaceNull(store){
if(store instanceof Array){
return store.map(function(o){return replaceNull(o);});
}else if(store instanceof Object){
var result={};
Object.keys(store).forEach(function(key){
result[key]=replaceNull(store[key]);
});
return result;
}else if(store===null){
return'NULL';
}
return store;
};

var SentryUtil={
configure:function configure(dsn){
_reactNativeSentry.Sentry.config(dsn).install();
},

setExtraContext:function setExtraContext(store){
var content=replaceNull({store:store.getState()});
SentryUtil.execute(_reactNativeSentry.Sentry.setExtraContext,content);
},

setTagsContext:function setTagsContext(tag,ctx){
var content=_defineProperty({},
tag,ctx);

SentryUtil.execute(_reactNativeSentry.Sentry.setTagsContext,content);
},

setUserContext:function setUserContext(ctx){
SentryUtil.execute(_reactNativeSentry.Sentry.setUserContext,ctx);
},

captureMessage:function captureMessage(msg){
SentryUtil.execute(_reactNativeSentry.Sentry.captureMessage,msg,{level:_reactNativeSentry.SentrySeverity.Error});
},

setVersion:function setVersion(version){
SentryUtil.execute(_reactNativeSentry.Sentry.setVersion,version);
},

execute:function execute(fun,content,logLevel){
if(!__DEV__){
fun(content,logLevel);
}
}};exports.default=


SentryUtil;