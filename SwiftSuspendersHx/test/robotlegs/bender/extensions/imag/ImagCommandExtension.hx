package robotlegs.bender.extensions.imag;

import robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands;
import robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.IExtension;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.impl.UID;

/**
 * ...
 * @author P.J.Shand
 * 
 */
class ImagCommandExtension implements IExtension
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	
	private var _uid:String = UID.create(ImagCommandExtension);
	private var context:IContext;
	private var injector:IInjector;
	
	public function ImagCommandExtension() { }
	
	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/

	public function extend(context:IContext):Void
	{
		this.context = context;
		injector = context.injector;
		
		context.configure(ExecuteImagCommands);
	}
	
	public function toString():String
	{
		return _uid;
	}
}