package com.imag.texturePacker.atlas.group.sheet 
{
	import flash.geom.Rectangle;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class PlacementArea extends Rectangle
	{
		private var PADDING:int = 1;
		public var available:Boolean = true;
		public var placementAreas:Vector.<PlacementArea> = new Vector.<PlacementArea>();
		
		public function PlacementArea(x:int, y:int, width:int, height:int) 
		{
			super(x, y, width, height);
		}
		
		public function insert(bitmapAtlasObject:BitmapAtlasObject):void 
		{
			bitmapAtlasObject.x = this.x;
			bitmapAtlasObject.y = this.y;
			
			var placementArea1:PlacementArea;
			var placementArea2:PlacementArea;
			if (bitmapAtlasObject.width < bitmapAtlasObject.height){
				placementArea1 = new PlacementArea(this.x, this.y + bitmapAtlasObject.height + PADDING, this.width + PADDING, this.height - bitmapAtlasObject.height - PADDING);
				placementArea2 = new PlacementArea(this.x + bitmapAtlasObject.width + PADDING, this.y, this.width - bitmapAtlasObject.width - PADDING, bitmapAtlasObject.height + PADDING);
			}
			else {
				placementArea1 = new PlacementArea(this.x + bitmapAtlasObject.width + PADDING, this.y, this.width - bitmapAtlasObject.width - PADDING, this.height + PADDING);
				placementArea2 = new PlacementArea(this.x, this.y + bitmapAtlasObject.height + PADDING, bitmapAtlasObject.width + PADDING, this.height - bitmapAtlasObject.height - PADDING);
			}
			
			placementAreas.push(placementArea2);
			placementAreas.push(placementArea1);
		}
	}
}