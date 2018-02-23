Object.defineProperty(exports,"__esModule",{value:true});exports.App=undefined;var _jsxFileName='src/App.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');

var _reactNativeCodePush=require('react-native-code-push');var _reactNativeCodePush2=_interopRequireDefault(_reactNativeCodePush);

var _utils=require('./utils');var _utils2=_interopRequireDefault(_utils);

var _store=require('./store');var _store2=_interopRequireDefault(_store);

var _index=require('./screens/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var codePushOptions={
checkFrequency:_reactNativeCodePush2.default.CheckFrequency.ON_APP_START,
installMode:_reactNativeCodePush2.default.InstallMode.ON_NEXT_SUSPEND};var



App=exports.App=function(_React$Component){_inherits(App,_React$Component);function App(){var _ref;var _temp,_this,_ret;_classCallCheck(this,App);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=App.__proto__||Object.getPrototypeOf(App)).call.apply(_ref,[this].concat(args))),_this),_this.













store=_store2.default.configureStore(),_this.
_modal=null,_temp),_possibleConstructorReturn(_this,_ret);}_createClass(App,[{key:'componentWillMount',value:function componentWillMount(){if(!__DEV__){_utils2.default.configure('');_reactNativeCodePush2.default.getUpdateMetadata().then(function(update){if(update){_utils2.default.setVersion('codepush:'+update.label);}});_utils2.default.setExtraContext(this.store);}}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactRedux.Provider,{store:this.store,__source:{fileName:_jsxFileName,lineNumber:40}},
_react2.default.createElement(_index.RootContainer,{__source:{fileName:_jsxFileName,lineNumber:41}})));


}}]);return App;}(_react2.default.Component);


var start=function start(){
_reactNative.AppRegistry.registerComponent('ReactNativeSeed',function(){return(0,_reactNativeCodePush2.default)(codePushOptions)(App);});
};exports.default=

start;