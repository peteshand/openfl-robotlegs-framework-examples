//------------------------------------------------------------------------------
//  Copyright (c) 2012 the original author or authors. All Rights Reserved.
// 


//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.genome
{
	import flash.display.DisplayObjectContainer;
	import robotlegs.bender.extensions.matching.instanceOfType;
	import robotlegs.bender.extensions.contextView.ContextView;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeCollection;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeLayer;
	import robotlegs.bender.framework.api.IContext;
	import robotlegs.bender.framework.api.IExtension;
	import robotlegs.bender.framework.api.ILogger;
	import robotlegs.bender.framework.impl.UID;
	
	/**
	 * <p>This Extension waits for a DisplayObjectContainer to be added as a configuration,
	 * and all Genome view instances defined to be initialized. When all of them are ready,
	 * context is initialized. On the other hand losing reference to stage will destroy
	 * context.</p>
	 *
	 * <p>It should be installed before context initialization.</p>
	 */
	public class GenomeStageSyncExtension implements IExtension
	{

		/*============================================================================*/
		/* Private Properties                                                         */
		/*============================================================================*/

		/** Extension UID. **/
		private const _uid:String = UID.create(GenomeStageSyncExtension);

		/** Context being initialized. **/
		private var _context:IContext;

		/** Reference to regular view in Flash display list. **/
		private var _contextView:DisplayObjectContainer;

		/** Logger used to log messaged when using this extension. **/
		private var _logger:ILogger;

		/** Boolean indicating if context view is on stage. **/
		private var _contextReady:Boolean;

		/** Collection of Genome view instances. **/
		private var _genomeCollection:GenomeCollection;

		/** Number of Genome instances which are not initialized. **/
		private var _numGenomesInQueue:int = 0;
		
		public function GenomeStageSyncExtension() { }
		
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			_context = context;
			_logger = context.getLogger(this);
			
			_context.addConfigHandler(instanceOfType(GenomeCollection), handleGenomeCollection);
		}

		/**
		 * Returns the string representation of the specified object.
		 */
		public function toString():String
		{
			return _uid;
		}

		/*============================================================================*/
		/* Private Functions                                                          */
		/*============================================================================*/

		//---------------------------------------------------------------
		// Handling Genome
		//---------------------------------------------------------------

		/**
		 * Initialize all Genome view instances in collection.
		 *
		 * @param collection Collection of Genome view instances used in context.
		 */
		private function handleGenomeCollection(collection:GenomeCollection):void
		{
			if (_genomeCollection)
			{
				_logger.warn('A Genome collection has already been set, ignoring {0}', [collection]);
			}
			_genomeCollection = collection;
			_numGenomesInQueue = collection.length;

			var genome2D:GenomeLayer;
			for each (genome2D in _genomeCollection.items)
			{
				handleGenomeContextView(genome2D);
			}
		}

		/**
		 * Initialize Genome context view.
		 *
		 * @param currentGenome Genome view that needs to be initialized.
		 *
		 */
		private function handleGenomeContextView(currentGenome:GenomeLayer):void
		{
			// FIX
			/*if (currentGenome.stage.numChildren > 0)
			{
				initializeContext();
			}
			else
			{
				_logger.debug("Genome context view is not yet on stage. Waiting...");
				currentGenome.addEventListener(starling.events.Event.CONTEXT3D_CREATE, onContextCreated);
			}*/
		}

		/**
		 * Context view is ready so try to initialize context.
		 *
		 * @param event Context created for Genome view.
		 *
		 */
		/*private function onContextCreated(event:starling.events.Event):void
		{
			_logger.debug("Genome context view added on stage.");
			_numGenomesInQueue--;

			initializeContext();
		}*/

		//---------------------------------------------------------------
		// Initialization
		//---------------------------------------------------------------

		/**
		 * Initialize context if default context view is ready and if
		 * all Genome view instances have their context prepared.
		 */
		private function initializeContext():void
		{
			// if all views are not on stage, postpone initialization
			if (_numGenomesInQueue > 0)
				return;

			_logger.debug("Default and Genome context views are now on stage. Initializing context...");
			_context.initialize();
		}

	}
}
