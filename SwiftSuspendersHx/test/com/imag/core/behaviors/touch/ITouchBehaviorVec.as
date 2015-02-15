package com.imag.core.behaviors.touch 
{
	/**
	 * ...
	 * @author P.J.Shand
	 */
	internal interface ITouchBehaviorVec 
	{
		function dispose():void;
		function get touchObject():*;
		function set touchObject(value:*):void;
		function get onBegin():Function;
		function set onBegin(value:Function):void;
		function get onMove():Function;
		function set onMove(value:Function):void;
		function get onEnd():Function;
		function set onEnd(value:Function):void;
		function get onOver():Function;
		function set onOver(value:Function):void;
		function get onOut():Function;
		function set onOut(value:Function):void;
		function get onHover():Function;
		function set onHover(value:Function):void;
		function get onStationary():Function;
		function set onStationary(value:Function):void;
	}
}