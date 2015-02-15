package com.imag.texturePacker.starling {
	import starling.display.DisplayObject;
	
	/**
	 * ...
	 * @author Clinton Francis
	 */
	public class Alignment {
		public static const TOP_LEFT:uint = 0;
		public static const TOP_CENTER:uint = 1;
		public static const TOP_RIGHT:uint = 2;
		public static const CENTER_LEFT:uint = 3;
		public static const CENTER:uint = 4;
		public static const CENTER_RIGHT:uint = 5;
		public static const BOTTOM_LEFT:uint = 6 ;
		public static const BOTTOM_CENTER:uint = 7;
		public static const BOTTOM_RIGHT:uint = 8;
		
		public static function align(align:int, target:DisplayObject):void {
			switch (align) {
					case Alignment.TOP_LEFT:
						// Do nothing
					break;
					case Alignment.TOP_CENTER:
						target.x = -target.width / 2;
					break;
					case Alignment.TOP_RIGHT:
						target.x = -target.width;
					break;
					case Alignment.CENTER_LEFT:
						target.y = -target.height/2;
					break;
					case Alignment.CENTER:
						target.x = -target.width/2;
						target.y = -target.height/2;
					break;
					case Alignment.CENTER_RIGHT:
						target.x = -target.width;
						target.y = -target.height/2;
					break;
					case Alignment.BOTTOM_LEFT:
						target.y = -target.height;
					break;
					case Alignment.BOTTOM_CENTER:
						target.x = -target.width/2;
						target.y = -target.height;
					break;
					case Alignment.BOTTOM_RIGHT:
						target.x = -target.width;
						target.y = -target.height;
					break;
					default:
				}
		}
	}

}