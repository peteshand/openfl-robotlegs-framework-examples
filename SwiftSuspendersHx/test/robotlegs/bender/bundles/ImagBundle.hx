package robotlegs.bender.bundles;

import robotlegs.bender.extensions.imag.ImagCommandExtension;
import robotlegs.bender.extensions.imag.ImagModelExtension;
import robotlegs.bender.extensions.imag.ImagServiceExtension;
import robotlegs.bender.extensions.imag.ImagSignalExtension;
import robotlegs.bender.extensions.imag.Stage3DStackExtension;
//import robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension;
import robotlegs.bender.extensions.viewManager.ManualStageObserverExtension;
import robotlegs.bender.framework.api.IBundle;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.LogLevel;

/**
	 * The <code>ImagBundle</code> class will include all extensions which are required
	 * to create imagination sytle applications.
	 */
class ImagBundle implements IBundle
{
	public static var VERSION:String = "1.2";
	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/

	/** @inheritDoc **/
	public function extend(context:IContext):Void
	{
		//context.logLevel = LogLevel.INFO;
		
		context.install(
			Stage3DStackExtension,
			ManualStageObserverExtension, 
			//SignalCommandMapExtension, 
			ImagSignalExtension,
			ImagModelExtension,
			ImagServiceExtension,
			ImagCommandExtension
		);
	}
}