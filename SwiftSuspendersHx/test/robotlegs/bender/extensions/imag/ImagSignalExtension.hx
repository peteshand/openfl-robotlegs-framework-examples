package robotlegs.bender.extensions.imag;

import robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal;
import robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal;
import robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.IExtension;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.impl.UID;

/**
 * ...
 * @author P.J.Shand
 * 
 */
class ImagSignalExtension implements IExtension
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	
	private var _uid:String = UID.create(ImagSignalExtension);
	private var context:IContext;
	private var injector:IInjector;
	
	public function new() { }
	
	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/
	
	public function extend(context:IContext):Void
	{
		this.context = context;
		injector = context.injector;
		
		context.injector.map(InitializeAppSignal).asSingleton();
		context.injector.map(LoadConfigSignal).asSingleton();
		context.injector.map(AppSetupCompleteSignal).asSingleton();
	}
	
	public function toString():String
	{
		return _uid;
	}
}