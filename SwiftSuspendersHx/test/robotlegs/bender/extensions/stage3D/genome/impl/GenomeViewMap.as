package robotlegs.bender.extensions.stage3D.genome.impl
{
	import com.genome2d.Genome2D;
	import flash.display.DisplayObject;
	import flash.events.Event;
	import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
	import robotlegs.bender.extensions.stage3D.base.api.IDisplayObject;
	import robotlegs.bender.extensions.stage3D.genome.api.IGenomeViewMap;
	
	/**
	 * The <code>GenomeViewMap</code> class performs managing Genome2D stage and 
	 * views automatic mediation. When view is added or removed from stage, it will
	 * automatically create or destroy its mediator.
	 */	
	public class GenomeViewMap implements IGenomeViewMap
	{
		/*============================================================================*/
		/* Public Properties                                                         */
		/*============================================================================*/
		
		[Inject]
		/** Collection of Genome2D views which will receive display objects. **/
		public var genomeCollection:GenomeCollection;
		
		[Inject]
		/** Map for mediating views. **/
		public var mediatorMap:IMediatorMap;
		
		/*============================================================================*/
		/* Constructor
		/*============================================================================*/
		public function GenomeViewMap() { }
		
		[PostConstruct]
		/**
		 * Initialize listeners on Genome2D views.
		 */		
		public function init():void
		{	
			// FIX
			/*var genome2D:Genome2D;
			
			for each (genome2D in genomeCollection.items) 
			{
				// listen for display object events
				genome2D.stage.addEventListener( Event.ADDED, onGenomeAdded );
				genome2D.stage.addEventListener( Event.REMOVED, onGenomeRemoved );
				
				// adds stage as view to allow a Genome2D Stage Mediator.
				genome2D.addEventListener( Event.ROOT_CREATED, onRootCreated );
			}*/
		}
		
		/*============================================================================*/
		/* Public Methods
		/*============================================================================*/
		
		/** @inheritDoc **/		
		public function addGenomeView(view : DisplayObject) : void
		{
			if (view is IDisplayObject)
				IDisplayObject(view).init();
			mediatorMap.mediate(view);
		}
		
		/** @inheritDoc **/		
		public function removeGenomeView(view : DisplayObject) : void
		{
			if (view is IDisplayObject)
				IDisplayObject(view).destroy();
			mediatorMap.unmediate(view);
		}
		
		/*============================================================================*/
		/* Private Methods
		/*============================================================================*/
		
		/**
		 * Handle Genome2D view added on display list.
		 * 
		 * @param event Genome2D view added on stage.
		 */		
		private function onGenomeAdded( event:Event ):void
		{
			addGenomeView( event.target as DisplayObject );
		}
		
		/**
		 * Handle Genome2D view removed from display list.
		 * 
		 * @param event Genome2D view removed from stage.
		 */		
		private function onGenomeRemoved( event:Event ):void
		{
			removeGenomeView( event.target as DisplayObject );
		}
		
		/**
		 * Add Genome2D stage to mediation.
		 * 
		 * @param event Genome2D had been initialized.
		 * 
		 */		
		private function onRootCreated( event:Event ):void
		{
			// FIX
			//Genome2D(event.target).removeEventListener( Event.ROOT_CREATED, onRootCreated );
			//addGenomeView( Genome2D(event.target).stage );
		}
	}
}