// ------------------------------------------------------------------------------
// Copyright (c) 2011 the original author or authors. All Rights Reserved.
//
// NOTICE: You are permitted to use, modify, and distribute this file
// in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

package robotlegs.bender.extensions.stage3D.alternativa3d.impl
{
	import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
	import robotlegs.bender.extensions.stage3D.base.api.IDisplayObject;
	
	/**
	 * The <code>Alternativa3DViewMap</code> class performs managing Alternativa3D scene and 
	 * views automatic mediation. When view is added or removed from scene, it will
	 * automatically create or destroy its mediator.
	 */	
	public class Alternativa3DViewMap implements IAlternativa3DViewMap	
	{
		/*============================================================================*/
		/* Public Properties                                                         */
		/*============================================================================*/
		
		//[Inject]
		/** Instance of View3D which contains scene receiving display objects. **/
		//public var view3D:View3D;
		
		[Inject]
		/** Collection of Starling views which will receive display objects. **/
		public var awayCollection:AlternativaCollection;
		
		[Inject]
		/** Map for mediating views. **/
		public var mediatorMap : IMediatorMap;
		
		/*============================================================================*/
		/* Constructor
		/*============================================================================*/
		public function Alternativa3DViewMap() { }
		
		[PostConstruct]
		/**
		 * Initialize listeners on Alternativa3D scene.
		 */		
		public function init() : void
		{
			var view3D:View3D;
			
			for each (view3D in awayCollection.items) 
			{
				// listen for ObjectContainer3D events
				if (!view3D) continue;
				view3D.scene.addEventListener( Scene3DEvent.ADDED_TO_SCENE, onSceneAdded );
				view3D.scene.addEventListener( Scene3DEvent.REMOVED_FROM_SCENE, onSceneRemoved );

				// add scene as view to allow a Alternativa3D Scene Mediator
				// Note : we don't support swapping scenes now - one scene will do.
				addAlternativa3DView( view3D.scene );
			}
		}

		/*============================================================================*/
		/* Public Methods
		/*============================================================================*/
		
		/** @inheritDoc **/
		public function addAlternativa3DView(view : *) : void
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
		public function removeAlternativa3DView(view : *) : void
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
			if( view is Scene3D || view is ObjectContainer3D ){
				return true;
			}else
				return false;
		}
		
		/**
		 * Handle view added to scene.
		 * 
		 * @param event View added to scene.
		 */	
		private function onSceneAdded(event : Scene3DEvent) : void
		{
			addAlternativa3DView(event.objectContainer3D);
		}
		
		/**
		 * Handle view removed from scene.
		 * 
		 * @param event View removed from scene.
		 */	
		private function onSceneRemoved(event : Scene3DEvent) : void
		{
			removeAlternativa3DView(event.objectContainer3D);
		}
	}
}
