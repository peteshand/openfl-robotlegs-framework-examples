package com.imag.core.behaviors.layout 
{
	import flash.display.DisplayObject;
	import flash.display.Stage;
	import flash.events.Event;
	import flash.geom.Point;
	import starling.display.DisplayObject;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class LayoutObject 
	{
		private var stage:Stage;
		private var display:*;
		private var displaylistContainer:DisplaylistContainer;
		private var starlingContainer:StarlingContainer;
		private var container:*;
		
		public var stagePoint:Point = new Point();
		public var anchorPoint:Point = new Point();
		public var scale:Point = new Point( -1, -1);
		
		public function LayoutObject(display:*) 
		{
			this.display = display;
			
			if (!display.parent) return;
			if (display is flash.display.DisplayObject) {
				displaylistContainer = new DisplaylistContainer(display);
				container = displaylistContainer;
			}
			else if (display is starling.display.DisplayObject) {
				starlingContainer = new StarlingContainer(display);
				container = starlingContainer;
			}
			/*else if (display is ObjectContainer3D) {
				
			}*/
		}
		
		public function resize():void 
		{
			container.x = (LayoutManager.stage.stageWidth * stagePoint.x) - (display.width * anchorPoint.x);
			container.y = (LayoutManager.stage.stageHeight * stagePoint.y) - (display.height * anchorPoint.y);
			
			if (scale.x != -1) {
				container.scaleX = scale.x * LayoutManager.stage.stageWidth / display.width;
			}
			if (scale.y != -1) {
				container.scaleY = scale.y * LayoutManager.stage.stageHeight / display.height;
			}
		}
	}
}