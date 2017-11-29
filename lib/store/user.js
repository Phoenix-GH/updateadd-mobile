Object.defineProperty(exports,"__esModule",{value:true});exports.dispatchStoreUser=exports.dispatchLoginUser=exports.dispatchError=exports.dispatchPending=exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var _constants=require('../constants');var _constants2=_interopRequireDefault(_constants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var initialState=exports.initialState={
user:null,
pending:false};


var dispatchPending=exports.dispatchPending=function dispatchPending(pending){return{
type:_constants2.default.LOGIN_USER_PENDING,
payload:pending};};


var dispatchError=exports.dispatchError=function dispatchError(error){return{
type:_constants2.default.LOGIN_USER_ERROR,
payload:error};};


var dispatchLoginUser=exports.dispatchLoginUser=function dispatchLoginUser(email,password){return{
type:_constants2.default.LOGIN_USER,
payload:{
email:email,password:password}};};



var dispatchStoreUser=exports.dispatchStoreUser=function dispatchStoreUser(user){return{
type:_constants2.default.LOGIN_STORE_USER,
payload:user};};exports.default=


function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
switch(action.type){
case _constants2.default.LOGIN_USER_PENDING:
return _extends({},
state,{
pending:action.payload});

case _constants2.default.LOGIN_USER_ERROR:
return _extends({},
state,{
resentCodeSuccess:null,
error:action.payload});

case _constants2.default.LOGIN_STORE_USER:
return _extends({},
state,{
user:action.payload});

default:
break;}

return state;
};