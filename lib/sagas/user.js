Object.defineProperty(exports,"__esModule",{value:true});exports.loginUser=undefined;

var _effects=require('redux-saga/effects');

var _constants=require('../constants');var _constants2=_interopRequireDefault(_constants);
var _apiService=require('../services/api-service');var _apiService2=_interopRequireDefault(_apiService);
var _store=require('../store');var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _marked=regeneratorRuntime.mark(

loginUser),_marked2=regeneratorRuntime.mark(












sagas);function loginUser(action){var response;return regeneratorRuntime.wrap(function loginUser$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return(0,_effects.put)(_store2.default.actions.user.dispatchPending(true));case 2:_context.prev=2;_context.next=5;return(0,_effects.call)(_apiService2.default.loginUser,action.payload);case 5:response=_context.sent;_context.next=8;return(0,_effects.put)(_store2.default.actions.user.dispatchStoreUser(response));case 8:_context.next=14;break;case 10:_context.prev=10;_context.t0=_context['catch'](2);_context.next=14;return(0,_effects.put)(_store2.default.actions.user.dispatchError(_context.t0));case 14:_context.next=16;return(0,_effects.put)(_store2.default.actions.user.dispatchPending(false));case 16:case'end':return _context.stop();}}},_marked,this,[[2,10]]);}function sagas(){return regeneratorRuntime.wrap(function sagas$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:

console.log('Auth sagas loaded');_context2.next=3;return(


(0,_effects.fork)(_effects.takeLatest,_constants2.default.LOGIN_USER,loginUser));case 3:case'end':return _context2.stop();}}},_marked2,this);}exports.



loginUser=loginUser;exports.default=

sagas;