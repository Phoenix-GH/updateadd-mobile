Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};var _immutabilityHelper=require('immutability-helper');var _immutabilityHelper2=_interopRequireDefault(_immutabilityHelper);
var _effects=require('redux-saga/effects');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

var _NetworkSagaWrap2=require('./NetworkSagaWrap');var _NetworkSagaWrap3=_interopRequireDefault(_NetworkSagaWrap2);
var _apiService=require('../services/api-service');var _apiService2=_interopRequireDefault(_apiService);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

PaginatedNetworkSagaWrap=function(_NetworkSagaWrap){_inherits(PaginatedNetworkSagaWrap,_NetworkSagaWrap);
function PaginatedNetworkSagaWrap(apiCall,apiResponseType,updateKey,primaryStoreKey,storeKey){var data=arguments.length>5&&arguments[5]!==undefined?arguments[5]:[];_classCallCheck(this,PaginatedNetworkSagaWrap);var _this=_possibleConstructorReturn(this,(PaginatedNetworkSagaWrap.__proto__||Object.getPrototypeOf(PaginatedNetworkSagaWrap)).call(this,
apiCall,updateKey,storeKey,data));


_this.FETCH_NEXT=_this.UPDATE+'/FetchNext';

_this.APPEND_PAGE=_this.UPDATE+'/AppendPage';

_this.END_OF_RESULTS=_this.UPDATE+'/EndOfResults';


_this.primaryStoreKey=primaryStoreKey;

_this.apiResponseType=apiResponseType;

_this.initialState.endOfResults=null;
_this.initialState.meta=null;
_this.initialState.order=null;return _this;
}_createClass(PaginatedNetworkSagaWrap,[{key:'successPayloadGenerator',value:function successPayloadGenerator(

actionType,data,subkey){
return _lodash2.default.extend(_get(PaginatedNetworkSagaWrap.prototype.__proto__||Object.getPrototypeOf(PaginatedNetworkSagaWrap.prototype),'successPayloadGenerator',this).call(this,actionType,data),{
meta:data.meta,
subkey:subkey});

}},{key:'getNext',value:function getNext(


payload,subkey){
return{
type:this.FETCH_NEXT,
payload:payload,
subkey:subkey};

}},{key:'next',value:regeneratorRuntime.mark(function next(


action){var _this2=this;var selectMeta,meta,nextApiUrl,payload,response;return regeneratorRuntime.wrap(function next$(_context){while(1){switch(_context.prev=_context.next){case 0:

selectMeta=function selectMeta(state){
var store=state[_this2.primaryStoreKey];
if(!store){
store=state.get(_this2.primaryStoreKey);
}

var subkey=action.subkey;
if(subkey){
return store[_this2.storeKey][subkey].meta;
}
return store[_this2.storeKey].meta;
};_context.next=3;return(
(0,_effects.select)(selectMeta.bind(this)));case 3:meta=_context.sent;if(!(

!meta||!meta.next)){_context.next=8;break;}_context.next=7;return(
(0,_effects.put)({type:this.END_OF_RESULTS}));case 7:return _context.abrupt('return');case 8:



nextApiUrl=meta.next;_context.prev=9;

payload=action.payload||[];_context.next=13;return(

(0,_effects.call)(_apiService2.default.getNextPage,nextApiUrl,this.apiResponseType));case 13:response=_context.sent;_context.next=16;return(

(0,_effects.put)(this.successPayloadGenerator(this.APPEND_PAGE,response.data,action.subkey)));case 16:_context.next=29;break;case 18:_context.prev=18;_context.t0=_context['catch'](9);_context.prev=20;_context.next=23;return(



(0,_effects.put)(this.errorPayloadGenerator(this.FAILURE,_context.t0.response.data,action.subkey)));case 23:_context.next=29;break;case 25:_context.prev=25;_context.t1=_context['catch'](20);

console.log(_context.t0);throw _context.t0;case 29:case'end':return _context.stop();}}},next,this,[[9,18],[20,25]]);})},{key:'stateUpdate',value:function stateUpdate(






state,action){
var updateObject=null;

switch(action.type){

case this.FETCH_NEXT:
if(action.subkey){
updateObject=(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{
meta:state[this.storeKey][action.subkey].meta,
pending:true,
failure:null,
successful:null}});


}else{
updateObject={
$merge:{
pending:true,
failure:null,
successful:null}};


}
break;


case this.APPEND_PAGE:
if(action.subkey){
updateObject=(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{
pending:false,
failure:null,
successful:true,
meta:action.meta,
endOfResults:action.meta.next==null,
order:action.order||''},

data:{
$push:action.payload}});


}else{
updateObject={
$merge:{
pending:false,
failure:null,
successful:true,
meta:action.meta,
endOfResults:action.meta.next==null,
order:action.order||''},

data:{
$push:action.payload}};


}
break;


case this.END_OF_RESULTS:
if(action.subkey){
updateObject=(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{
pending:false,
endOfResults:true}});


}else{
updateObject={
$merge:{
pending:false,
endOfResults:true}};


}
break;


case this.UPDATE:
if(action.subkey){
return(0,_immutabilityHelper2.default)(state,_defineProperty({},
this.storeKey,{
$merge:_defineProperty({},
action.subkey,(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{
data:action.payload,
meta:action.meta,
pending:false,
successful:true,
endOfResults:!!action.meta&&action.meta.next==null,
order:action.order||null}}))}));





}
return(0,_immutabilityHelper2.default)(state,_defineProperty({},
this.storeKey,{
$set:(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{
data:action.payload,
meta:action.meta,
pending:false,
successful:true,
endOfResults:!!action.meta&&action.meta.next==null,
order:action.order||null}})}));





case this.START:{
if(action.subkey){
var _superStart=_get(PaginatedNetworkSagaWrap.prototype.__proto__||Object.getPrototypeOf(PaginatedNetworkSagaWrap.prototype),'stateUpdate',this).call(this,state,action);
return(0,_immutabilityHelper2.default)(_superStart,_defineProperty({},
this.storeKey,{
$merge:_defineProperty({},
action.subkey,(0,_immutabilityHelper2.default)(this.initialState,{
$merge:{
pending:true,
order:action.order||null}}))}));





}
var superStart=_get(PaginatedNetworkSagaWrap.prototype.__proto__||Object.getPrototypeOf(PaginatedNetworkSagaWrap.prototype),'stateUpdate',this).call(this,state,action);
return(0,_immutabilityHelper2.default)(superStart,_defineProperty({},
this.storeKey,{
$merge:{
pending:true,
order:action.order||null}}));



}

default:break;}


if(updateObject){
if(action.subkey){
return(0,_immutabilityHelper2.default)(state,_defineProperty({},
this.storeKey,{
$merge:_defineProperty({},
action.subkey,updateObject)}));



}

return(0,_immutabilityHelper2.default)(state,_defineProperty({},
this.storeKey,{
$set:(0,_immutabilityHelper2.default)(state[this.storeKey],updateObject)}));


}


return _get(PaginatedNetworkSagaWrap.prototype.__proto__||Object.getPrototypeOf(PaginatedNetworkSagaWrap.prototype),'stateUpdate',this).call(this,state,action);
}}]);return PaginatedNetworkSagaWrap;}(_NetworkSagaWrap3.default);exports.default=PaginatedNetworkSagaWrap;