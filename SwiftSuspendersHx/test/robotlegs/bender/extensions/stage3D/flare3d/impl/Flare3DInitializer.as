package robotlegs.bender.extensions.stage3D.flare3d.impl 
{
	import robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer;
	import robotlegs.bender.extensions.stage3D.flare3d.impl.FlareCollection;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class Flare3DInitializer extends BaseInitializer
	{
		
		public function Flare3DInitializer() 
		{
			
		}
		
		public function addView3D(Viewer3DClass:Class, index:int, id:String):void 
		{
			if (id == "") id = autoID(Viewer3DClass);
			var flareLayer:FlareLayer = new Viewer3DClass();
			renderer.addLayer(flareLayer);
			
			context.configure(new FlareCollection([flareLayer, id]));
			contextView.view.addChild(flareLayer);
			
			if (index == -1) renderer.addLayer(flareLayer);
			else renderer.addLayerAt(flareLayer, index);
		}
	}
}