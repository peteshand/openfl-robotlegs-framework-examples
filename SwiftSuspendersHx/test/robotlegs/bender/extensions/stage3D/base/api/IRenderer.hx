package robotlegs.bender.extensions.stage3D.base.api;

import msignal.Signal.Signal0;
import openfl.display.Stage3D;
/**
 * ...
 * @author P.J.Shand
 * 
 */
interface IRenderer
{
	function init(profile:Dynamic, antiAlias:Int=0):Void;
	function start():Void;
	function stop():Void;
	function render():Void;
	
	function addLayer(layer:ILayer):Void;
	function addLayerAt(layer:ILayer, index:Int):Void;
	function removeLayer(layer:ILayer):Void;
	
	var onReady(get, null):Signal0;
	//function get onReady():Signal;
	//function get stage3DProxy():Stage3DProxy;
	// FIX
	var stage3D(get, null):Stage3D;
	//function get stage3D():Stage3D;
	var profile(get, null):String;
	//function get profile():String;
}