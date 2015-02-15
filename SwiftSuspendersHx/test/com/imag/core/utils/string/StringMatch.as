package com.imag.core.utils.string 
{
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class StringMatch 
	{
		
		public function StringMatch() 
		{
			
		}
		
		public static function checkVec(base:String, vec:Vector.<String>):Boolean
		{
			for (var i:int = 0; i < vec.length; i++) 
			{
				if (vec[i] == base) return true;
			}
			return false;
		}
	}

}