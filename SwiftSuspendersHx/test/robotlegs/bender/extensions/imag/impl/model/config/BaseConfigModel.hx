package robotlegs.bender.extensions.imag.impl.model.config;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class BaseConfigModel 
{
	private static var _configURL:String = "xml/config.xml";
	public var configURL(get, set):String;
	
	public function new() { }
	
	public function get_configURL():String 
	{
		return _configURL;
	}
	
	public function set_configURL(value:String):String 
	{
		_configURL = value;
		return value;
	}
}