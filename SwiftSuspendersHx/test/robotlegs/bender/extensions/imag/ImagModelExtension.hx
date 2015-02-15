package robotlegs.bender.extensions.imag;

import robotlegs.bender.extensions.imag.api.model.config.IConfigModel;
import robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel;
import robotlegs.bender.extensions.matching.InstanceOfType;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.IExtension;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.impl.UID;

/**
 * ...
 * @author P.J.Shand
 * 
 */
class ImagModelExtension implements IExtension
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	public static var ConfigClass:Class<Dynamic>;
	private var _uid = UID.create(ImagModelExtension);
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
		
		
		context.addConfigHandler(InstanceOfType.call(IConfigModel), handleConfigModel);
		injector.map(ActivityModel).asSingleton();
	}
	
	private function handleConfigModel(configModel:IConfigModel):Void
	{
		//ImagModelExtension.ConfigClass = configModel.constructor;
		ImagModelExtension.ConfigClass = Reflect.getProperty(configModel, "constructor");
		injector.map(IConfigModel).toSingleton(ImagModelExtension.ConfigClass);
	}
	
	public function toString():String
	{
		return _uid;
	}
}