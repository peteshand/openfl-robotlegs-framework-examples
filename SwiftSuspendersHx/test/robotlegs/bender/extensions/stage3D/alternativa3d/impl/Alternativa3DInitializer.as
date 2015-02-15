package robotlegs.bender.extensions.stage3D.alternativa3d.impl 
{
	import robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class Alternativa3DInitializer extends BaseInitializer
	{
		
		public function Alternativa3DInitializer() 
		{
			
		}
		
		public function addView3D(View3DClass:Class, index:int, id:String):void 
		{
			if (id == "") id = autoID(View3DClass);
			var awayLayer:AlternativaLayer = new View3DClass(/*renderer.stage3DProxy, */renderer.profile);
			awayLayer.iRenderer = renderer;
			
			context.configure(new AlternativaCollection([awayLayer, id]));
			contextView.view.addChild(awayLayer);
			
			if (index == -1) renderer.addLayer(awayLayer);
			else renderer.addLayerAt(awayLayer, index);
		}
	}
}