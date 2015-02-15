package com.imag.core.behaviors.touch 
{
	import starling.display.DisplayObject;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class TouchBehavior 
	{
		static private var _instance:TouchBehavior;
		static private var touchBehaviorVecs:Vector.<TouchBehaviorVec> = new Vector.<TouchBehaviorVec>();
		static private var currentObject:TouchBehaviorVec;
		
		public function TouchBehavior() 
		{
			
		}
		
		static public function add(touchObject:DisplayObject):TouchBehavior 
		{
			TouchBehavior.currentObject = touchBehaviorObject(touchObject);
			return staticInstance;
		}
		
		static public function remove(touchObject:DisplayObject):void 
		{
			if (TouchBehavior.currentObject == touchBehaviorObject(touchObject)) {
				TouchBehavior.currentObject = null;
			}
			for (var i:int = 0; i < touchBehaviorVecs.length; i++) 
			{
				if (touchBehaviorVecs[i].touchObject == touchObject) {
					touchBehaviorVecs[i].dispose();
					touchBehaviorVecs.splice(i, 1);
				}
			}
		}
		
		static private function touchBehaviorObject(touchObject:DisplayObject):TouchBehaviorVec 
		{
			for (var i:int = 0; i < touchBehaviorVecs.length; i++) 
			{
				if (touchBehaviorVecs[i].touchObject == touchObject) {
					return touchBehaviorVecs[i];
				}
			}
			var touchBehaviorObject:TouchBehaviorVec = new TouchBehaviorVec(touchObject);
			touchBehaviorVecs.push(touchBehaviorObject);
			return touchBehaviorObject;
		}
		
		public function setBegin(callback:Function):TouchBehavior
		{
			if (!currentObjectSet) return instance;
			TouchBehavior.currentObject.onBegin = callback;
			return instance;
		}
		
		public function setMove(callback:Function):TouchBehavior
		{
			if (!currentObjectSet) return instance;
			TouchBehavior.currentObject.onMove = callback;
			return instance;
		}
		
		public function setEnd(callback:Function):TouchBehavior
		{
			if (!currentObjectSet) return instance;
			TouchBehavior.currentObject.onEnd = callback;
			return instance;
		}
		
		public function setOver(callback:Function):TouchBehavior
		{
			if (!currentObjectSet) return instance;
			TouchBehavior.currentObject.onOver = callback;
			return instance;
		}
		
		public function setOut(callback:Function):TouchBehavior
		{
			if (!currentObjectSet) return instance;
			TouchBehavior.currentObject.onOut = callback;
			return instance;
		}
		
		public function setHover(callback:Function):TouchBehavior
		{
			if (!currentObjectSet) return instance;
			TouchBehavior.currentObject.onHover = callback;
			return instance;
		}
		
		public function setStationary(callback:Function):TouchBehavior
		{
			if (!currentObjectSet) return instance;
			TouchBehavior.currentObject.onStationary = callback;
			return instance;
		}
		
		private function get currentObjectSet():Boolean 
		{
			if (TouchBehavior.currentObject) {
				return true;
			}
			throw new Error("No currentObject set, use TouchBehavior.add(displayObject) before calling this function");
			return false;
		}
		
		private function get instance():TouchBehavior 
		{
			if (!_instance) _instance = new TouchBehavior();
			return _instance;
		}
		
		private static function get staticInstance():TouchBehavior 
		{
			if (!_instance) _instance = new TouchBehavior();
			return _instance;
		}
	}

}