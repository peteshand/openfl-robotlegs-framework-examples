// ------------------------------------------------------------------------------
// Copyright (c) 2011 the original author or authors. All Rights Reserved.
//
// NOTICE: You are permitted to use, modify, and distribute this file
// in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.zest3d.impl
{
	import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
	import robotlegs.bender.extensions.stage3D.base.api.IDisplayObject;
	import robotlegs.bender.extensions.stage3D.zest3d.api.IZest3DViewMap;
	import zest3d.applications.Zest3DApplication;
	import zest3d.scenegraph.Node;
	
	/**
	 * The <code>Zest3DViewMap</code> class performs managing Zest3D scene and 
	 * views automatic mediation. When view is added or removed from scene, it will
	 * automatically create or destroy its mediator.
	 */	
	public class Zest3DViewMap implements IZest3DViewMap	
	{
		/*============================================================================*/
		/* Public Properties                                                         */
		/*============================================================================*/
		
		//[Inject]
		/** Instance of View3D which contains scene receiving display objects. **/
		//public var view3D:View3D;
		
		[Inject]
		/** Collection of Starling views which will receive display objects. **/
		public var awayCollection:ZestCollection;
		
		[Inject]
		/** Map for mediating views. **/
		public var mediatorMap : IMediatorMap;
		
		/*============================================================================*/
		/* Constructor
		/*============================================================================*/
		public function Zest3DViewMap() { }
		
		[PostConstruct]
		/**
		 * Initialize listeners on Zest3D scene.
		 */		
		public function init() : void
		{
			var view3D:Zest3DApplication;
			
			for each (view3D in awayCollection.items) 
			{
				// listen for ObjectContainer3D events
				if (!view3D) continue;
				
				// FIX
				//view3D.scene.addEventListener( Scene3DEvent.ADDED_TO_SCENE, onSceneAdded );
				//view3D.scene.addEventListener( Scene3DEvent.REMOVED_FROM_SCENE, onSceneRemoved );

				// add scene as view to allow a Zest3D Scene Mediator
				// Note : we don't support swapping scenes now - one scene will do.
				//addZest3DView( view3D.scene );
			}
		}

		/*============================================================================*/
		/* Public Methods
		/*============================================================================*/
		
		/** @inheritDoc **/
		public function addZest3DView(view : *) : void
		{
			if( validateView(view))
			{
				if (view is IDisplayObject)
					IDisplayObject(view).init();
				mediatorMap.mediate(view);
			}
			else
				throw new Error("Not sure what to do with this view type..");
		}

		/** @inheritDoc **/
		public function removeZest3DView(view : *) : void
		{
			if (view is IDisplayObject)
				IDisplayObject(view).destroy();
			mediatorMap.unmediate(view);
		}

		/*============================================================================*/
		/* Private Methods
		/*============================================================================*/
		
		/**
		 * Validate if view added on scene is of type either <code>Scene3D</code> or 
		 * <code>ObjectContainer3D</code>, and this is required since <code>Scene3D</code> 
		 * doesn't extend <code>ObjectContainer3D</code>.
		 * 
		 * @param view View that needs to be validated.
		 * 
		 * @return Returns <code>true</code> if view is of valid type, or <code>false</code>
		 * otherwise.
		 */		
		private function validateView(view:*):Boolean
		{
			if( view is Node ){
				return true;
			}else
				return false;
		}
		
		/**
		 * Handle view added to scene.
		 * 
		 * @param event View added to scene.
		 */	
		// FIX
		/*private function onSceneAdded(event : Scene3DEvent) : void
		{
			addZest3DView(event.objectContainer3D);
		}*/
		
		/**
		 * Handle view removed from scene.
		 * 
		 * @param event View removed from scene.
		 */	
		// FIX
		/*private function onSceneRemoved(event : Scene3DEvent) : void
		{
			removeZest3DView(event.objectContainer3D);
		}*/
	}
}
