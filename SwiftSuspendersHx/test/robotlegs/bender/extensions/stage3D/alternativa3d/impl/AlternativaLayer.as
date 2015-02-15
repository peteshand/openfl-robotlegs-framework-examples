package robotlegs.bender.extensions.stage3D.alternativa3d.impl 
{
	import flash.events.Event;
	import flash.geom.Rectangle;
	import robotlegs.bender.extensions.stage3D.base.api.ILayer;
	import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class AlternativaLayer extends View3D implements ILayer
	{
		private var _iRenderer:IRenderer;
		
		public function AlternativaLayer() 
		{
			addEventListener(Event.ADDED_TO_STAGE, OnAdd);
		}
		
		private function OnAdd(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, OnAdd);
		}
		
		private function onContextCreated(e:Event):void 
		{
			//iRenderer.stage3D.context3D.
			//trace("onContextCreated");
			//trace(_iRenderer.stage3D.context3D);
			//trace(_stage3DProxy.context3D);
			//trace(_iRenderer.stage3D.context3D == _stage3DProxy.context3D);
			
		}
		
		public function update():void
		{
			//this.render();
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