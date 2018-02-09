Object.defineProperty(exports,"__esModule",{value:true});exports.RootContainer=exports.AppNavigator=undefined;var _jsxFileName='src/screens/index.js';


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _reactNavigation=require('react-navigation');
var _reactNavigationReduxHelpers=require('react-navigation-redux-helpers');


var _constants=require('../constants');

var _HelloWorld=require('./HelloWorld');var _HelloWorld2=_interopRequireDefault(_HelloWorld);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var AppNavigator=exports.AppNavigator=(0,_reactNavigation.StackNavigator)(_defineProperty({},
_constants.Roots.HelloWorld,{
screen:_HelloWorld2.default}));



var middleware=(0,_reactNavigationReduxHelpers.createReactNavigationReduxMiddleware)(
"root",
function(state){return state.nav;});

var addListener=(0,_reactNavigationReduxHelpers.createReduxBoundAddListener)("root");

var _RootContainer=function _RootContainer(props){return(


_react2.default.createElement(AppNavigator,{navigation:(0,_reactNavigation.addNavigationHelpers)({dispatch:props.dispatch,state:props.nav,addListener:addListener}),__source:{fileName:_jsxFileName,lineNumber:29}}));};

var mapStateToProps=function mapStateToProps(state){return{nav:state.nav};};

var mapStateToDispatch=function mapStateToDispatch(dispatch){return{dispatch:dispatch};};

var RootContainer=exports.RootContainer=(0,_reactRedux.connect)(mapStateToProps,mapStateToDispatch)(_RootContainer);exports.default=

AppNavigator;