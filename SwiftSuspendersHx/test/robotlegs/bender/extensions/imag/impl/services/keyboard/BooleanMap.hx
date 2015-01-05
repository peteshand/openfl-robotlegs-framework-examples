package robotlegs.bender.extensions.imag.impl.services.keyboard;

/**
 * ...
 * @author P.J.Shand
 */
class BoolMap 
{
	private var keyboardMap:KeyboardMap;
	private var property:String;
	private var object:Object;
	
	public function BoolMap(keyboardMap:KeyboardMap) 
	{
		this.keyboardMap = keyboardMap;
		
	}
	
	public function map(object:Object, property:String, charOrKeycode:*, options:Object = null):Void 
	{
		this.object = object;
		this.property = property;
		
		var pressOptions:Object = new Object();
		var releaseOptions:Object = new Object();
		if (options) {
			for (var prop:String in options) {
				pressOptions[prop] = options[prop];
				releaseOptions[prop] = options[prop];
			}
		}
		pressOptions['action'] = KeyboardMap.ACTION_DOWN;
		releaseOptions['action'] = KeyboardMap.ACTION_UP;
		
		keyboardMap.map(OnPress, charOrKeycode, pressOptions );
		keyboardMap.map(OnRelease, charOrKeycode, releaseOptions );
	}
	
	private function OnPress():Void 
	{
		object[property] = true;
	}
	
	private function OnRelease():Void 
	{
		object[property] = false;
	}	
}