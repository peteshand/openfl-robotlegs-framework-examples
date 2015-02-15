package robotlegs.bender.extensions.imag;

import robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands;
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
	
	private var _uid:String;
	private var context:IContext;
	private var injector:IInjector;
	
	public function new() { }
	
	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/

	public function extend(context:IContext):Void
	{
		_uid = UID.create(ImagCommandExtension);
		
		this.context = context;
		injector = context.injector;
		
		context.configure([ExecuteImagCommands]);
	}
	
	public function toString():String
	{
		return _uid;
	}
}