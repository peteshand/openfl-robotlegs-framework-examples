package com.imag.core.definitions.bitmapFont 
{
	/**
	 * ...
	 * @author ...
	 */
	public class BitmapFontContainer 
	{
		protected var fontSizes:Vector.<BitmapFontSize> = new Vector.<BitmapFontSize>();
		
		public function BitmapFontContainer() 
		{
			
		}
		
		protected function addSize(bitmapFontSize:BitmapFontSize):BitmapFontSize 
		{
			fontSizes.push(bitmapFontSize);
			return bitmapFontSize;
		}
		
		public function name(size:int):String 
		{
			var index:int = 0;
			var lowestDif:Number = Infinity;
			for (var i:int = 0; i < fontSizes.length; i++) 
			{
				var dif:int = Math.abs(fontSizes[i].size - size);
				if (dif < lowestDif) {
					index = i;
					lowestDif = dif;
				}
			}
			return fontSizes[index].name;
		}
	}
}