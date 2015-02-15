package robotlegs.bender.extensions.stage3D.starling.impl 
{
	import flash.geom.Rectangle;
	import robotlegs.bender.extensions.stage3D.base.api.ILayer;
	import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
	import starling.core.Starling;
	import starling.display.Sprite;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class StarlingLayer extends Sprite implements ILayer
	{
		private var _iRenderer:IRenderer;
		private var starling:Starling;
		
		public function StarlingLayer() 
		{
			super();
		}
		
		public function process():void
		{
			if (starling) starling.nextFrame();
		}
		
		public function setStarling(starling:Starling):void
		{
			this.starling = starling;
		}
		
		public function set rect(rect:Rectangle):void
		{
			starling.viewPort = rect;
			starling.stage.stageWidth = rect.width;
			starling.stage.stageHeight = rect.height;
			
		}
		
		public function set iRenderer(value:IRenderer):void 
		{
			_iRenderer = value;
		}
	}
}