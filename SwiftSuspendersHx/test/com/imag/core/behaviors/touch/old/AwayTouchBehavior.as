package com.imag.core.behaviors.touch 
{
	import away3d.core.pick.IPickingCollider;
	import away3d.core.pick.PickingColliderType;
	import away3d.entities.Entity;
	import away3d.events.MouseEvent3D;
	import away3d.events.TouchEvent3D;
	import com.greensock.TweenLite;
	import flash.events.MouseEvent;
	
	/**
	 * ...
	 * @author Pete Shand
	 */
	public class AwayTouchBehavior extends BaseTouchBehavior 
	{
		protected var touchObject:Entity;
		private var refID:String;
		
		public function AwayTouchBehavior(Begin:Function, Move:Function, End:Function, Over:Function, Out:Function, HoverClick:Function=null) 
		{
			super(Begin, Move, End, Over, Out, null, HoverClick);
		}
		
		public function addListenerTo(touchObject:Entity, iPickingCollider:IPickingCollider=null, useStageForRelease:Boolean=false):void
		{
			this.touchObject = touchObject;
			this.useStageForRelease = useStageForRelease;
			
			//if (!refID) refID = core.model.touchObjectReference.addAway(touchObject, Begin, Move, End);
			
			if (!iPickingCollider) iPickingCollider = PickingColliderType.BOUNDS_ONLY;
			touchObject.pickingCollider = iPickingCollider;
			touchObject.mouseEnabled = true;
			
			if (Begin != null)						touchObject.addEventListener(MouseEvent3D.MOUSE_DOWN, OnMouseEventDown);
			if (Move != null && !useStageForRelease)touchObject.addEventListener(MouseEvent3D.MOUSE_MOVE, OnMouseEventMove);
			if (End != null && !useStageForRelease)	touchObject.addEventListener(MouseEvent3D.MOUSE_UP, OnMouseEventUp);
			if (Over != null)						touchObject.addEventListener(MouseEvent3D.MOUSE_OVER, OnMouseEventOver);
			if (Out != null)						touchObject.addEventListener(MouseEvent3D.MOUSE_OUT, OnMouseEventOut);
			
			if (Begin != null)						touchObject.addEventListener(TouchEvent3D.TOUCH_BEGIN, OnTouchEventBegin);
			if (Move != null && !useStageForRelease)touchObject.addEventListener(TouchEvent3D.TOUCH_MOVE, OnTouchEventMove);
			if (End != null && !useStageForRelease)	touchObject.addEventListener(TouchEvent3D.TOUCH_END, OnTouchEventEnd);
			if (Over != null)						touchObject.addEventListener(TouchEvent3D.TOUCH_OVER, OnTouchEventOver);
			if (Out != null)						touchObject.addEventListener(TouchEvent3D.TOUCH_OUT, OnTouchEventOut);
			if (Out != null)						touchObject.addEventListener(TouchEvent3D.TOUCH_HOVER_CLICK, OnTouchEventHoverClick);
		}
		
		public function removeTouchListenerTo(removeTouchObject:Entity):void
		{
			removeTouchObject.removeEventListener(MouseEvent3D.MOUSE_DOWN, OnMouseEventDown);
			removeTouchObject.removeEventListener(MouseEvent3D.MOUSE_MOVE, OnMouseEventMove);
			removeTouchObject.removeEventListener(MouseEvent3D.MOUSE_UP, OnMouseEventUp);
			removeTouchObject.removeEventListener(MouseEvent3D.MOUSE_OVER, OnMouseEventOver);
			removeTouchObject.removeEventListener(MouseEvent3D.MOUSE_OUT, OnMouseEventOut);
			
			removeTouchObject.removeEventListener(TouchEvent3D.TOUCH_BEGIN, OnTouchEventBegin);
			removeTouchObject.removeEventListener(TouchEvent3D.TOUCH_MOVE, OnTouchEventMove);
			removeTouchObject.removeEventListener(TouchEvent3D.TOUCH_END, OnTouchEventEnd);
			removeTouchObject.removeEventListener(TouchEvent3D.TOUCH_OVER, OnTouchEventOver);
			removeTouchObject.removeEventListener(TouchEvent3D.TOUCH_OUT, OnTouchEventOut);
			removeTouchObject.removeEventListener(TouchEvent3D.TOUCH_HOVER_CLICK, OnTouchEventHoverClick);
		}
		
		///////////////////////////////////////////////////////////////////////////////////////////
		// Away3d mouse event listeners /////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////
		
		private function OnMouseEventDown(event:MouseEvent3D):void
		{
			if (active) {
				if (!pressCooldownActive) {
					if (useStageForRelease) {
						Blaze.stage.addEventListener(MouseEvent.MOUSE_UP, OnStageMouseUp);
						Blaze.stage.addEventListener(MouseEvent.MOUSE_MOVE, OnStageMouseMove);
					}
					
					if (active){
						TweenLite.delayedCall(cooldownTime, OnCooldownPressComplete);
						var touch:Touch = new Touch(0, event.screenX, event.screenY, TouchPhase.BEGAN, Entity(event.target));
						pressCooldownActive = true;
						//core.model.awayTouchRegister.Register(Begin, touch, refID);
						Begin(touch);
					}
				}
			}
		}
		
		private function OnMouseEventMove(event:MouseEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(0, event.screenX, event.screenY, TouchPhase.MOVED, Entity(event.target));
				//core.model.awayTouchRegister.Register(Move, touch, refID);
				Move(touch);
			}
		}
		
		private function OnMouseEventUp(event:MouseEvent3D):void
		{
			if (active){
				if (!releaseCooldownActive) {
					TweenLite.delayedCall(cooldownTime, OnCooldownReleaseComplete);
					var touch:Touch = new Touch(0, event.screenX, event.screenY, TouchPhase.ENDED, Entity(event.target));
					releaseCooldownActive = true;
					//core.model.awayTouchRegister.Register(End, touch, refID);
					End(touch);
				}
			}
		}
		
		private function OnMouseEventOver(event:MouseEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(0, event.screenX, event.screenY, TouchPhase.OVER, Entity(event.target));
				//core.model.awayTouchRegister.Register(Over, touch, refID);
				Over(touch);
			}
		}
		
		private function OnMouseEventOut(event:MouseEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(0, event.screenX, event.screenY, TouchPhase.OUT, Entity(event.target));
				//core.model.awayTouchRegister.Register(Out, touch, refID);
				Out(touch);
			}
		}
		
		///////////////////////////////////////////////////////////////////////////////////////////
		// Away3d touch event listeners /////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////
		
		protected function OnTouchEventBegin(event:TouchEvent3D):void
		{
			if (active) {
				if (useStageForRelease) {
					Blaze.stage.addEventListener(MouseEvent.MOUSE_UP, OnStageMouseUp);
					Blaze.stage.addEventListener(MouseEvent.MOUSE_MOVE, OnStageMouseMove);
				}
				var touch:Touch = new Touch(event.touchPointID, event.screenX, event.screenY, TouchPhase.BEGAN, Entity(event.target));
				//core.model.awayTouchRegister.Register(Begin, touch, refID);
				Begin(touch);
			}
		}
		
		protected function OnTouchEventMove(event:TouchEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(event.touchPointID, event.screenX, event.screenY, TouchPhase.MOVED, Entity(event.target));
				//core.model.awayTouchRegister.Register(Move, touch, refID);
				Move(touch);
			}
		}
		
		protected function OnTouchEventEnd(event:TouchEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(event.touchPointID, event.screenX, event.screenY, TouchPhase.ENDED, Entity(event.target));
				//core.model.awayTouchRegister.Register(End, touch, refID);
				End(touch);
			}
		}
		
		protected function OnTouchEventOver(event:TouchEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(event.touchPointID, event.screenX, event.screenY, TouchPhase.OVER, Entity(event.target));
				//core.model.awayTouchRegister.Register(Over, touch, refID);
				Over(touch);
			}
		}
		
		protected function OnTouchEventOut(event:TouchEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(event.touchPointID, event.screenX, event.screenY, TouchPhase.OUT, Entity(event.target));
				//core.model.awayTouchRegister.Register(Out, touch, refID);
				Out(touch);
			}
		}
		
		protected function OnTouchEventHoverClick(event:TouchEvent3D):void
		{
			if (active){
				var touch:Touch = new Touch(event.touchPointID, event.screenX, event.screenY, TouchPhase.HOVER_CLICK, Entity(event.target));
				//core.model.awayTouchRegister.Register(Out, touch, refID);
				HoverClick(touch);
			}
		}
		
		///////////////////////////////////////////////////////////////////////////////////////////
		// Stage Release listener /////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////
		
		private function OnStageMouseUp(event:MouseEvent):void 
		{
			if (active){
				if (!releaseCooldownActive) {
					if (useStageForRelease) {
						Blaze.stage.removeEventListener(MouseEvent.MOUSE_UP, OnStageMouseUp);
						Blaze.stage.removeEventListener(MouseEvent.MOUSE_MOVE, OnStageMouseMove);
					}
					
					TweenLite.delayedCall(cooldownTime, OnCooldownReleaseComplete);
					var touch:Touch = new Touch(0, event.stageX, event.stageY, TouchPhase.ENDED, Entity(touchObject));
					releaseCooldownActive = true;
					//core.model.awayTouchRegister.Register(End, touch, refID);
					End(touch);
				}
			}
		}
		
		private function OnStageMouseMove(event:MouseEvent):void 
		{
			if (active){
				var touch:Touch = new Touch(0, event.stageX, event.stageY, TouchPhase.MOVED, null);
				//core.model.awayTouchRegister.Register(Move, touch, refID);
				Move(touch);
			}
		}
	}
}