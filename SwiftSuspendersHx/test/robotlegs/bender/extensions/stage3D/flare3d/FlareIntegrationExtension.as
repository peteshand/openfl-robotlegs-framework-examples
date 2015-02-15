//------------------------------------------------------------------------------
//  Copyright (c) 2011 the original author or authors. All Rights Reserved.
// 

//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.flare3d
{
	import flare.basic.Viewer3D;
	import flash.net.registerClassAlias;
	import robotlegs.bender.extensions.contextView.ContextView;
	import robotlegs.bender.extensions.matching.instanceOfType;
	import robotlegs.bender.extensions.stage3D.flare3d.impl.FlareCollection;
	import robotlegs.bender.extensions.stage3D.flare3d.api.IFlare3DViewMap;
	import robotlegs.bender.extensions.stage3D.flare3d.impl.Flare3DInitializer;
	import robotlegs.bender.extensions.stage3D.flare3d.impl.Flare3DInitializerAvailable;
	import robotlegs.bender.extensions.stage3D.flare3d.impl.Flare3DViewMap;
	import robotlegs.bender.framework.api.IContext;
	import robotlegs.bender.framework.api.IExtension;
	import robotlegs.bender.framework.api.ILogger;
	import robotlegs.bender.framework.impl.UID;

	/**
	 * <p>This Extension will map all Starling view instances and Viewer3D instance in
	 * injector as well as create view maps for automatic mediation when instances are
	 * added on stage/scene.</p>
	 */
	public class FlareIntegrationExtension implements IExtension
	{

		/*============================================================================*/
		/* Private Properties                                                         */
		/*============================================================================*/

		/** Extension UID. **/
		private const _uid:String = UID.create(FlareIntegrationExtension);

		/** Context being initialized. **/
		private var _context:IContext;

		/** Logger used to log messaged when using this extension. **/
		private var _logger:ILogger;
		
		public function FlareIntegrationExtension() { }
		
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			trace("FlareIntegrationExtension");
			_context = context;
			_logger = context.getLogger(this);
			
			registerClassAlias("Flare3DInitializer", Flare3DInitializer);
			_context.injector.map(Flare3DInitializerAvailable).asSingleton();
			_context.addConfigHandler(instanceOfType(FlareCollection), handleFlareCollection);
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
		 * Map Viewer3D instance to injector and map and initialize Flare3D view map
		 * which will mediate display instances.
		 *
		 * @param view3D Viewer3D instance which will be used in context.
		 */
		private function handleFlareCollection(flareCollection:FlareCollection):void
		{
			_logger.debug("Mapping provided Viewer3D as Flare3D contextView...");
			_context.injector.map(FlareCollection).toValue(flareCollection);
			
			var key:String;
			for (key in flareCollection.items)
			{
				var view3D:Viewer3D = Viewer3D(flareCollection.items[key]);
				_context.injector.map(Viewer3D, key).toValue(view3D);
			}
			
			_context.injector.map(IFlare3DViewMap).toSingleton(Flare3DViewMap);
			_context.injector.getInstance(IFlare3DViewMap);
		}
	}
}
