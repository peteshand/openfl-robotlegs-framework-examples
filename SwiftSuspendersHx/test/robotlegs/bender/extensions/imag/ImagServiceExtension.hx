package robotlegs.bender.extensions.imag;

import robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap;
import robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.IExtension;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.impl.UID;

/**
 * ...
 * @author P.J.Shand
 * 
 */
class ImagServiceExtension implements IExtension
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	
	private var _uid:String = UID.create(ImagServiceExtension);
	private var context:IContext;
	private var injector:IInjector;
	
	public function ImagServiceExtension() { }
	
	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/
	
	public function extend(context:IContext):Void
	{
		this.context = context;
		injector = context.injector;
		
		injector.map(IKeyboardMap).toSingleton(KeyboardMap);
		injector.map(KeyboardMap).asSingleton();
	}
	
	public function toString():String
	{
		return _uid;
	}
}