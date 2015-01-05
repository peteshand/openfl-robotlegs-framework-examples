package robotlegs.bender.extensions.imag.api.model.stage3DExtension;

import flash.display.DisplayObjectContainer;
/**
 * ...
 * @author P.J.Shand
 * 
 */
interface IStack
{
	function addView3D(View3DClass:Class<Dynamic>, id:String = ""):Void;
	function addView3DAt(View3DClass:Class<Dynamic>, index:Int, id:String = ""):Void;
	
	function addStarling(StarlingLayerClass:Class<Dynamic>, id:String = ""):Void;
	function addStarlingAt(StarlingLayerClass:Class<Dynamic>, index:Int, id:String = ""):Void;
	
	//function addFlare3D(FlareLayerClass:Class, id:String = ""):Void;
	//function addFlare3DAt(FlareLayerClass:Class, index:Int, id:String=""):Void;
	
	public var get_debug(get, set):Bool;
	//function set_debug(value:Bool):Void;
	//function get_debug():Bool;
}