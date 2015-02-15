package com.imag.core.behaviors.layout 
{
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class DisplaylistContainer extends Sprite 
	{
		
		public function DisplaylistContainer(display:DisplayObject) 
		{
			super();
			var childIndex:int = display.parent.getChildIndex(display);
			display.parent.addChildAt(this, childIndex);
			this.addChild(display);
		}
	}
}