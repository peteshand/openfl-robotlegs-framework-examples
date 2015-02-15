package robotlegs.bender.extensions.stage3D.genome.impl 
{
	import com.genome2d.assets.GAssetManager;
	import com.genome2d.context.GContextConfig;
	import com.genome2d.Genome2D;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.geom.Rectangle;
	import robotlegs.bender.extensions.stage3D.base.api.ILayer;
	import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class GenomeLayer extends Sprite implements ILayer
	{
		private var _iRenderer:IRenderer;
		protected var genome:Genome2D;
		private var config:GContextConfig;
		private var delta:Number = 0;
		private var assetManager:GAssetManager;
		
		public function GenomeLayer() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, OnAdd);
		}
		
		private function OnAdd(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, OnAdd);
			
			genome = Genome2D.getInstance();
			genome.onInitialized.add(genomeInitializedHandler);
			
			// USE CORRECT VIEWPORT RECT
			config = new GContextConfig(stage, new Rectangle(0, 0, stage.stageWidth, stage.stageHeight));
			config.externalStage3D = _iRenderer.stage3D;
			genome.init(config);
			genome.autoUpdateAndRender = false;
		}
		
		private function genomeInitializedHandler():void {
			
		}
		
		
		
		public function update():void
		{
			if (genome) {
				genome.update(delta++);
				genome.render();
			}
		}
		
		public function set rect(rect:Rectangle):void
		{
			// FIX
			//genome.getContext().resize(rect);
		}
		
		public function set iRenderer(value:IRenderer):void 
		{
			_iRenderer = value;
		}
	}
}