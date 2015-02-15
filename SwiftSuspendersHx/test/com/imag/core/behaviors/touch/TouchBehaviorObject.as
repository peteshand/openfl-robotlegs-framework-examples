package com.imag.core.behaviors.touch 
{
	import flash.geom.Point;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import starling.display.DisplayObject;
	import starling.events.TouchEvent;
	import starling.events.Touch;
	import starling.events.TouchPhase;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	internal class TouchBehaviorObject 
	{
		private var touchBehaviorVec:TouchBehaviorVec;
		private var touchObject:DisplayObject;
		
		public var onBegin:Function;
		public var onMove:Function;
		public var onEnd:Function;
		public var onOver:Function;
		public var onOut:Function;
		public var onHover:Function;
		public var onStationary:Function;
		
		private var _isRolledOver:Boolean = false;
		private var hitPoint:Point = new Point();
		
		public function TouchBehaviorObject(touchBehaviorVec:TouchBehaviorVec, touchObject:DisplayObject) 
		{
			this.touchObject = touchObject;
			this.touchBehaviorVec = touchBehaviorVec;
		}
		
		public function ParseTouchBegins(touch:Touch):void
		{
			if (touchBehaviorVec.onBegin != null) touchBehaviorVec.onBegin(touch);
		}
		
		public function ParseTouchMoves(touch:Touch):void
		{
			if (touchBehaviorVec.onMove != null) touchBehaviorVec.onMove(touch);
		}
		
		public function ParseTouchEnds(touch:Touch):void
		{
			if (touchBehaviorVec.onEnd != null) touchBehaviorVec.onEnd(touch);
		}
		
		public function ParseTouchOvers(touch:Touch):void 
		{
			if (touchBehaviorVec.onOver != null) touchBehaviorVec.onOver(touch);
		}
		
		public function ParseTouchOuts(touch:Touch):void 
		{
			if (touchBehaviorVec.onOut != null) touchBehaviorVec.onOut(touch);
		}
		
		public function ParseTouchHovers(touch:Touch):void 
		{
			if (touchBehaviorVec.onHover != null) touchBehaviorVec.onHover(touch);
		}
		
		public function ParseTouchStationary(touch:Touch):void 
		{
			if (touchBehaviorVec.onStationary != null) touchBehaviorVec.onStationary(touch);
		}
		
		public function CheckRollOut(touch:Touch):void 
		{
			hitPoint.setTo(touch.globalX, touch.globalY)
			if (touchObject == touchObject.hitTest(hitPoint)) {
				isRolledOver(true, touch);
			}
			else {
				isRolledOver(false, touch);
			}
		}
		
		public function isRolledOver(value:Boolean, touch:Touch):void 
		{
			if (_isRolledOver == value) return;
			_isRolledOver = value;
			if (value) {
				if (touchBehaviorVec.onOver != null) touchBehaviorVec.onOver(touch);
			}
			else {
				if (touchBehaviorVec.onOut != null) touchBehaviorVec.onOut(touch);
			}
		}
	}
}