package robotlegs.bender.extensions.away3d.impl.;

import flash.utils.describeType;
import robotlegs.bender.extensions.away3d.api.AwayCollection;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.imag.api.services.stage3DExtension.IRenderer;
import robotlegs.bender.framework.api.IContext;
/**
 * ...
 * @author P.J.Shand
 */
class Away3DInitializer 
{
	public var renderer:IRenderer;
	public var contextView:ContextView;
	public var context:IContext;
	private var _debug:Bool = false;
	
	public function Away3DInitializer() 
	{
		
	}
	
	public function init(renderer:IRenderer, contextView:ContextView, context:IContext):Void
	{
		this.renderer = renderer;
		this.contextView = contextView;
		this.context = context;
	}
	
	public function addView3D(View3DClass:Class, index:Int, id:String):Void 
	{
		if (id == "") id = autoID(View3DClass);
		var awayLayer:AwayLayer = new View3DClass(renderer.stage3DProxy, renderer.profile);
		renderer.addLayer(awayLayer);
		
		context.configure(new AwayCollection([awayLayer, id]));
		contextView.view.addChild(awayLayer);
		
		if (index == -1) renderer.addLayer(awayLayer);
		else renderer.addLayerAt(awayLayer, index);
	}
	
	private function autoID(ClassName:Class):String 
	{
		var xml:XML = describeType(ClassName);
		var className:String = xml.@name;
		if (className.indexOf("::") == -1) return className;
		else return className.split("::")[1];
	}
	
	public function set debug(value:Bool):Void 
	{
		_debug = value;
	}
}