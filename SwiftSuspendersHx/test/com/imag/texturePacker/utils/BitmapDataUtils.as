package com.imag.texturePacker.utils 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.geom.Matrix;
	import flash.geom.Rectangle;
	import flash.text.StaticText;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class BitmapDataUtils 
	{
		static private var defaultBaseColour:uint = 0x00FF0000;
		
		public function BitmapDataUtils() 
		{
			
		}
		
		public static function fromDisplayObject(child:DisplayObject):BitmapData 
		{
			if (child is MovieClip) {
				return fromMovieClip(child as MovieClip);
			}
			else if (child is Bitmap) {
				return Bitmap(child).bitmapData;
			}
			else if (child is Sprite) {
				return fromSprite(child as Sprite);
			}
			else if (child is Shape) {
				return fromShape(child as Shape);
			}
			else if (child is StaticText) {
				return fromStaticText(child as StaticText);
			}
			/*else if (child is TLFTextField) {
				return fromTLFTextField(child as TLFTextField);
			}*/
			else {
				return null;
			}
		}
		
		private static function fromShape(child:Shape):BitmapData 
		{
			return displayObjectToBmd(child);
		}
		
		private static function fromMovieClip(child:MovieClip):BitmapData 
		{
			return displayObjectToBmd(child);
		}
		
		private static function fromSprite(child:Sprite):BitmapData 
		{
			return displayObjectToBmd(child);
		}
		
		private static function fromStaticText(child:StaticText):BitmapData 
		{
			return displayObjectToBmd(child);
		}
		
		/*private static function fromTLFTextField(child:TLFTextField):BitmapData 
		{
			return displayObjectToBmd(child);
		}*/
		
		private static function displayObjectToBmd(child:DisplayObject):BitmapData 
		{
			var bounds:Rectangle = child.getBounds(child);
			var returnBitmapData:BitmapData = new BitmapData(Math.ceil(bounds.width), Math.ceil(bounds.height), true, defaultBaseColour);
			var matrix:Matrix = new Matrix();
			matrix.tx = -bounds.x;
			matrix.ty = -bounds.y;
			returnBitmapData.draw(child, matrix, null, null, null, true);
			return returnBitmapData;
		}
	}
}