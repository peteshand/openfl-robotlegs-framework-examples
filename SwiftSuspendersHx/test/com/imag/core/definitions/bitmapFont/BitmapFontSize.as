package com.imag.core.definitions.bitmapFont 
{
	/**
	 * ...
	 * @author ...
	 */
	public class BitmapFontSize 
	{
		public var size:int;
		protected var _name:String;
		
		public function BitmapFontSize(size:int, _name:String) 
		{
			this.size = size;
			this._name = _name;
		}
		
		public function get name():String 
		{
			return _name;
		}
	}
}