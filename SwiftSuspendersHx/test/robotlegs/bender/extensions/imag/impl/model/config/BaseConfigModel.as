package robotlegs.bender.extensions.imag.impl.model.config 
{
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class BaseConfigModel 
	{
		private static var _configURL:String = "xml/config.xml";
		
		public function BaseConfigModel() { }
		
		public function get configURL():String 
		{
			return _configURL;
		}
		
		public function set configURL(value:String):void 
		{
			_configURL = value;
		}
	}
}