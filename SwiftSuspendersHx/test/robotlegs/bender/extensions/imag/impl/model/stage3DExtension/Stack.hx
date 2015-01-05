package robotlegs.bender.extensions.imag.impl.model.stage3DExtension;

//import robotlegs.bender.extensions.away3d.impl.Away3DInitializer;
import openfl.errors.Error;
import robotlegs.bender.extensions.away3d.impl.Away3DInitializerAvailable;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.imag.api.model.stage3DExtension.IStack;
import robotlegs.bender.extensions.imag.api.services.stage3DExtension.IRenderer;
//import robotlegs.bender.extensions.starling.impl.StarlingInitializerAvailable;
//import robotlegs.bender.extensions.starling.impl.StarlingInitializer;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.ILogger;

/**
 * ...
 * @author P.J.Shand
 * 
 */
class Stack implements IStack
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	private var _injector:IInjector;
	private var _logger:ILogger;
	private var context:IContext;
	private var _debug:Bool = false;
	
	@inject public var contextView:ContextView;
	@inject public var renderer:IRenderer;
	
	@inject("optional=true") public var away3DInitializerAvailable:Away3DInitializerAvailable;
	//@inject("optional=true") public var starlingInitializerAvailable:StarlingInitializerAvailable;
	
	public var away3DInitializer:Dynamic;
	public var starlingInitializer:Dynamic;
	
	/*============================================================================*/
	/* Constructor                                                                */
	/*============================================================================*/
	public function Stack(context:IContext)
	{
		this.context = context;
		_injector = context.injector;
		_logger = context.getLogger(this);
		
		try {
			var Away3DInitializer:Class = Type.resolveClass("robotlegs.bender.extensions.away3d.impl.Away3DInitializer");
			if (Away3DInitializer) away3DInitializer = Type.createInstance(Away3DInitializer, []);
		}
		catch (e:Error) {
			
		}
		
		try {
			//var StarlingInitializer:Class = getClassByAlias("StarlingInitializer") as Class;
			//if (StarlingInitializer) starlingInitializer = new StarlingInitializer();
		}
		catch (e:Error) {
			
		}
	}

	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/
	
	public function addView3D(View3DClass:Class<Dynamic>, id:String=""):Void
	{
		addView3DAt(View3DClass, -1, id);
	}
	
	public function addView3DAt(View3DClass:Class<Dynamic>, index:Int, id:String=""):Void
	{
		trace("addView3D");
		if (away3DInitializerAvailable == null) {
			throw new Error("[robotlegs.bender.bundles.Away3DBundle] needs to be installed before this method can be called, eg: context.install(Away3DBundle);");
			return;
		}
		away3DInitializer.init(renderer, contextView, context);
		away3DInitializer.addView3D(View3DClass, index, id);
	}
	
	public function addStarling(StarlingLayerClass:Class<Dynamic>, id:String=""):Void
	{
		addStarlingAt(StarlingLayerClass, -1, id);
	}
	
	public function addStarlingAt(StarlingLayerClass:Class<Dynamic>, index:Int, id:String=""):Void
	{
		//trace("addStarling");
		//if (starlingInitializerAvailable == null) {
			throw new Error("[robotlegs.bender.bundles.StarlingBundle] needs to be installed before this method can be called, eg: context.install(StarlingBundle);");
			return;
		/*}
		starlingInitializer.init(renderer, contextView, context);
		starlingInitializer.addStarling(StarlingLayerClass, index, id);*/
	}
	
	/*public function addFlare3D(FlareLayerClass:Class, id:String=""):Void
	{
		//renderer.addLayer(_addFlare3D(FlareLayerClass, id));
	}
	
	public function addFlare3DAt(FlareLayerClass:Class, index:Int, id:String=""):Void
	{
		//renderer.addLayerAt(_addFlare3D(FlareLayerClass, id), index);
	}
	
	private function _addFlare3D(FlareLayerClass:Class, id:String):FlareLayer 
	{
		if (id == "") id = autoID(FlareLayerClass);
		//var flareLayer:FlareLayer = new FlareLayerClass(); // renderer.stage3DProxy, renderer.profile
		//renderer.addLayer(flareLayer);
		
		//context.configure(new FlareCollection([flareLayer, id]));
		//contextView.view.addChild(flareLayer);
		
		return null;// flareLayer;
	}*/
	
	
	public var debug(get, set):Bool;
	
	public function get_debug():Bool 
	{
		return _debug;
	}
	
	public function set_debug(value:Bool):Void 
	{
		_debug = value;
		if (away3DInitializer) away3DInitializer.debug = value;
		//if (starlingInitializer) starlingInitializer.debug = value;
	}
}