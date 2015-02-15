package com.imag.core.utils.delay 
{
	import flash.display.Sprite;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class Delay 
	{
		private static var broadcaster:Sprite = new Sprite();
		private static var delayObjects:Vector.<DelayObject>;
		
		public static var TIME_UNIT_MILLISECONDS:int = 0;
		public static var TIME_UNIT_SECONDS:int = 1;
		public static var TIME_UNIT_MINUTES:int = 2;
		public static var TIME_UNIT_HOURS:int = 3;
		public static var TIME_UNIT_DAYS:int = 4;
		
		public function Delay() 
		{
			
		}
		
		private static function init():void 
		{
			if (!delayObjects) delayObjects = new Vector.<DelayObject>();
		}
		
		public static function nextFrame(callback:Function, params:Array=null):void
		{
			Delay.byFrames(1, callback, params);
		}
		
		public static function byFrames(frames:int, callback:Function, params:Array=null):void 
		{
			init();
			var delayObject:DelayObject = new DelayObject(broadcaster)
			delayObjects.push(delayObject);
			delayObject.by(frames, clearObject, callback, params);
		}
		
		public static function byTime(time:int, callback:Function, params:Array=null, units:int=1):void 
		{
			init();
			var delayObject:DelayObject = new DelayObject(broadcaster)
			delayObjects.push(delayObject);
			delayObject.byTime(time, clearObject, callback, params, units);
		}
		
		private static function clearObject(delayObject:DelayObject):void 
		{
			for (var i:int = 0; i < delayObjects.length; i++) 
			{
				if (delayObjects[i] == delayObject) {
					delayObject.dispose();
					delayObject = null;
					delayObjects.splice(i, 1);
				}
			}
		}
		
		public static function killDelay(callback:Function):void 
		{
			if (!delayObjects) return;
			for (var i:int = 0; i < delayObjects.length; i++) 
			{
				if (delayObjects[i].callback == callback) {
					delayObjects[i].dispose();
					delayObjects[i] = null;
					delayObjects.splice(i, 1);
					i--;
				}
			}
		}
	}
}

import flash.display.Sprite;
import flash.events.Event;
import flash.events.TimerEvent;
import flash.utils.Timer;

class DelayObject
{
	private var broadcaster:Sprite;
	public var callback:Function;
	private var params:Array;
	private var clearObject:Function;
	
	private var frameCount:int = 0;
	private var frames:int;
	
	private var timer:Timer;
	
	public function DelayObject(broadcaster:Sprite):void
	{
		this.broadcaster = broadcaster;
	}
	
	public function nextFrame(clearObject:Function, callback:Function, params:Array=null):void 
	{
		by(1, clearObject, callback, params);
	}
	
	public function by(frames:int, clearObject:Function, callback:Function, params:Array=null):void 
	{
		this.frames = frames;
		this.clearObject = clearObject;
		this.params = params;
		this.callback = callback;
		broadcaster.addEventListener(Event.ENTER_FRAME, Update);
		Update(null);
	}
	
	public function byTime(time:int, clearObject:Function, callback:Function, params:Array, units:int = 1):void 
	{
		this.clearObject = clearObject;
		this.params = params;
		this.callback = callback;
		
		if (units >= 1) time *= 1000;
		if (units >= 2) time *= 60;
		if (units >= 3) time *= 60;
		if (units >= 4) time *= 24;
		
		timer = new Timer(time, 1);
		timer.addEventListener(TimerEvent.TIMER_COMPLETE, OnTimerComplete);
		timer.start();
	}
	
	private function OnTimerComplete(e:TimerEvent):void 
	{
		if (callback != null) callback.apply(this, params);
		if (clearObject != null) clearObject(this);
		dispose();
	}
	
	private function Update(e:Event):void 
	{
		if (frames == frameCount) {
			if (callback != null) callback.apply(this, params);
			if (clearObject != null) clearObject(this);
			dispose();
			return;
		}
		frameCount++;
	}
	
	public function dispose():void
	{
		if (broadcaster) {
			broadcaster.removeEventListener(Event.ENTER_FRAME, Update);
			broadcaster = null;
		}
		if (timer) {
			timer.stop();
			timer = null;
		}
		callback = null;
		params = null;
		clearObject = null;
	}
}