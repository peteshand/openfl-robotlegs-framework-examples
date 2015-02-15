package com.imag.texturePacker 
{
	import flash.display.BitmapData;
	import flash.geom.Rectangle;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class BitmapAtlasAllocationObject extends Rectangle
	{
		public var id:String;
		public var bitmapData:BitmapData;
		public var area:int;
		
		public function BitmapAtlasAllocationObject() 
		{
			
		}
		
		public function clacArea():void 
		{
			area = width * height;
		}
	}
}