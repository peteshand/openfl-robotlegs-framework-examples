package com.imag.core.behaviors.resize 
{
	import flash.display.Stage;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Pete Shand
	 */
	public class ResizeBehavior
	{
		private static var stage:Stage;
		private static var callbacks:Vector.<Function> = new Vector.<Function>();
		
		private static var resizeCount:int = 0;
		private static var repeatResizeForXFrames:int = 4;
		
		public function ResizeBehavior() 
		{
			
		}
		
		public static function init(stage:Stage):void
		{
			ResizeBehavior.stage = stage;
		}
		
		public static function add(callback:Function):void
		{
			addCallback(callback);
			
			stage.addEventListener(Event.RESIZE, OnStageResize);
			OnStageResize();
		}
		
		private static function addCallback(callback:Function):void 
		{
			for (var i:int = 0; i < callbacks.length; i++) 
			{
				if (callbacks[i] == callback) return;
			}
			callbacks.push(callback);
		}
		
		public static function remove(callback:Function):void
		{
			for (var i:int = 0; i < callbacks.length; i++) 
			{
				if (callbacks[i] == callback) {
					callbacks.splice(i, 1);
				}
			}
			if (stage != null && callbacks.length == 0) {
				stage.removeEventListener(Event.RESIZE, OnStageResize);
			}
		}
		
		public static function removeAll():void
		{
			callbacks = new Vector.<Function>();
			if (stage != null) {
				stage.removeEventListener(Event.RESIZE, OnStageResize);
			}
		}
		
		protected static function OnStageResize(e:Event=null):void 
		{
			resizeCount = 0;
			stage.addEventListener(Event.ENTER_FRAME, Update);
			Update(null);
		}
		
		private static function Update(e:Event):void 
		{
			resizeCount++;
			if (resizeCount >= repeatResizeForXFrames) stage.removeEventListener(Event.ENTER_FRAME, Update);
			for (var i:int = 0; i < callbacks.length; i++) 
			{
				callbacks[i]();
			}
		}
	}
}