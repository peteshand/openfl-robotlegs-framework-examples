package robotlegs.bender.extensions.imag.api.view.stage3DExtension;
import openfl.geom.Rectangle;

/**
 * ...
 * @author P.J.Shand
 */
interface ILayer
{
	function update():Void;
	
	public var rect(null, set):Rectangle;
}