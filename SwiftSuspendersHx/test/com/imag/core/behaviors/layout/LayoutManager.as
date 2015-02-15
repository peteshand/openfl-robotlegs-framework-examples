package com.imag.core.behaviors.layout 
{
	import com.imag.texturePacker.starling.AtlasImage;
	import flash.display.Stage;
	import flash.events.Event;
	import flash.geom.Point;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;
	import starling.core.Starling;
	import starling.display.Image;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class LayoutManager 
	{
		public static var stage:Stage;
		
		public static const TOP_LEFT:String = 'tl';
		public static const TOP:String = 't';
		public static const TOP_RIGHT:String = 'tr';
		public static const LEFT:String = 'l';
		public static const MIDDLE:String = 'm';
		public static const RIGHT:String = 'r';
		public static const BOTTOM_LEFT:String = 'bl';
		public static const BOTTOM:String = 'b';
		public static const BOTTOM_RIGHT:String = 'br';
		
		private var layoutObjects:Dictionary = new Dictionary();
		private var layoutAttachments:Dictionary = new Dictionary();
		
		
		
		
		public var onResize:Signal = new Signal();
		private var resizeCount:int = 0;
		private var maxResizes:int = 4;
		
		public function LayoutManager() 
		{
			if (!LayoutManager.stage) {
				LayoutManager.stage = Starling.current.nativeStage;
				//throw new Error("LayoutManager.stage must first be set");
			}
			LayoutManager.stage.addEventListener(Event.RESIZE, OnResize);
		}
		
		public function resize():void
		{
			ResizeUpdate(null);
		}
		
		private function OnResize(e:Event):void 
		{
			resizeCount = 0;
			LayoutManager.stage.addEventListener(Event.ENTER_FRAME, ResizeUpdate);
			ResizeUpdate(null);
		}
		
		private function ResizeUpdate(e:Event):void 
		{
			resizeCount++;
			if (resizeCount > maxResizes) {
				LayoutManager.stage.removeEventListener(Event.ENTER_FRAME, ResizeUpdate);
			}
			onResize.dispatch();
			for each (var layoutObject:LayoutObject in layoutObjects) 
			{
				layoutObject.resize();
			}
			for each (var layoutAttachment:LayoutAttachment in layoutAttachments) 
			{
				layoutAttachment.resize();
			}
		}
		
		public function addAtAlignment(display:*, stageAlignment:String, anchorAlignment:String=null):LayoutObject 
		{
			if (!stageAlignment && !anchorAlignment) {
				throw new Error("[LayoutManager] No alignments set");
				return null;
			}
			
			var stagePoint:Point;
			var anchorPoint:Point;
			
			if (stageAlignment == LayoutManager.TOP_LEFT) stagePoint = new Point(0, 0);
			else if (stageAlignment == LayoutManager.TOP) stagePoint = new Point(0.5, 0);
			else if (stageAlignment == LayoutManager.TOP_RIGHT) stagePoint = new Point(1, 0);
			else if (stageAlignment == LayoutManager.LEFT) stagePoint = new Point(0, 0.5);
			else if (stageAlignment == LayoutManager.MIDDLE) stagePoint = new Point(0.5, 0.5);
			else if (stageAlignment == LayoutManager.RIGHT) stagePoint = new Point(1, 0.5);
			else if (stageAlignment == LayoutManager.BOTTOM_LEFT) stagePoint = new Point(0, 1);
			else if (stageAlignment == LayoutManager.BOTTOM) stagePoint = new Point(0.5, 1);
			else if (stageAlignment == LayoutManager.BOTTOM_RIGHT) stagePoint = new Point(1, 1);
			
			if (!anchorAlignment) anchorAlignment = stageAlignment;
			
			if (anchorAlignment == LayoutManager.TOP_LEFT) anchorPoint = new Point(0, 0);
			else if (anchorAlignment == LayoutManager.TOP) anchorPoint = new Point(0.5, 0);
			else if (anchorAlignment == LayoutManager.TOP_RIGHT) anchorPoint = new Point(1, 0);
			else if (anchorAlignment == LayoutManager.LEFT) anchorPoint = new Point(0, 0.5);
			else if (anchorAlignment == LayoutManager.MIDDLE) anchorPoint = new Point(0.5, 0.5);
			else if (anchorAlignment == LayoutManager.RIGHT) anchorPoint = new Point(1, 0.5);
			else if (anchorAlignment == LayoutManager.BOTTOM_LEFT) anchorPoint = new Point(0, 1);
			else if (anchorAlignment == LayoutManager.BOTTOM) anchorPoint = new Point(0.5, 1);
			else if (anchorAlignment == LayoutManager.BOTTOM_RIGHT) anchorPoint = new Point(1, 1);
			
			return addAtPoint(display, stagePoint, anchorPoint);
		}
		
		public function addAtPoint(display:*, stagePoint:Point, anchorPoint:Point=null):LayoutObject 
		{
			var layoutObject:LayoutObject = layoutObject(display);
			layoutObject.stagePoint = stagePoint;
			if (anchorPoint) layoutObject.anchorPoint = anchorPoint;
			else layoutObject.anchorPoint.setTo(stagePoint.x, stagePoint.y);
			layoutObject.resize();
			return layoutObject;
		}
		
		public function attach(display:*):LayoutAttachment 
		{
			var layoutObject:LayoutAttachment = layoutAttachment(display);
			return layoutObject;
		}
		
		private function layoutObject(display:*):LayoutObject 
		{
			if (!layoutObjects[display]) {
				layoutObjects[display] = new LayoutObject(display);
			}
			return LayoutObject(layoutObjects[display]);
		}
		
		private function layoutAttachment(display:*):LayoutAttachment 
		{
			if (!layoutAttachments[display]) {
				layoutAttachments[display] = new LayoutAttachment(display);
			}
			return LayoutAttachment(layoutAttachments[display]);
		}
		
		
	}
}