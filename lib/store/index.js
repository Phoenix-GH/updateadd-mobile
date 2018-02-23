Object.defineProperty(exports,"__esModule",{value:true});exports.addListener=undefined;

var _remoteReduxDevtools=require('remote-redux-devtools');var _remoteReduxDevtools2=_interopRequireDefault(_remoteReduxDevtools);
var _redux=require('redux');
var _reduxSaga=require('redux-saga');var _reduxSaga2=_interopRequireDefault(_reduxSaga);
var _reactNavigationReduxHelpers=require('react-navigation-redux-helpers');

var _user=require('./user');var UserActions=_interopRequireWildcard(_user);

var _sagas=require('../sagas');

var _screens=require('../screens');

var _constants=require('../constants');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}


var initialState=_screens.AppNavigator.router.getStateForAction(_screens.AppNavigator.router.getActionForPathAndParams(_constants.Roots.HelloWorld));

var navReducer=function navReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
var nextState=_screens.AppNavigator.router.getStateForAction(action,state);

return nextState||state;
};


var logAction=function logAction(store){return function(next){return function(action){

if(!__DEV__){
console.log('BEFORE',JSON.stringify(store.getState()));
console.log('ACTION',action.type,JSON.stringify(action));
}else{
console.log('BEFORE',store.getState());
console.log('ACTION',action.type,action);
}
var result=next(action);
if(!__DEV__){
console.log('AFTER',JSON.stringify(store.getState()));
}else{
console.log('AFTER',store.getState());
}

return result;
};};};

var reducers=(0,_redux.combineReducers)({
user:UserActions.default,
nav:navReducer});


var navigationMiddleware=(0,_reactNavigationReduxHelpers.createReactNavigationReduxMiddleware)(
'root',
function(state){return state.nav;});

var addListener=exports.addListener=(0,_reactNavigationReduxHelpers.createReduxBoundAddListener)('root');exports.default=

{
actions:{
user:UserActions},

configureStore:function configureStore(){
var sagaMiddleware=(0,_reduxSaga2.default)();
var middlewares=[
sagaMiddleware,
logAction,
navigationMiddleware];


var middleware=_redux.applyMiddleware.apply(undefined,middlewares);

if(process.env.NODE_ENV!=='production'){
middleware=(0,_redux.compose)(middleware,(0,_remoteReduxDevtools2.default)({name:'nativestarterkit',realtime:true}));
}

var store=(0,_redux.createStore)(reducers,middleware);
_sagas.generators.map(function(saga){return sagaMiddleware.run(saga);});


store.sagaMiddleware=sagaMiddleware;

return store;
}};