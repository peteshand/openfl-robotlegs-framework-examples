package com.imag.core.behaviors.layout 
{
	import flash.display.DisplayObject;
	import flash.geom.Point;
	import starling.display.DisplayObject;
	import starling.text.TextField;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class LayoutAttachment 
	{
		private var display:*;
		private var displaylistContainer:DisplaylistContainer;
		private var starlingContainer:StarlingContainer;
		private var container:*;
		private var attachBase:*;
		
		private var basePosition:Point = new Point();
		private var attachPoint:Point = new Point(0.5, 0.5);
		private var anchorPoint:Point = new Point(0.5, 0.5);
		
		public function LayoutAttachment(display:*) 
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
		}
		
		public function to(attachBase:*):LayoutAttachment 
		{
			this.attachBase = attachBase;
			return this;
		}
		
		public function withAlignment(attachAlignment:String, anchorAlignment:String=null):LayoutAttachment 
		{
			var attachPoint:Point;
			if (attachAlignment == LayoutManager.TOP_LEFT) attachPoint = new Point(0, 0);
			else if (attachAlignment == LayoutManager.TOP) attachPoint = new Point(0.5, 0);
			else if (attachAlignment == LayoutManager.TOP_RIGHT) attachPoint = new Point(1, 0);
			else if (attachAlignment == LayoutManager.LEFT) attachPoint = new Point(0, 0.5);
			else if (attachAlignment == LayoutManager.MIDDLE) attachPoint = new Point(0.5, 0.5);
			else if (attachAlignment == LayoutManager.RIGHT) attachPoint = new Point(1, 0.5);
			else if (attachAlignment == LayoutManager.BOTTOM_LEFT) attachPoint = new Point(0, 1);
			else if (attachAlignment == LayoutManager.BOTTOM) attachPoint = new Point(0.5, 1);
			else if (attachAlignment == LayoutManager.BOTTOM_RIGHT) attachPoint = new Point(1, 1);
			
			var anchorPoint:Point;
			if (anchorAlignment == LayoutManager.TOP_LEFT) anchorPoint = new Point(0, 0);
			else if (anchorAlignment == LayoutManager.TOP) anchorPoint = new Point(0.5, 0);
			else if (anchorAlignment == LayoutManager.TOP_RIGHT) anchorPoint = new Point(1, 0);
			else if (anchorAlignment == LayoutManager.LEFT) anchorPoint = new Point(0, 0.5);
			else if (anchorAlignment == LayoutManager.MIDDLE) anchorPoint = new Point(0.5, 0.5);
			else if (anchorAlignment == LayoutManager.RIGHT) anchorPoint = new Point(1, 0.5);
			else if (anchorAlignment == LayoutManager.BOTTOM_LEFT) anchorPoint = new Point(0, 1);
			else if (anchorAlignment == LayoutManager.BOTTOM) anchorPoint = new Point(0.5, 1);
			else if (anchorAlignment == LayoutManager.BOTTOM_RIGHT) anchorPoint = new Point(1, 1);
			
			return withPoint(attachPoint, anchorPoint);
		}
		
		public function withPoint(attachPoint:Point, anchorPoint:Point=null):LayoutAttachment 
		{
			this.attachPoint = attachPoint;
			this.anchorPoint = anchorPoint;
			if (!this.anchorPoint) this.anchorPoint = new Point(1 - attachPoint.x, 1 - attachPoint.y);
			
			return this;
		}
		
		public function resize():void 
		{
			basePosition.setTo(attachBase.parent.x, attachBase.parent.y)
			
			/*basePosition.setTo(attachBase.x, attachBase.y);
			if (attachBase is flash.display.DisplayObject) {
				basePosition = flash.display.DisplayObject(attachBase).localToGlobal(basePosition);
			}
			else if (attachBase is starling.display.DisplayObject) {
				basePosition = starling.display.DisplayObject(attachBase).localToGlobal(basePosition);
			}*/
			container.x = basePosition.x + (attachPoint.x * attachBase.width) - (anchorPoint.x * display.width);
			container.y = basePosition.y + (attachPoint.y * attachBase.height) + (anchorPoint.y * display.height);
			
			trace(attachBase.parent.y);
		}
	}
}