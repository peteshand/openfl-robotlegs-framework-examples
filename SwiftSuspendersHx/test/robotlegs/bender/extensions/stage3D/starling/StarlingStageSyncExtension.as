//------------------------------------------------------------------------------
//  Copyright (c) 2012 the original author or authors. All Rights Reserved.
// 


//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.starling
{
	import flash.display.DisplayObjectContainer;
	import robotlegs.bender.extensions.matching.instanceOfType;
	import robotlegs.bender.extensions.contextView.ContextView;
	import robotlegs.bender.extensions.stage3D.starling.impl.StarlingCollection;
	import robotlegs.bender.framework.api.IContext;
	import robotlegs.bender.framework.api.IExtension;
	import robotlegs.bender.framework.api.ILogger;
	import robotlegs.bender.framework.impl.UID;
	import starling.core.Starling;
	import starling.events.Event;

	/**
	 * <p>This Extension waits for a DisplayObjectContainer to be added as a configuration,
	 * and all Starling view instances defined to be initialized. When all of them are ready,
	 * context is initialized. On the other hand losing reference to stage will destroy
	 * context.</p>
	 *
	 * <p>It should be installed before context initialization.</p>
	 */
	public class StarlingStageSyncExtension implements IExtension
	{

		/*============================================================================*/
		/* Private Properties                                                         */
		/*============================================================================*/

		/** Extension UID. **/
		private const _uid:String = UID.create(StarlingStageSyncExtension);

		/** Context being initialized. **/
		private var _context:IContext;

		/** Reference to regular view in Flash display list. **/
		private var _contextView:DisplayObjectContainer;

		/** Logger used to log messaged when using this extension. **/
		private var _logger:ILogger;

		/** Boolean indicating if context view is on stage. **/
		private var _contextReady:Boolean;

		/** Collection of Starling view instances. **/
		private var _starlingCollection:StarlingCollection;

		/** Number of Starling instances which are not initialized. **/
		private var _numStarlingsInQueue:int = 0;
		
		public function StarlingStageSyncExtension() { }
		
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			_context = context;
			_logger = context.getLogger(this);
			
			_context.addConfigHandler(instanceOfType(StarlingCollection), handleStarlingCollection);
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
		// Handling Starling
		//---------------------------------------------------------------

		/**
		 * Initialize all Starling view instances in collection.
		 *
		 * @param collection Collection of Starling view instances used in context.
		 */
		private function handleStarlingCollection(collection:StarlingCollection):void
		{
			if (_starlingCollection)
			{
				_logger.warn('A Starling collection has already been set, ignoring {0}', [collection]);
			}
			_starlingCollection = collection;
			_numStarlingsInQueue = collection.length;

			var s:Starling;
			for each (s in _starlingCollection.items)
			{
				handleStarlingContextView(s);
			}
		}

		/**
		 * Initialize Starling context view.
		 *
		 * @param currentStarling Starling view that needs to be initialized.
		 *
		 */
		private function handleStarlingContextView(currentStarling:Starling):void
		{
			if (currentStarling.stage.numChildren > 0)
			{
				initializeContext();
			}
			else
			{
				_logger.debug("Starling context view is not yet on stage. Waiting...");
				currentStarling.addEventListener(starling.events.Event.CONTEXT3D_CREATE, onContextCreated);
			}
		}

		/**
		 * Context view is ready so try to initialize context.
		 *
		 * @param event Context created for Starling view.
		 *
		 */
		private function onContextCreated(event:starling.events.Event):void
		{
			_logger.debug("Starling context view added on stage.");
			_numStarlingsInQueue--;

			initializeContext();
		}

		//---------------------------------------------------------------
		// Initialization
		//---------------------------------------------------------------

		/**
		 * Initialize context if default context view is ready and if
		 * all Starling view instances have their context prepared.
		 */
		private function initializeContext():void
		{
			// if all views are not on stage, postpone initialization
			if (_numStarlingsInQueue > 0)
				return;

			_logger.debug("Default and Starling context views are now on stage. Initializing context...");
			_context.initialize();
		}

	}
}
