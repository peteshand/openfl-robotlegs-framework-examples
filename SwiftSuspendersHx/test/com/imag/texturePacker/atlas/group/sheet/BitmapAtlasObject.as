package com.imag.texturePacker.atlas.group.sheet 
{
	import flash.display.BitmapData;
	import flash.geom.Matrix;
	import flash.geom.Rectangle;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class BitmapAtlasObject extends Rectangle
	{
		public var id:String;
		private var _matrix:Matrix;
		private var _bitmapAtlasSheet:BitmapAtlasSheet;
		public var updateSignal:Signal;
		public var bitmapData:BitmapData;
		private var _area:int;
		private var atlasImageIndices:Dictionary;
		
		public function BitmapAtlasObject() 
		{
			atlasImageIndices = new Dictionary(true);
		}
		
		public function dispose():void 
		{
			// throws error if texture is regenerated (because there is no bitmapdata)
			/*if (bitmapData){
				bitmapData.dispose();
				bitmapData = null;
			}*/
			if (bitmapAtlasSheet) {
				bitmapAtlasSheet.dispose();
				bitmapAtlasSheet = null;
			}
			if (updateSignal){
				updateSignal.dispatch();
				updateSignal = null;
			}
		}
		
		public function addAltasImageIndex(altasImageIndex:int):void 
		{
			atlasImageIndices[altasImageIndex] = true;
		}
		
		public function removeAltasImageIndex(altasImageIndex:int):void 
		{
			atlasImageIndices[altasImageIndex] = false
		}
		
		public function get atlasImageIndexCount():int
		{
			var count:int = 0;
			for each (var item:Boolean in atlasImageIndices) 
			{
				if (item == true) count++;
			}
			return count;
		}
		
		public function get matrix():Matrix 
		{
			_matrix = new Matrix();
			_matrix.tx = this.x;
			_matrix.ty = this.y;
			return _matrix;
		}
		
		public function get bitmapAtlasSheet():BitmapAtlasSheet 
		{
			return _bitmapAtlasSheet;
		}
		
		public function set bitmapAtlasSheet(value:BitmapAtlasSheet):void 
		{
			if (bitmapAtlasSheet) {
				bitmapAtlasSheet.updateSignal.remove(OnBitmapUpdate);
			}
			_bitmapAtlasSheet = value;
			if (bitmapAtlasSheet) {
				bitmapAtlasSheet.updateSignal.add(OnBitmapUpdate);
			}
		}
		
		public function get area():int 
		{
			return width * height;
		}
		
		private function OnBitmapUpdate():void 
		{
			if (updateSignal) {
				updateSignal.dispatch();
			}
		}
	}
}