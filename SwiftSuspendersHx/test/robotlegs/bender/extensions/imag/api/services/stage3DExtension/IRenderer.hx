package robotlegs.bender.extensions.imag.api.services.stage3DExtension;

import away3d.core.managers.Stage3DProxy;
import msignal.Signal.Signal0;
import robotlegs.bender.extensions.imag.api.view.stage3DExtension.ILayer;
/**
 * ...
 * @author P.J.Shand
 * 
 */
interface IRenderer
{
	function init(profile:String, antiAlias:Int=4):Void;
	function start():Void;
	function stop():Void;
	function render():Void;
	
	function addLayer(layer:ILayer):Void;
	function addLayerAt(layer:ILayer, index:Int):Void;
	function removeLayer(layer:ILayer):Void;
	
	public var onReady(get, null):Signal0;
	public var stage3DProxy(get, null):Stage3DProxy;
	public var profile(get, null):String;
}