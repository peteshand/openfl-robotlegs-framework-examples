package robotlegs.bender.extensions.stage3D.base.impl;

import openfl.errors.Error;
import org.swiftsuspenders.utils.CallProxy;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable;
import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
import robotlegs.bender.extensions.stage3D.base.api.IStack;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.ILogger;

/**
 * ...
 * @author P.J.Shand
 * 
 */
@:rtti 
class Stack implements IStack
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	private var _injector:IInjector;
	private var _logger:ILogger;
	private var context:IContext;
	private var _debug:Bool = false;
	private var classIDs:Array<Array<String>>;
	private var initialized:Bool = false;
	
	public var debug(get, set):Bool;
	
	@inject public var contextView:ContextView;
	@inject public var renderer:IRenderer;
	
	//@inject("optional=true") public var alternativa3DInitializerAvailable:Alternativa3DInitializerAvailable;
	@inject("optional=true") public var away3DInitializerAvailable:Away3DInitializerAvailable;
	//@inject("optional=true") public var fare3DInitializerAvailable:Flare3DInitializerAvailable;
	//@inject("optional=true") public var genomeInitializerAvailable:GenomeInitializerAvailable;
	//@inject("optional=true") public var starlingInitializerAvailable:StarlingInitializerAvailable;
	//@inject("optional=true") public var zest3DInitializerAvailable:Zest3DInitializerAvailable;
	
	public var alternativa3DInitializer:BaseInitializer;
	public var away3DInitializer:BaseInitializer;
	public var flare3DInitializer:BaseInitializer;
	public var genomeInitializer:BaseInitializer;
	public var starlingInitializer:BaseInitializer;
	public var zest3DInitializer:BaseInitializer;
	
	/*============================================================================*/
	/* Constructor                                                                */
	/*============================================================================*/
	public function new(context:IContext)
	{
		this.context = context;
		_injector = context.injector;
		_logger = context.getLogger(this);
		
		classIDs = new Array<Array<String>>();
		classIDs.push(["robotlegs.bender.extensions.stage3D.alternativa3d.impl", "AlternativaLayer"]);
		classIDs.push(["robotlegs.bender.extensions.stage3D.away3d.impl", "AwayLayer"]);
		classIDs.push(["robotlegs.bender.extensions.stage3D.flare3d.impl", "FlareLayer"]);
		classIDs.push(["robotlegs.bender.extensions.stage3D.genome.impl", "GenomeLayer"]);
		classIDs.push(["robotlegs.bender.extensions.stage3D.starling.impl", "StarlingLayer"]);
		classIDs.push(["robotlegs.bender.extensions.stage3D.zest3d.impl", "ZestLayer"]);
	}
	
	private function initialize():Void 
	{
		if (initialized) return;
		initialized = true;
		
		//alternativa3DInitializer = createInitializer("robotlegs.bender.extensions.alternativa3d.away3d.impl.Alternativa3DInitializer");
		away3DInitializer = createInitializer("robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializer");
		//flare3DInitializer = createInitializer("robotlegs.bender.extensions.stage3D.flare3d.impl.Flare3DInitializer");
		//genomeInitializer = createInitializer("robotlegs.bender.extensions.stage3D.genome.impl.GenomeInitializer");
		//starlingInitializer = createInitializer("robotlegs.bender.extensions.stage3D.starling.impl.StarlingInitializer");
		//zest3DInitializer = createInitializer("robotlegs.bender.extensions.stage3D.zest3d.impl.Zest3DInitializer");
	}
	
	private function createInitializer(classAlias:String):BaseInitializer 
	{
		var initializer:BaseInitializer;
		try {
			
			var InitializerClass:Class<Dynamic> = Type.resolveClass(classAlias);
			if (InitializerClass != null) {
				initializer = CallProxy.createInstance(InitializerClass, []);
				initializer.init(renderer, contextView, context);
				return initializer;
			}
			
		}
		catch (e:Error) {
			trace(e);
		}
		return null;
	}

	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/
	
	public function addLayer(LayerClass:Class<Dynamic>, id:String=""):Void
	{
		addLayerAt(LayerClass, -1, id);
	}
	
	public function addLayerAt(LayerClass:Class<Dynamic>, index:Int, id:String=""):Void
	{
		initialize();
		
		//	 if (isOfType(LayerClass, classIDs[0][0] + "::" + classIDs[0][1])) addAlternativa3DAt(LayerClass, index, id);
		/*else if (isOfType(LayerClass, classIDs[1][0] + "::" + classIDs[1][1]))*/ addAway3DAt(LayerClass, index, id);
		//else if (isOfType(LayerClass, classIDs[2][0] + "::" + classIDs[2][1])) addFlare3DAt(LayerClass, index, id);
		//else if (isOfType(LayerClass, classIDs[3][0] + "::" + classIDs[3][1])) addGenomeAt(LayerClass, index, id);
		//else if (isOfType(LayerClass, classIDs[4][0] + "::" + classIDs[4][1])) addStarlingAt(LayerClass, index, id);
		//else if (isOfType(LayerClass, classIDs[5][0] + "::" + classIDs[5][1])) addZest3DAt(LayerClass, index, id);
	}
	
	/*private function isOfType(LayerClass:Class, ClassName:String):Bool 
	{
		var layerTypeXML:XML = describeType(LayerClass);
		var len:Int = layerTypeXML.factory.extendsClass.length();
		for (i in 0...len) 
		//for (var i:Int = 0; i < len; i++) 
		{
			if (layerTypeXML.factory.extendsClass[i].@type == ClassName) return true;
		}
		return false;
	}*/
	
	/*============================================================================*/
	/* Private Functions                                                           */
	/*============================================================================*/
	
	/*private function addAlternativa3DAt(AlternativaClass:Class, index:Int, id:String=""):Void
	{
		if (starlingInitializerAvailable == null) {
			throw new Error(errorMsg(0));
			return;
		}
	}*/
	
	private function addAway3DAt(AwayClass:Class<Dynamic>, index:Int, id:String=""):Void
	{
		if (away3DInitializerAvailable == null) {
			throw new Error(errorMsg(1));
			return;
		}
		away3DInitializer.addLayer(AwayClass, index, id);
	}
	
	/*private function addFlare3DAt(FlareClass:Class, index:Int, id:String=""):Void
	{
		if (starlingInitializerAvailable == null) {
			throw new Error(errorMsg(2));
			return;
		}
	}
	
	private function addGenomeAt(GenomeClass:Class, index:Int, id:String=""):Void
	{
		if (genomeInitializerAvailable == null) {
			throw new Error(errorMsg(3));
			return;
		}
		genomeInitializer.addLayer(GenomeClass, index, id);
	}
	
	private function addStarlingAt(StarlingLayerClass:Class, index:Int, id:String=""):Void
	{
		if (starlingInitializerAvailable == null) {
			throw new Error(errorMsg(4));
			return;
		}
		starlingInitializer.addLayer(StarlingLayerClass, index, id);
	}
	
	private function addZest3DAt(ZestClass:Class, index:Int, id:String=""):Void
	{
		if (starlingInitializerAvailable == null) {
			throw new Error(errorMsg(5));
			return;
		}
		zest3DInitializer.addLayer(ZestClass, index, id);
	}*/
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	
	public function get_debug():Bool 
	{
		return _debug;
	}
	
	public function set_debug(value:Bool):Bool 
	{
		_debug = value;
		/*if (away3DInitializer)*/ away3DInitializer.debug = value;
		/*if (starlingInitializer) starlingInitializer.debug = value;
		if (genomeInitializer) genomeInitializer.debug = value;*/
		return value;
	}
	
	private function errorMsg(index:Int):String 
	{
		return "[" + classIDs[index][0] + "] needs to be installed before this method can be called, eg: context.install(" + classIDs[index][1] + ");";
	}	
}