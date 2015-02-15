package robotlegs.bender.extensions.stage3D.genome.impl 
{
	import robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeCollection;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class GenomeInitializer extends BaseInitializer 
	{
		
		public function GenomeInitializer() 
		{
			
		}
		
		override public function addLayer(ViewClass:Class, index:int, id:String):void 
		{
			if (id == "") id = autoID(ViewClass);
			var genomeLayer:GenomeLayer = new ViewClass();
			genomeLayer.iRenderer = renderer;
			
			context.configure(new GenomeCollection([genomeLayer, id]));
			contextView.view.addChild(genomeLayer);
			
			if (index == -1) renderer.addLayer(genomeLayer);
			else renderer.addLayerAt(genomeLayer, index);
		}
	}
}