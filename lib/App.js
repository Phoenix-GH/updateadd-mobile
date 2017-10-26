Object.defineProperty(exports,"__esModule",{value:true});exports.App=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _class,_temp2,_jsxFileName='src/App.js';

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeModalbox=require('react-native-modalbox');var _reactNativeModalbox2=_interopRequireDefault(_reactNativeModalbox);
var _reactRedux=require('react-redux');
var _reactNativeCodePush=require('react-native-code-push');var _reactNativeCodePush2=_interopRequireDefault(_reactNativeCodePush);

var _utils=require('./utils');var _utils2=_interopRequireDefault(_utils);
var _progressBar=require('./components/progress-bar');var _progressBar2=_interopRequireDefault(_progressBar);

var _index=require('./screens/index');
var _store=require('./store');var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
width:null,
height:null},

modal:{
justifyContent:'center',
alignItems:'center',
height:300}});var















App=exports.App=(_temp2=_class=function(_React$Component){_inherits(App,_React$Component);function App(){var _ref;var _temp,_this,_ret;_classCallCheck(this,App);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=App.__proto__||Object.getPrototypeOf(App)).call.apply(_ref,[this].concat(args))),_this),_this.





state={
showDownloadingModal:false,
showInstalling:false,
downloadProgress:0},_this.















































store=(0,_store2.default)(),_this.
_modal=null,_temp),_possibleConstructorReturn(_this,_ret);}_createClass(App,[{key:'componentWillMount',value:function componentWillMount(){if(!__DEV__){_utils2.default.configure('');_reactNativeCodePush2.default.getUpdateMetadata().then(function(update){if(update){_utils2.default.setVersion('codepush:'+update.label);}});_utils2.default.setExtraContext(this.store);_utils2.default.setTagsContext('buddbuild_version',global.build_version);}}},{key:'componentDidMount',value:function componentDidMount(){var _this2=this;_reactNativeCodePush2.default.sync({updateDialog:true,installMode:_reactNativeCodePush2.default.InstallMode.IMMEDIATE},function(status){switch(status){case _reactNativeCodePush2.default.SyncStatus.DOWNLOADING_PACKAGE:_this2.setState({showDownloadingModal:true});if(_this2._modal){_this2._modal.open();}break;case _reactNativeCodePush2.default.SyncStatus.INSTALLING_UPDATE:_this2.setState({showInstalling:true});break;case _reactNativeCodePush2.default.SyncStatus.UPDATE_INSTALLED:if(_this2._modal){_this2._modal.close();}_this2.setState({showDownloadingModal:false});break;default:break;}},function(_ref2){var receivedBytes=_ref2.receivedBytes,totalBytes=_ref2.totalBytes;_this2.setState({downloadProgress:receivedBytes/totalBytes*100});});}},{key:'render',value:function render()

{var _this3=this;
if(_reactNative.Platform.OS==='ios'){
global.buildVersion=this.props.version;
global.buildEnv=this.props.buildEnv;
}else{
global.buildVersion=_reactNative.NativeModules.RNConfig.buddyBuildNumber;
global.buildEnv=_reactNative.NativeModules.RNConfig.buildEnv;
}

if(this.state.showDownloadingModal){
return(
_react2.default.createElement(_reactNative.View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:111}},
_react2.default.createElement(_reactNativeModalbox2.default,{
style:styles.modal,
backdrop:false,
ref:function ref(c){_this3._modal=c;},
swipeToClose:false,__source:{fileName:_jsxFileName,lineNumber:112}},

_react2.default.createElement(_reactNative.View,{style:{
flex:1,
alignSelf:'stretch',
justifyContent:'center',
padding:20},__source:{fileName:_jsxFileName,lineNumber:118}},


this.state.showInstalling?

_react2.default.createElement(_reactNative.Text,{style:{
color:'#5067FF',
textAlign:'center',
marginBottom:15,
fontSize:15},__source:{fileName:_jsxFileName,lineNumber:127}},'Installing update...'):





_react2.default.createElement(_reactNative.View,{style:{
flex:1,
alignSelf:'stretch',
justifyContent:'center',
padding:20},__source:{fileName:_jsxFileName,lineNumber:137}},


_react2.default.createElement(_reactNative.Text,{style:{
color:'#5067FF',
textAlign:'center',
marginBottom:15,
fontSize:15},__source:{fileName:_jsxFileName,lineNumber:144}},'Downloading update... ',


' ',
parseInt(this.state.downloadProgress,10)+' %'),

_react2.default.createElement(_progressBar2.default,{color:'#5067FF',progress:parseInt(this.state.downloadProgress,10),__source:{fileName:_jsxFileName,lineNumber:154}}))))));






}

return(
_react2.default.createElement(_reactRedux.Provider,{store:this.store,__source:{fileName:_jsxFileName,lineNumber:164}},
_react2.default.createElement(_index.RootContainer,{__source:{fileName:_jsxFileName,lineNumber:165}})));


}}]);return App;}(_react2.default.Component),_class.defaultProps={version:null,buildEnv:null},_temp2);


var start=function start(){
_reactNative.AppRegistry.registerComponent('ReactNativeSeed',function(){return App;});
};exports.default=

start;