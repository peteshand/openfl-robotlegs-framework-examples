package com.imag.core.behaviors.layout 
{
	import starling.display.DisplayObject;
	import starling.display.Sprite;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class StarlingContainer extends Sprite 
	{
		
		public function StarlingContainer(display:DisplayObject) 
		{
			super();
			var childIndex:int = display.parent.getChildIndex(display);
			display.parent.addChildAt(this, childIndex);
			this.addChild(display);
		}
	}
}