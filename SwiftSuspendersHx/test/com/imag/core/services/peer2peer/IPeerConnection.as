package com.imag.core.services.peer2peer 
{
	import org.osflash.signals.Signal;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public interface IPeerConnection 
	{
		function connect():void;
		function disconnect():void;
		
		function start():void;
		function stop():void;
		
		function register(regClass:Class):void;
		function send(payload:Object):void;
		
		function get connected():Boolean;
		function get running():Boolean;
		
		function get frameBuffer():int;
		function set frameBuffer(value:int):void;
		
		function get dispatchToSelf():Boolean;
		function set dispatchToSelf(value:Boolean):void;
		
		function get ipMulticast():String;
		function set ipMulticast(value:String):void;
		function get ipMulticastPort():int;
		function set ipMulticastPort(value:int):void;
		
		function get connectionRefused():Signal;
		function get connectionSuccess():Signal;
		function get neighborConnect():Signal;
		function get neighborDisconnect():Signal;
		
		function get onPacketReceived():Signal;
		function onSubPacketReceived(objectID:String = ""):Signal;
		
	}
}