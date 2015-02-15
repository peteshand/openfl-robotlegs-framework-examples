package com.imag.texturePacker.starling 
{
	import starling.display.Sprite;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public dynamic class DynamicSprite extends Sprite 
	{
		public var atlasImages:Vector.<AtlasImage> = new Vector.<AtlasImage>();
		
		public function DynamicSprite() 
		{
			super();
			
		}
		
		override public function dispose():void
		{
			for (var i:int = 0; i < atlasImages.length; i++) 
			{
				atlasImages[i].dispose();
			}
			super.dispose();
			
		}
		
		public function releaseGPUMemory():void 
		{
			for (var i:int = 0; i < atlasImages.length; i++) 
			{
				atlasImages[i].releaseGPUMemory();
			}
		}
		
		public function allocateGPUMemory():void 
		{
			for (var i:int = 0; i < atlasImages.length; i++) 
			{
				atlasImages[i].allocateGPUMemory();
			}
		}
	}

}