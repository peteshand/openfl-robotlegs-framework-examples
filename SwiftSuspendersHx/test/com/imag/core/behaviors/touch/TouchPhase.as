package com.imag.core.behaviors.touch 
{
	import starling.events.TouchPhase;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class TouchPhase extends Object
	{
		public static const OVER:String = "over";
		public static const OUT:String = "out";
		
		public static const BEGAN : String = "began";
		public static const ENDED : String = "ended";
		public static const HOVER : String = "hover";
		public static const MOVED : String = "moved";
		public static const STATIONARY : String = "stationary";
		
		public function TouchPhase() 
		{
			super();
		}
	}
}