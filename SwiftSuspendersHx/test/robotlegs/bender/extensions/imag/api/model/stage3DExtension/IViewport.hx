package robotlegs.bender.extensions.imag.api.model.stage3DExtension; 

import msignal.Signal.Signal0;
import openfl.geom.Rectangle;

/**
 * ...
 * @author P.J.Shand
 */
interface IViewport 
{
	function init():Void;
	
	var rect(get, set):Rectangle;
	
	//function get_rect():Rectangle;
	//function set_rect(value:Rectangle):Void;
	
	var onChange(get, null):Signal0;
	
	//function get onChange():Signal;
}