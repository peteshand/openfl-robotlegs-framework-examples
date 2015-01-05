package robotlegs.bender.extensions.imag.api.services.keyboard;
	
/**
 * ...
 * @author P.J.Shand
 */
interface IKeyboardMap
{
	function map(callback:Dynamic, charOrKeycode:Dynamic, options:Dynamic = null):Void;
	
	public var traceKeyIDs(get, set):Bool;
	
	//function get traceKeyIDs():Bool;
	//function set traceKeyIDs(value:Bool):Void;
}