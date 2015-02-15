package com.imag.core.behaviors.transition 
{
	import com.greensock.easing.Linear;
	import com.greensock.TweenLite;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class TransitionManager
	{
		public var showTime:Number = 1;
		public var showDelay:Number = 0;
		
		public var hideTime:Number = 1;
		public var hideDelay:Number = 0;
		
		protected var _value:Number = 0;
		public var change:Signal = new Signal();
		public var showing:Boolean = false;
		
		protected var transitionObjects:Vector.<TransitionObjects> = new Vector.<TransitionObjects>();
		protected var tween:TweenLite;
		protected var queuedFunction:Function;
		
		public var onShowStart:Function;
		public var onShowUpdate:Function;
		public var onShowComplete:Function;
		
		public var onHideStart:Function;
		public var onHideUpdate:Function;
		public var onHideComplete:Function;
		
		private var transitioningIn:Boolean = false;
		private var transitioningOut:Boolean = false;
		
		// --------------------------------------------------- //
		
		public function TransitionManager(showTime:Number=0.5, hideTime:Number=0.5, showDelay:Number=0, hideDelay:Number=0) 
		{
			this.showTime = showTime;
			this.hideTime = hideTime;
			this.showDelay = showDelay;
			this.hideDelay = hideDelay;
		}
		
		// --------------------------------------------------- //
		/* @param target Target object whose properties this tween affects. 
		*  @param start fraction, the point at which the properties of this function start to animate in relation to the whole transition.
		*  @param end fraction, the point at which the properties of this function finish animating in relation to the whole transition.
		*  @param vars An object defining the end value for each property that should be tweened as well as any special properties like 
		*  showEase - the type of ease to use on the show transition, 
		*  hideEase - the type of ease to use on the show transition
		*  autoVisible - whether or not the target's visible property should automatically be turned on and off
		*  @return void */
		
		public function add(target:Object, startFraction:Number=0, endFraction:Number=1, vars:Object=null):void 
		{
			getTransitionObject(target).add(startFraction, endFraction, vars);
			this.value = -1;
		}
		
		public function remove(target:Object, vars:Object=null):void 
		{
			if (vars) {
				getTransitionObject(target).remove(vars);
			}
			else {
				for (var i:int = 0; i < transitionObjects.length; i++) 
				{
					if (transitionObjects[i].target == target) {
						transitionObjects[i].dispose();
						transitionObjects[i] = null;
						transitionObjects.splice(i, 1);
					}
				}
			}
		}
		
		protected function getTransitionObject(target:Object):TransitionObjects 
		{
			for (var i:int = 0; i < transitionObjects.length; i++) 
			{
				if (transitionObjects[i].target == target) return transitionObjects[i];
			}
			var vars:TransitionObjects = new TransitionObjects(target);
			vars.target = target;
			transitionObjects.push(vars);
			return vars;
		}
		
		public function get value():Number 
		{
			return _value;
		}
		
		public function set value(value:Number):void 
		{
			_value = value;
			for (var i:int = 0; i < transitionObjects.length; i++) transitionObjects[i].update(value);
			change.dispatch();
		}
		
		protected function queue(func:Function):void 
		{
			queuedFunction = func;
		}
		
		// --------------------------------------------------- //
		
		public function Show():void
		{
			if (tween) {
				queue(Show);
				return;
			}
			if (showing) return;
			showing = true;
			
			this.value = -1;
			tween = TweenLite.to(this, showTime, { value:0, delay:showDelay, onStart:PrivateShowOnStart, onUpdate:PrivateShowOnUpdate, onComplete:PrivateShowOnComplete, ease:Linear.easeNone } );
			//tween.progress(value);
		}
		
		public function Hide():void
		{
			if (tween) {
				queue(Hide);
				return;
			}
			if (!showing) return;
			showing = false;
			
			tween = TweenLite.to(this, hideTime, { value:1, delay:hideDelay, onStart:PrivateHideOnStart, onUpdate:PrivateHideOnUpdate, onComplete:PrivateHideOnComplete, ease:Linear.easeNone } );
			//tween.progress(value);
		}
		
		// --------------------------------------------------- //
		
		private function PrivateShowOnStart():void 
		{
			transitioningIn = true;
			for (var i:int = 0; i < transitionObjects.length; i++) transitionObjects[i].showBegin();
			if (onShowStart != null) onShowStart();
		}
		
		private function PrivateShowOnUpdate():void 
		{
			if (onShowUpdate != null) onShowUpdate();
		}
		
		private function PrivateShowOnComplete():void 
		{
			transitioningIn = false;
			for (var i:int = 0; i < transitionObjects.length; i++) transitionObjects[i].showEnd();
			if (onShowComplete != null) onShowComplete();
			checkQueue();
		}
		
		// --------------------------------------------------- //
		
		private function PrivateHideOnStart():void 
		{
			transitioningOut = true;
			for (var i:int = 0; i < transitionObjects.length; i++) transitionObjects[i].hideBegin();
			if (onHideStart != null) onHideStart();
		}
		
		private function PrivateHideOnUpdate():void 
		{
			if (onHideUpdate != null) onHideUpdate();
		}
		
		private function PrivateHideOnComplete():void 
		{
			transitioningOut = false;
			for (var i:int = 0; i < transitionObjects.length; i++) transitionObjects[i].hideEnd();
			if (onHideComplete != null) onHideComplete();
			checkQueue();
		}
		
		private function checkQueue():void 
		{
			tween = null;
			if (queuedFunction != null) {
				
				// if already on final position, cancel and reset queue
				if (showing && queuedFunction == Show) {
					queuedFunction = null;
				}
				else if (!showing && queuedFunction == Hide) {
					queuedFunction = null;
				}
				else { 
					queuedFunction();
					queuedFunction = null;
				}
			}
		}
		
		// --------------------------------------------------- //
	}
}