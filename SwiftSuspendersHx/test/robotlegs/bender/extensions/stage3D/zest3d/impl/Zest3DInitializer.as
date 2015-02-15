package robotlegs.bender.extensions.stage3D.zest3d.impl 
{
	import robotlegs.bender.extensions.stage3D.zest3d.impl.ZestCollection;
	import robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class Zest3DInitializer extends BaseInitializer
	{
		
		public function Zest3DInitializer() 
		{
			
		}
		
		override public function addLayer(ViewClass:Class, index:int, id:String):void 
		{
			if (id == "") id = autoID(ViewClass);
			var zestLayer:ZestLayer = new ViewClass();
			zestLayer.iRenderer = renderer;
			
			context.configure(new ZestCollection([zestLayer, id]));
			contextView.view.addChild(zestLayer);
			
			if (index == -1) renderer.addLayer(zestLayer);
			else renderer.addLayerAt(zestLayer, index);
		}
	}
}