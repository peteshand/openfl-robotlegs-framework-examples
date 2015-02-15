//------------------------------------------------------------------------------
//  Copyright (c) 2011 the original author or authors. All Rights Reserved.
// 

//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.zest3d
{
	import flash.net.registerClassAlias;
	import robotlegs.bender.extensions.contextView.ContextView;
	import robotlegs.bender.extensions.matching.instanceOfType;
	import robotlegs.bender.extensions.stage3D.zest3d.api.IZest3DViewMap;
	import robotlegs.bender.extensions.stage3D.zest3d.impl.Zest3DInitializer;
	import robotlegs.bender.extensions.stage3D.zest3d.impl.Zest3DInitializerAvailable;
	import robotlegs.bender.extensions.stage3D.zest3d.impl.Zest3DViewMap;
	import robotlegs.bender.extensions.stage3D.zest3d.impl.ZestCollection;
	import robotlegs.bender.framework.api.IContext;
	import robotlegs.bender.framework.api.IExtension;
	import robotlegs.bender.framework.api.ILogger;
	import robotlegs.bender.framework.impl.UID;
	import zest3d.applications.Zest3DApplication;

	/**
	 * <p>This Extension will map all Starling view instances and Zest3DApplication instance in
	 * injector as well as create view maps for automatic mediation when instances are
	 * added on stage/scene.</p>
	 */
	public class ZestIntegrationExtension implements IExtension
	{

		/*============================================================================*/
		/* Private Properties                                                         */
		/*============================================================================*/

		/** Extension UID. **/
		private const _uid:String = UID.create(ZestIntegrationExtension);

		/** Context being initialized. **/
		private var _context:IContext;

		/** Logger used to log messaged when using this extension. **/
		private var _logger:ILogger;
		
		public function ZestIntegrationExtension() { }
		
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			trace("ZestIntegrationExtension");
			_context = context;
			_logger = context.getLogger(this);
			
			registerClassAlias("Zest3DInitializer", Zest3DInitializer);
			_context.injector.map(Zest3DInitializerAvailable).asSingleton();
			_context.addConfigHandler(instanceOfType(ZestCollection), handleZestCollection);
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
		 * Map Zest3DApplication instance to injector and map and initialize Zest3D view map
		 * which will mediate display instances.
		 *
		 * @param view3D Zest3DApplication instance which will be used in context.
		 */
		private function handleZestCollection(zestCollection:ZestCollection):void
		{
			_logger.debug("Mapping provided Zest3DApplication as Zest3D contextView...");
			_context.injector.map(ZestCollection).toValue(zestCollection);
			
			var key:String;
			for (key in zestCollection.items)
			{
				var view3D:Zest3DApplication = Zest3DApplication(zestCollection.items[key]);
				_context.injector.map(Zest3DApplication, key).toValue(view3D);
			}
			
			_context.injector.map(IZest3DViewMap).toSingleton(Zest3DViewMap);
			_context.injector.getInstance(IZest3DViewMap);
		}
	}
}
