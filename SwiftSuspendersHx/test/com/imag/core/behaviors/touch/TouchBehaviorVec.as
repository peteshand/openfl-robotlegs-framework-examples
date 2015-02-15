package com.imag.core.behaviors.touch 
{
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import starling.display.DisplayObject;
	import starling.events.TouchEvent;
	import starling.events.Touch;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	internal class TouchBehaviorVec 
	{
		public var touchObject:DisplayObject;
		
		public var onBegin:Function;
		public var onMove:Function;
		public var onEnd:Function;
		public var onOver:Function;
		public var onOut:Function;
		public var onHover:Function;
		public var onStationary:Function;
		
		protected var touchBegans:Vector.<Touch>;
		protected var touchMoves:Vector.<Touch>;
		protected var touchEnds:Vector.<Touch>;
		protected var touchOvers:Vector.<Touch>;
		protected var touchOuts:Vector.<Touch>;
		protected var touchHovers:Vector.<Touch>;
		protected var touchStationary:Vector.<Touch>;
		
		protected var stageMoves:Vector.<Touch>;
		protected var stageHovers:Vector.<Touch>;
		
		private var mEnabled:Boolean = true;
        private var mUseHandCursor:Boolean = true;
		
		private var touchBehaviorObjects:Vector.<TouchBehaviorObject> = new Vector.<TouchBehaviorObject>();
		
		public function TouchBehaviorVec(touchObject:DisplayObject) 
		{
			this.touchObject = touchObject;
			touchObject.touchable = true;
			touchObject.addEventListener(TouchEvent.TOUCH, OnTouch);
		}
		
		protected function OnTouch(e:TouchEvent):void 
		{
			Mouse.cursor = (mUseHandCursor && mEnabled && e.interactsWith(touchObject)) ? MouseCursor.BUTTON : MouseCursor.AUTO;
			
			touchBegans = e.getTouches(touchObject, TouchPhase.BEGAN);
			touchMoves = e.getTouches(touchObject, TouchPhase.MOVED);
			touchEnds = e.getTouches(touchObject, TouchPhase.ENDED);
			touchHovers = e.getTouches(touchObject, TouchPhase.HOVER);
			touchStationary = e.getTouches(touchObject, TouchPhase.STATIONARY);
			
			stageMoves = e.getTouches(touchObject.stage, TouchPhase.MOVED);
			stageHovers = e.getTouches(touchObject.stage, TouchPhase.HOVER);
			
			if (touchBegans.length > 0) ParseTouchBegins(touchBegans);
			if (touchMoves.length > 0) ParseTouchMoves(touchMoves);
            if (touchEnds.length > 0) ParseTouchEnds(touchEnds);
			if (touchHovers.length > 0) ParseTouchHovers(touchHovers);
			if (touchStationary.length > 0) ParseTouchStationary(touchStationary);
			
			if (stageMoves.length > 0) CheckRollOut(stageMoves);
			if (stageHovers.length > 0) CheckRollOut(stageHovers);
		}
		
		protected function ParseTouchBegins(touchVector:Vector.<Touch>):void
		{
			for (var i:int = 0; i < touchVector.length; ++i) {
				touchBehaviorObject(i).ParseTouchBegins(touchVector[i]);
			}
		}
		
		protected function ParseTouchMoves(touchVector:Vector.<Touch>):void
		{
			for (var i:int = 0; i < touchVector.length; ++i) {
				touchBehaviorObject(i).ParseTouchMoves(touchVector[i]);
			}
		}
		
		protected function ParseTouchEnds(touchVector:Vector.<Touch>):void
		{
			for (var i:int = 0; i < touchVector.length; ++i) {
				touchBehaviorObject(i).ParseTouchEnds(touchVector[i]);
			}
		}
		
		private function ParseTouchHovers(touchVector:Vector.<Touch>):void 
		{
			for (var i:int = 0; i < touchVector.length; ++i) {
				touchBehaviorObject(i).ParseTouchHovers(touchVector[i]);
			}
		}
		
		protected function ParseTouchStationary(touchVector:Vector.<Touch>):void 
		{
			for (var i:int = 0; i < touchVector.length; ++i) {
				touchBehaviorObject(i).ParseTouchStationary(touchVector[i]);
			}
		}
		
		private function CheckRollOut(touchVector:Vector.<Touch>):void 
		{
			for (var i:int = 0; i < touchVector.length; ++i) {
				touchBehaviorObject(i).CheckRollOut(touchVector[i]);
			}
		}
		
		private function touchBehaviorObject(index:int):TouchBehaviorObject 
		{
			for (var i:int = 0; i < touchBehaviorObjects.length; i++) 
			{
				if (index == i) {
					return touchBehaviorObjects[i];
				}
			}
			var touchBehaviorObject:TouchBehaviorObject = new TouchBehaviorObject(this, touchObject);
			touchBehaviorObjects.push(touchBehaviorObject);
			return touchBehaviorObject;
		}
		
		public function dispose():void 
		{
			touchObject.removeEventListener(TouchEvent.TOUCH, OnTouch);
			touchObject = null;
			onBegin = null;
			onMove = null;
			onEnd = null;
			onOver = null;
			onOut = null;
			onHover = null;
			onStationary = null;
			touchBegans = null;
			touchMoves = null;
			touchEnds = null;
			touchOvers = null;
			touchOuts = null;
			touchHovers = null;
			touchStationary = null;
			stageMoves = null;
			stageHovers = null;
		}
	}
}