package robotlegs.bender.extensions.stage3D.starling.impl 
{
	import flash.geom.Rectangle;
	import flash.system.Capabilities;
	import robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer;
	import robotlegs.bender.extensions.stage3D.starling.impl.StarlingCollection;
	import starling.core.Starling;
	import starling.events.Event;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class StarlingInitializer extends BaseInitializer
	{
		public function StarlingInitializer() 
		{
			
		}
		
		override public function addLayer(ViewClass:Class, index:int, id:String):void 
		{
			var viewRectangle:Rectangle = new Rectangle(0,0, contextView.view.stage.stageWidth, contextView.view.stage.stageHeight);
			if (id == "") id = autoID(ViewClass);
			
			Starling.multitouchEnabled = true; // for Multitouch Scene
            Starling.handleLostContext = true; // recommended everwhere when using AssetManager
            
            var starling:Starling = new Starling(ViewClass, contextView.view.stage, viewRectangle, renderer.stage3D, "auto", renderer.profile);
            starling.simulateMultitouch = true;
            starling.enableErrorChecking = Capabilities.isDebugger;
            starling.shareContext = true;
			starling.start();
			
			if (debug) starling.showStats = true;
			
			trace("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
			
			context.configure(new StarlingCollection([starling, id]));
			
			starling.addEventListener(Event.ROOT_CREATED, onStarlingReady);
			
			function onStarlingReady(e:Event):void 
			{
				var starling:Starling = Starling(e.target);
				var layer:StarlingLayer = starling.root as StarlingLayer;
				layer.setStarling(starling);
				if (index == -1) renderer.addLayer(layer);
				else renderer.addLayerAt(layer, index);
			}
		}
	}
}