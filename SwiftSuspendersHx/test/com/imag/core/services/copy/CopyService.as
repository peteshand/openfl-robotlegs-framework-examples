package com.imag.core.services.copy
{
	import flash.filesystem.File;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class CopyService 
	{
		
		public function CopyService() 
		{
			
		}
		
		public function copy(source:File, destination:File, Override:Boolean=true):String 
		{
			trace("exists = " + destination.exists);
			if (!destination.exists || Override){
				source.copyTo(destination, Override);
				trace("override");
			}
			return destination.url;
		}
		
	}

}