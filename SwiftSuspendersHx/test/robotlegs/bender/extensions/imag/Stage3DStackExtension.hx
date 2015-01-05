package robotlegs.bender.extensions.imag;

import robotlegs.bender.extensions.imag.api.model.stage3DExtension.IStack;
import robotlegs.bender.extensions.imag.api.model.stage3DExtension.IViewport;
import robotlegs.bender.extensions.imag.api.services.stage3DExtension.IRenderer;
import robotlegs.bender.extensions.imag.impl.model.stage3DExtension.Stack;
import robotlegs.bender.extensions.imag.impl.model.stage3DExtension.Viewport;
import robotlegs.bender.extensions.imag.impl.services.stage3DExtension.Renderer;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.IExtension;
import robotlegs.bender.framework.impl.UID;
/**
 * ...
 * @author P.J.Shand
 * 
 */
class Stage3DStackExtension implements IExtension
{
	
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	
	private var _uid:String = UID.create(Stage3DStackExtension);
	
	public function Stage3DStackExtension() { }
	
	/*============================================================================*/
	/* Public Functions                                                           */
	/*============================================================================*/
	
	public function extend(context:IContext):Void
	{
		context.injector.map(IStack).toSingleton(Stack);
		context.injector.map(IRenderer).toSingleton(Renderer);
		context.injector.map(IViewport).toSingleton(Viewport);
	}
	
	public function toString():String
	{
		return _uid;
	}
}