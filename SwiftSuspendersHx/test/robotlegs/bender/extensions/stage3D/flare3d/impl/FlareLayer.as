package robotlegs.bender.extensions.stage3D.flare3d.impl 
{
	import flare.basic.Viewer3D;
	import flash.display.Sprite;
	import flash.geom.Rectangle;
	import robotlegs.bender.extensions.stage3D.base.api.ILayer;
	import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class FlareLayer extends Sprite implements ILayer
	{
		private var scene:Viewer3D;
		private var _iRenderer:IRenderer;
		
		public function FlareLayer() 
		{
			// creates a new 3d scene.
			scene = new Viewer3D( this );
			//scene.autoResize = true;
			scene.stop();
		}
		
		public function update():void
		{
			//scene.update();
			scene.render();
		}
		
		public function set rect(rect:Rectangle):void
		{
			scene.setViewport(rect.x, rect.y, rect.width, rect.height);
		}
		
		public function set iRenderer(value:IRenderer):void 
		{
			_iRenderer = value;
		}
	}
}