package com.imag.core.behaviors.touch 
{
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import starling.display.DisplayObject;
	import starling.events.TouchEvent;
	import starling.events.Touch;
	//import starling.events.TouchPhase;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	internal class StarlingTouchBehaviorVec implements ITouchBehaviorVec
	{
		private var _touchObject:*;
		
		private var _onBegin:Function;
		private var _onMove:Function;
		private var _onEnd:Function;
		private var _onOver:Function;
		private var _onOut:Function;
		private var _onHover:Function;
		private var _onStationary:Function;
		
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
		
		static private var touchBehaviorObjects:Vector.<StarlingTouchBehaviorObject> = new Vector.<StarlingTouchBehaviorObject>();
		
		public function StarlingTouchBehaviorVec(touchObject:DisplayObject) 
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
		
		private function touchBehaviorObject(index:int):StarlingTouchBehaviorObject 
		{
			for (var i:int = 0; i < touchBehaviorObjects.length; i++) 
			{
				if (index == i) {
					return touchBehaviorObjects[i];
				}
			}
			var touchBehaviorObject:StarlingTouchBehaviorObject = new StarlingTouchBehaviorObject(this, touchObject);
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
		
		public function get touchObject():* 
		{
			return _touchObject;
		}
		
		public function set touchObject(value:*):void 
		{
			_touchObject = value;
		}
		
		public function get onBegin():Function 
		{
			return _onBegin;
		}
		
		public function set onBegin(value:Function):void 
		{
			_onBegin = value;
		}
		
		public function get onMove():Function 
		{
			return _onMove;
		}
		
		public function set onMove(value:Function):void 
		{
			_onMove = value;
		}
		
		public function get onEnd():Function 
		{
			return _onEnd;
		}
		
		public function set onEnd(value:Function):void 
		{
			_onEnd = value;
		}
		
		public function get onOver():Function 
		{
			return _onOver;
		}
		
		public function set onOver(value:Function):void 
		{
			_onOver = value;
		}
		
		public function get onOut():Function 
		{
			return _onOut;
		}
		
		public function set onOut(value:Function):void 
		{
			_onOut = value;
		}
		
		public function get onHover():Function 
		{
			return _onHover;
		}
		
		public function set onHover(value:Function):void 
		{
			_onHover = value;
		}
		
		public function get onStationary():Function 
		{
			return _onStationary;
		}
		
		public function set onStationary(value:Function):void 
		{
			_onStationary = value;
		}
	}
}