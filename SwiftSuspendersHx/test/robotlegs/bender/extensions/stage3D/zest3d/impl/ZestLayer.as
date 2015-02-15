package robotlegs.bender.extensions.stage3D.zest3d.impl 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.geom.Rectangle;
	import robotlegs.bender.extensions.stage3D.base.api.ILayer;
	import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
	import zest3d.applications.Zest3DApplication;
	import zest3d.geometry.SkyboxGeometry;
	import zest3d.scenegraph.Camera;
	import zest3d.scenegraph.Node;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ZestLayer extends Zest3DApplication implements ILayer
	{
		private var _iRenderer:IRenderer;
		
		public function ZestLayer() 
		{
			super();
			//addEventListener(Event.ADDED_TO_STAGE, OnAdd);
		}
		
		/*private function OnAdd(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, OnAdd);
			
		}*/
		
		override protected function onAddedToStage(e:Event):void 
		{
			if (stage.stage3Ds[ 0 ].context3D) {
				onContext3DCreated(null);
			}
			else {
				stage.stage3Ds[ 0 ].addEventListener(Event.CONTEXT3D_CREATE, onContext3DCreated );
			}
			trace("ZestLayer");
			//stage.stage3Ds[ 0 ].requestContext3D();
		}
		
		private function onContextCreated(e:Event):void 
		{
			
		}
		
		public function process():void
		{
			super.onIdle();
		}
		
		override protected function draw( appTime: Number ): void
		{
			//if ( _renderer.preDraw() )
			//{
				//_renderer.clearBuffers();
				
				if( skybox )
				{
					_renderer.drawVisual( skybox );
				}
				//TODO render prioritization so this can be done between solid and alpha blended geometry
				_renderer.drawVisibleSet( _culler.visibleSet );
				
				_numVisibleObjects = _culler.visibleSet.numVisible;
				//_renderer.postDraw();
				//_renderer.displayColorBuffer();
			//}
		}
		
		override public function onIdle():void 
		{
			
		}
		
		public function set rect(rect:Rectangle):void
		{
			/*this.x = rect.x;
			this.y = rect.y;
			this.width = rect.width;
			this.height = rect.height;*/
		}
		
		public function set iRenderer(value:IRenderer):void 
		{
			_iRenderer = value;
		}
	}
}