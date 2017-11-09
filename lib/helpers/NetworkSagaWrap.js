Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _immutabilityHelper=require('immutability-helper');var _immutabilityHelper2=_interopRequireDefault(_immutabilityHelper);
var _effects=require('redux-saga/effects');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var















NetworkSagaWrap=function(){













function NetworkSagaWrap(apiCall,updateKey,storeKey){var data=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{};var resultSaga=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;_classCallCheck(this,NetworkSagaWrap);
this.apiCall=apiCall;
this.updateKey=updateKey;
this.storeKey=storeKey;

this.resultSaga=resultSaga;

this.UPDATE=updateKey+'/Update';
this.START=updateKey+'/Start';
this.FAILURE=updateKey+'/Failure';
this.PENDING=updateKey+'/Pending';

this.initialState={
data:data,
failure:null,
successful:false,
pending:false};

}_createClass(NetworkSagaWrap,[{key:'start',value:regeneratorRuntime.mark(function start(






















action){return regeneratorRuntime.wrap(function start$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return(

(0,_effects.put)(this.dispatch(action.payload)));case 2:return _context.delegateYield(

this.saga(action),'t0',3);case 3:case'end':return _context.stop();}}},start,this);})},{key:'saga',value:regeneratorRuntime.mark(function saga(


action){var _payload,response;return regeneratorRuntime.wrap(function saga$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.prev=0;

_payload=action.payload||[];_context2.next=4;return(

(0,_effects.call)(this.apiCall,_payload));case 4:response=_context2.sent;_context2.next=7;return(

(0,_effects.put)(NetworkSagaWrap.successPayloadGenerator(this.UPDATE,response.data,action.subkey)));case 7:if(!(

this.resultSaga&&response)){_context2.next=10;break;}_context2.next=10;return(

(0,_effects.fork)(this.resultSaga.bind(this),action,response.data&&response.data.data||response.data));case 10:_context2.next=30;break;case 12:_context2.prev=12;_context2.t0=_context2['catch'](0);_context2.prev=14;



console.log(_context2.t0.response);if(!(
_context2.t0.response.status===401)){_context2.next=21;break;}_context2.next=19;return(
(0,_effects.put)({type:'AuthState/RESET_USER'}));case 19:_context2.next=23;break;case 21:_context2.next=23;return(

(0,_effects.put)(NetworkSagaWrap.errorPayloadGenerator(this.FAILURE,_context2.t0.response.data,action.subkey)));case 23:_context2.next=30;break;case 25:_context2.prev=25;_context2.t1=_context2['catch'](14);_context2.next=29;return(


(0,_effects.put)(NetworkSagaWrap.errorPayloadGenerator(this.FAILURE,{error:'API is not responding'},action.subkey)));case 29:
console.log(_context2.t0);case 30:case'end':return _context2.stop();}}},saga,this,[[0,12],[14,25]]);})},{key:'stateUpdate',value:function stateUpdate(




state,action){var storeKey=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;

var key=storeKey||this.storeKey;
switch(action.type){
case this.PENDING:
case this.START:
return(0,_immutabilityHelper2.default)(state,_defineProperty({},
key,{

$set:(0,_immutabilityHelper2.default)(state[key],{
$merge:{pending:true}})}));



case this.UPDATE:
return(0,_immutabilityHelper2.default)(state,_defineProperty({},
key,{
$set:(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{
data:action.payload,
pending:false,
successful:true}})}));




case this.FAILURE:
return(0,_immutabilityHelper2.default)(state,_defineProperty({},
key,{
$set:(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{failure:action.payload,pending:false,successful:false}})}));



default:
return state;}

}},{key:'dispatch',value:function dispatch(

payload,subkey){
return{
type:this.START,
payload:payload,
subkey:subkey};

}},{key:'dispatchPending',value:function dispatchPending(

subkey){
return{
type:this.PENDING,
subkey:subkey};

}}],[{key:'successPayloadGenerator',value:function successPayloadGenerator(actionType,data,subkey){return{type:actionType,payload:data.data,subkey:subkey};}},{key:'errorPayloadGenerator',value:function errorPayloadGenerator(actionType,data,subkey){var error=data.error;if(data.form_errors&&Object.keys(data.form_errors).length){error=data.form_errors[Object.keys(data.form_errors)[0]];}return{type:actionType,payload:error,subkey:subkey};}}]);return NetworkSagaWrap;}();exports.default=NetworkSagaWrap;