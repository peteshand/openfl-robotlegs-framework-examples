package com.imag.core.behaviors.touch 
{
	import flash.display.DisplayObject;
	import flash.events.MouseEvent;
	import flash.events.TouchEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import starling.events.Touch;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	internal class DisplaylistTouchBehaviorVec implements ITouchBehaviorVec
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
		
		private var useStageForRelease:Boolean = true;
		private var mouseDown:Boolean = false;
		private var down:Vector.<Boolean> = new Vector.<Boolean>(100);
		
		public function DisplaylistTouchBehaviorVec(touchObject:DisplayObject) 
		{
			this.touchObject = touchObject;
		}
		
		public function dispose():void 
		{
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
			if (_onBegin == value) return;
			_onBegin = value;
			if (_onBegin != null){
				touchObject.addEventListener(MouseEvent.MOUSE_DOWN, OnMouseEventDown);
				touchObject.addEventListener(TouchEvent.TOUCH_BEGIN, OnTouchEventBegin);
			}
			else {
				touchObject.removeEventListener(MouseEvent.MOUSE_DOWN, OnMouseEventDown);
				touchObject.removeEventListener(TouchEvent.TOUCH_BEGIN, OnTouchEventBegin);
			}
		}
		
		public function get onMove():Function 
		{
			return _onMove;
		}
		
		public function set onMove(value:Function):void 
		{
			if (_onMove == value) return;
			_onMove = value;
			checkMoveHoverListeners();
		}
		
		public function get onEnd():Function 
		{
			return _onEnd;
		}
		
		public function set onEnd(value:Function):void 
		{
			if (_onEnd == value) return;
			_onEnd = value;
			if (_onEnd != null) {
				if (useStageForRelease){
					touchObject.addEventListener(MouseEvent.MOUSE_UP, OnMouseEventUp);
					touchObject.addEventListener(TouchEvent.TOUCH_END, OnTouchEventEnd);
				}
				else {
					touchObject.stage.addEventListener(MouseEvent.MOUSE_UP, OnMouseEventUp);
					touchObject.stage.addEventListener(TouchEvent.TOUCH_END, OnTouchEventEnd);
				}
			}
			else {
				if (useStageForRelease){
					touchObject.removeEventListener(MouseEvent.MOUSE_UP, OnMouseEventUp);
					touchObject.removeEventListener(TouchEvent.TOUCH_END, OnTouchEventEnd);
				}
				else {
					touchObject.stage.removeEventListener(MouseEvent.MOUSE_UP, OnMouseEventUp);
					touchObject.stage.removeEventListener(TouchEvent.TOUCH_END, OnTouchEventEnd);
				}
			}
		}
		
		public function get onOver():Function 
		{
			return _onOver;
		}
		
		public function set onOver(value:Function):void 
		{
			if (_onOver == value) return;
			_onOver = value;
			if (_onOver != null){
				touchObject.addEventListener(MouseEvent.MOUSE_OVER, OnMouseEventOver);
				touchObject.addEventListener(TouchEvent.TOUCH_OVER, OnTouchEventOver);
			}
			else {
				touchObject.removeEventListener(MouseEvent.MOUSE_OVER, OnMouseEventOver);
				touchObject.removeEventListener(TouchEvent.TOUCH_OVER, OnTouchEventOver);
			}
		}
		
		public function get onOut():Function 
		{
			return _onOut;
		}
		
		public function set onOut(value:Function):void 
		{
			if (_onOut == value) return;
			_onOut = value;
			if (_onOut != null){
				touchObject.addEventListener(MouseEvent.MOUSE_OUT, OnMouseEventOut);
				touchObject.addEventListener(TouchEvent.TOUCH_OUT, OnTouchEventOut);
				}
			else {
				touchObject.removeEventListener(MouseEvent.MOUSE_OUT, OnMouseEventOut);
				touchObject.removeEventListener(TouchEvent.TOUCH_OUT, OnTouchEventOut);
			}
		}
		
		public function get onHover():Function 
		{
			return _onHover;
		}
		
		public function set onHover(value:Function):void 
		{
			if (_onHover == value) return;
			_onHover = value;
			checkMoveHoverListeners();
		}
		
		private function checkMoveHoverListeners():void 
		{
			if (_onMove != null || _onHover != null) {
				if (useStageForRelease){
					touchObject.addEventListener(MouseEvent.MOUSE_MOVE, OnMouseEventMove);
					touchObject.addEventListener(TouchEvent.TOUCH_MOVE, OnTouchEventMove);
				}
				else {
					touchObject.stage.addEventListener(MouseEvent.MOUSE_MOVE, OnMouseEventMove);
					touchObject.stage.addEventListener(TouchEvent.TOUCH_MOVE, OnTouchEventMove);
				}
			}
			else {
				if (useStageForRelease){
					touchObject.removeEventListener(MouseEvent.MOUSE_MOVE, OnMouseEventMove);
					touchObject.removeEventListener(TouchEvent.TOUCH_MOVE, OnTouchEventMove);
				}
				else {
					touchObject.stage.removeEventListener(MouseEvent.MOUSE_MOVE, OnMouseEventMove);
					touchObject.stage.removeEventListener(TouchEvent.TOUCH_MOVE, OnTouchEventMove);
				}
			}
		}
		
		public function get onStationary():Function 
		{
			return _onStationary;
		}
		
		public function set onStationary(value:Function):void 
		{
			_onStationary = value;
		}
		
		private function OnMouseEventDown(event:MouseEvent):void
		{
			mouseDown = true;
			var touch:Touch = new Touch(-1);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.BEGAN;
			onBegin(touch);
		}
		
		protected function OnTouchEventBegin(event:TouchEvent):void
		{
			down[event.touchPointID] = true;
			var touch:Touch = new Touch(event.touchPointID);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.BEGAN;
			onBegin(touch);
		}
		
		private function OnMouseEventMove(event:MouseEvent):void
		{
			var touch:Touch = new Touch(-1);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.MOVED;
			if (mouseDown) {
				if (onMove != null) onMove(touch);
			}
			else {
				if (onHover != null) onHover(touch);
			}
		}
		
		protected function OnTouchEventMove(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.MOVED;
			if (down[event.touchPointID]) {
				if (onMove != null) onMove(touch);
			}
			else {
				if (onHover != null) onHover(touch);
			}
		}
		
		private function OnMouseEventUp(event:MouseEvent):void
		{
			mouseDown = false;
			var touch:Touch = new Touch(-1);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.ENDED;
			onEnd(touch);
		}
		
		protected function OnTouchEventEnd(event:TouchEvent):void
		{
			down[event.touchPointID] = false;
			var touch:Touch = new Touch(event.touchPointID);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.ENDED;
			onEnd(touch);
		}
		
		private function OnMouseEventOver(event:MouseEvent):void
		{
			var touch:Touch = new Touch(-1);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.OVER;
			onOver(touch);
		}
		
		protected function OnTouchEventOver(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.OVER;
			onOver(touch);
		}
		
		private function OnMouseEventOut(event:MouseEvent):void
		{
			var touch:Touch = new Touch(-1);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.OUT;
			onOut(touch);
		}
		
		protected function OnTouchEventOut(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID);
			touch.globalX = event.stageX;
			touch.globalY = event.stageY;
			touch.phase = TouchPhase.OUT;
			onOut(touch);
		}
	}
}