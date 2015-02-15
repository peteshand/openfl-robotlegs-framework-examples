//------------------------------------------------------------------------------
//  Copyright (c) 2011 the original author or authors. All Rights Reserved.
// 

//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.genome
{
	import flash.net.registerClassAlias;
	import robotlegs.bender.extensions.contextView.ContextView;
	import robotlegs.bender.extensions.matching.instanceOfType;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeCollection;
	import robotlegs.bender.extensions.stage3D.genome.api.IGenomeViewMap;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeInitializer;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeInitializerAvailable;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeViewMap;
	import robotlegs.bender.framework.api.IContext;
	import robotlegs.bender.framework.api.IExtension;
	import robotlegs.bender.framework.api.ILogger;
	import robotlegs.bender.framework.impl.UID;
	
	/**
	 * <p>This Extension will map all Genome view instances and View3D instance in
	 * injector as well as create view maps for automatic mediation when instances are
	 * added on stage/scene.</p>
	 */
	public class GenomeIntegrationExtension implements IExtension
	{
		/*============================================================================*/
		/* Private Properties                                                         */
		/*============================================================================*/

		/** Extension UID. **/
		private const _uid:String = UID.create(GenomeIntegrationExtension);

		/** Context being initialized. **/
		private var _context:IContext;

		/** Logger used to log messaged when using this extension. **/
		private var _logger:ILogger;
		
		public function GenomeIntegrationExtension() { }
		
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			trace("GenomeIntegrationExtension");
			_context = context;
			_logger = context.getLogger(this);
			
			registerClassAlias("GenomeInitializer", GenomeInitializer);
			_context.injector.map(GenomeInitializerAvailable).asSingleton();
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

		/**
		 * Map all Genome view instances to injector with their defined name and map
		 * and initialize Genome view map which will mediate display instances.
		 *
		 * @param collection Collection of Genome view instances used in context.
		 */
		private function handleGenomeCollection(genomeCollection:GenomeCollection):void
		{
			// FIX
			_logger.debug("Mapping provided Genome instances...");
			_context.injector.map(GenomeCollection).toValue(genomeCollection);
			
			/*var key:String;
			for (key in genomeCollection.items)
			{
				_context.injector.map(DisplayObjectContainer, key).toValue(Genome(genomeCollection.items[key]).stage);
			}*/
			
			_context.injector.map(IGenomeViewMap).toSingleton(GenomeViewMap);
			_context.injector.getInstance(IGenomeViewMap);
		}
	}
}
