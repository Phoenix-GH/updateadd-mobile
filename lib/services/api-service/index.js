Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);
var _bluebird=require('bluebird');
var _reactNativeConfig=require('react-native-config');var _reactNativeConfig2=_interopRequireDefault(_reactNativeConfig);

var _models=require('../../models');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var BASE_URL=_reactNativeConfig2.default.API_URL;

var LOGIN_USER_URL=BASE_URL+'/auth/login/';var

ApiService=function(){


function ApiService(){var _this=this;_classCallCheck(this,ApiService);this.



setupInstance=function(token){
var data={
headers:{
Accept:'application/json',
Authorization:''}};


if(token){
data.headers.Authorization='Token '+token;
}
_this.axios=_axios2.default.create(data);
_this.axios.interceptors.response.use(function(response){
if(response.config.apiResponseType){
response.data=(0,_models.modelMapper)(response.config.apiResponseType,response.data);
}
return response;
},function(error){return _bluebird.Promise.reject(error);});
};this.


getNextPage=function(url,responseType){return _this.axios.get(url,{apiResponseType:responseType});};this.setupInstance();}_createClass(ApiService,[{key:'loginUser',value:function loginUser(

data){var _this2=this;
return new _bluebird.Promise(function(resolve,reject){return _this2.axios({
method:'post',
url:LOGIN_USER_URL,
data:data}).
then(function(response){

var user=response.data;
resolve(user);
}).catch(function(err){
reject(err);
});});
}}]);return ApiService;}();exports.default=


new ApiService();