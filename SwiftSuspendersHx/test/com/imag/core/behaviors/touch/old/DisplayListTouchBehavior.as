package com.imag.core.behaviors.touch 
{
	import com.greensock.TweenLite;
	import flash.display.DisplayObject;
	import flash.display.Stage;
	import flash.events.MouseEvent;
	import flash.events.TouchEvent;
	
	/**
	 * ...
	 * @author Pete Shand
	 */
	public class DisplayListTouchBehavior extends BaseTouchBehavior 
	{
		protected var touchObject:DisplayObject;
		private var refID:String;
		
		public function DisplayListTouchBehavior(Begin:Function, Move:Function, End:Function, Over:Function, Out:Function) 
		{
			super(Begin, Move, End, Over, Out);
		}
		
		public function addListenerTo(touchObject:DisplayObject, useStageForRelease:Boolean=false):void
		{
			this.touchObject = touchObject;
			this.useStageForRelease = useStageForRelease;
			
			//if (!refID) refID = core.model.touchObjectReference.addDisplay(touchObject, Begin, Move, End);
			
			if (Begin != null)						touchObject.addEventListener(MouseEvent.MOUSE_DOWN, OnMouseEventDown);
			if (Move != null && !useStageForRelease)touchObject.addEventListener(MouseEvent.MOUSE_MOVE, OnMouseEventMove);
			if (End != null && !useStageForRelease)	touchObject.addEventListener(MouseEvent.MOUSE_UP, OnMouseEventUp);
			if (Over != null)						touchObject.addEventListener(MouseEvent.MOUSE_OVER, OnMouseEventOver);
			if (Out != null)						touchObject.addEventListener(MouseEvent.MOUSE_OUT, OnMouseEventOut);
			
			if (Begin != null)						touchObject.addEventListener(TouchEvent.TOUCH_BEGIN, OnTouchEventBegin);
			if (Move != null && !useStageForRelease)touchObject.addEventListener(TouchEvent.TOUCH_MOVE, OnTouchEventMove);
			if (End != null && !useStageForRelease)	touchObject.addEventListener(TouchEvent.TOUCH_END, OnTouchEventEnd);
			if (Over != null)						touchObject.addEventListener(TouchEvent.TOUCH_OVER, OnTouchEventOver);
			if (Out != null)						touchObject.addEventListener(TouchEvent.TOUCH_OUT, OnTouchEventOut);
		}
		
		public function removeTouchListenerTo(removeTouchObject:DisplayObject):void
		{
			removeTouchObject.removeEventListener(MouseEvent.MOUSE_DOWN, OnMouseEventDown);
			removeTouchObject.removeEventListener(MouseEvent.MOUSE_MOVE, OnMouseEventMove);
			removeTouchObject.removeEventListener(MouseEvent.MOUSE_UP, OnMouseEventUp);
			removeTouchObject.removeEventListener(MouseEvent.MOUSE_OVER, OnMouseEventOver);
			removeTouchObject.removeEventListener(MouseEvent.MOUSE_OUT, OnMouseEventOut);
			
			removeTouchObject.removeEventListener(TouchEvent.TOUCH_BEGIN, OnTouchEventBegin);
			removeTouchObject.removeEventListener(TouchEvent.TOUCH_MOVE, OnTouchEventMove);
			removeTouchObject.removeEventListener(TouchEvent.TOUCH_END, OnTouchEventEnd);
			removeTouchObject.removeEventListener(TouchEvent.TOUCH_OVER, OnTouchEventOver);
			removeTouchObject.removeEventListener(TouchEvent.TOUCH_OUT, OnTouchEventOut);
		}
		
		///////////////////////////////////////////////////////////////////////////////////////////
		// Classic display object event listeners//////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////
		
		private function OnMouseEventDown(event:MouseEvent):void
		{
			if (!pressCooldownActive) {
				if (useStageForRelease) {
					Blaze.stage.addEventListener(MouseEvent.MOUSE_MOVE, OnStageMouseMove);
					Blaze.stage.addEventListener(MouseEvent.MOUSE_UP, OnStageMouseUp);
				}
				
				TweenLite.delayedCall(cooldownTime, OnCooldownPressComplete);
				var touch:Touch = new Touch(-1, event.stageX, event.stageY, TouchPhase.BEGAN, null); // classic display should really have its own "Touch" proxy class so that the target can be set while keening strong typing
				pressCooldownActive = true;
				//core.model.awayTouchRegister.Register(Begin, touch, refID);
				Begin(touch);
			}
		}
		
		private function OnMouseEventMove(event:MouseEvent):void
		{
			var touch:Touch = new Touch( -1, event.stageX, event.stageY, TouchPhase.MOVED, null);
			//core.model.awayTouchRegister.Register(Move, touch, refID);
			Move(touch);
		}
		
		private function OnMouseEventUp(event:MouseEvent):void
		{
			if (!releaseCooldownActive) {
				TweenLite.delayedCall(cooldownTime, OnCooldownReleaseComplete);
				var touch:Touch = new Touch(-1, event.stageX, event.stageY, TouchPhase.ENDED, null);
				releaseCooldownActive = true;
				//core.model.awayTouchRegister.Register(End, touch, refID);
				End(touch);
			}
		}
		
		
		
		private function OnMouseEventOver(event:MouseEvent):void
		{
			var touch:Touch = new Touch( -1, event.stageX, event.stageY, TouchPhase.OVER, null);
			//core.model.awayTouchRegister.Register(Over, touch, refID);
			Over(touch);
		}
		
		private function OnMouseEventOut(event:MouseEvent):void
		{
			var touch:Touch = new Touch( -1, event.stageX, event.stageY, TouchPhase.OUT, null);
			//core.model.awayTouchRegister.Register(Out, touch, refID);
			Out(touch);
		}
		
		
		
		
		
		protected function OnTouchEventBegin(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID, event.stageX, event.stageY, TouchPhase.BEGAN, null);
			//core.model.awayTouchRegister.Register(Begin, touch, refID);
			Begin(touch);
		}
		
		protected function OnTouchEventMove(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID, event.stageX, event.stageY, TouchPhase.MOVED, null);
			//core.model.awayTouchRegister.Register(Move, touch, refID);
			Move(touch);
		}
		
		protected function OnTouchEventEnd(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID, event.stageX, event.stageY, TouchPhase.ENDED, null);
			//core.model.awayTouchRegister.Register(End, touch, refID);
			End(touch);
		}
		
		protected function OnTouchEventOver(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID, event.stageX, event.stageY, TouchPhase.OVER, null);
			//core.model.awayTouchRegister.Register(Over, touch, refID);
			Over(touch);
		}
		
		protected function OnTouchEventOut(event:TouchEvent):void
		{
			var touch:Touch = new Touch(event.touchPointID, event.stageX, event.stageY, TouchPhase.OUT, null);
			//core.model.awayTouchRegister.Register(Out, touch, refID);
			Out(touch);
		}
		
		///////////////////////////////////////////////////////////////////////////////////////////
		// Stage listener /////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////
		
		private function OnStageMouseUp(event:MouseEvent):void 
		{
			if (!releaseCooldownActive) {
				if (useStageForRelease) {
					Blaze.stage.removeEventListener(MouseEvent.MOUSE_MOVE, OnStageMouseMove);
					Blaze.stage.removeEventListener(MouseEvent.MOUSE_UP, OnStageMouseUp);
				}
				
				TweenLite.delayedCall(cooldownTime, OnCooldownReleaseComplete);
				var touch:Touch = new Touch(-1, event.stageX, event.stageY, TouchPhase.ENDED, null);
				releaseCooldownActive = true;
				//core.model.awayTouchRegister.Register(End, touch, refID);
				End(touch);
			}
		}
		
		private function OnStageMouseMove(event:MouseEvent):void 
		{
			var touch:Touch = new Touch( -1, event.stageX, event.stageY, TouchPhase.MOVED, null);
			//core.model.awayTouchRegister.Register(Move, touch, refID);
			Move(touch);
		}
	}
}