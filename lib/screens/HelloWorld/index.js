Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/screens/HelloWorld/index.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




HelloWorldScreen=function(_React$Component){_inherits(HelloWorldScreen,_React$Component);function HelloWorldScreen(){_classCallCheck(this,HelloWorldScreen);return _possibleConstructorReturn(this,(HelloWorldScreen.__proto__||Object.getPrototypeOf(HelloWorldScreen)).apply(this,arguments));}_createClass(HelloWorldScreen,[{key:'render',value:function render()
{
return(
_react2.default.createElement(_reactNative.View,{style:{alignItems:'center'},__source:{fileName:_jsxFileName,lineNumber:13}},
_react2.default.createElement(_reactNative.Text,{__source:{fileName:_jsxFileName,lineNumber:14}},'Hello World')));




}}]);return HelloWorldScreen;}(_react2.default.Component);exports.default=


(0,_reactRedux.connect)(function(){return{};})(HelloWorldScreen);