//------------------------------------------------------------------------------
//  Copyright (c) 2011 the original author or authors. All Rights Reserved.
// 

//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.alternativa3d
{
	import flash.net.registerClassAlias;
	import robotlegs.bender.extensions.contextView.ContextView;
	import robotlegs.bender.extensions.matching.instanceOfType;
	import robotlegs.bender.framework.api.IContext;
	import robotlegs.bender.framework.api.IExtension;
	import robotlegs.bender.framework.api.ILogger;
	import robotlegs.bender.framework.impl.UID;

	/**
	 * <p>This Extension will map all Starling view instances and View3D instance in
	 * injector as well as create view maps for automatic mediation when instances are
	 * added on stage/scene.</p>
	 */
	public class AlternativaIntegrationExtension implements IExtension
	{

		/*============================================================================*/
		/* Private Properties                                                         */
		/*============================================================================*/

		/** Extension UID. **/
		private const _uid:String = UID.create(AlternativaIntegrationExtension);

		/** Context being initialized. **/
		private var _context:IContext;

		/** Logger used to log messaged when using this extension. **/
		private var _logger:ILogger;
		
		public function AlternativaIntegrationExtension() { }
		
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			trace("AlternativaIntegrationExtension");
			_context = context;
			_logger = context.getLogger(this);
			
			registerClassAlias("Alternativa3DInitializer", Alternativa3DInitializer);
			_context.injector.map(Alternativa3DInitializerAvailable).asSingleton();
			_context.addConfigHandler(instanceOfType(AlternativaCollection), handleAlternativaCollection);
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
		 * Map View3D instance to injector and map and initialize Alternativa3D view map
		 * which will mediate display instances.
		 *
		 * @param view3D View3D instance which will be used in context.
		 */
		private function handleAlternativaCollection(awayCollection:AlternativaCollection):void
		{
			_logger.debug("Mapping provided View3D as Alternativa3D contextView...");
			_context.injector.map(AlternativaCollection).toValue(awayCollection);
			
			var key:String;
			for (key in awayCollection.items)
			{
				var view3D:View3D = View3D(awayCollection.items[key]);
				_context.injector.map(View3D, key).toValue(view3D);
			}
			
			_context.injector.map(IAlternativa3DViewMap).toSingleton(Alternativa3DViewMap);
			_context.injector.getInstance(IAlternativa3DViewMap);
		}
	}
}
