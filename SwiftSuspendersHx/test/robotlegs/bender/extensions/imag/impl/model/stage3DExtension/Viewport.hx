package robotlegs.bender.extensions.imag.impl.model.stage3DExtension;

import msignal.Signal.Signal0;
import openfl.events.Event;
import openfl.geom.Rectangle;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.imag.api.model.stage3DExtension.IViewport;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.api.ILogger;
/**
 * ...
 * @author P.J.Shand
 */
class Viewport implements IViewport
{
	
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	private var _injector:IInjector;
	private var _logger:ILogger;
	@inject public var contextView:ContextView;
	
	private var _rect:Rectangle = new Rectangle();
	private var lastRect:Rectangle = new Rectangle();
	
	private var _onChange:Signal0 = new Signal0();
	
	/*============================================================================*/
	/* Constructor                                                                */
	/*============================================================================*/
	public function Viewport(context:IContext)
	{
		_injector = context.injector;
		_logger = context.getLogger(this);
	}
	
	public function init():Void
	{
		contextView.view.addEventListener(Event.ENTER_FRAME, CheckForChange);
	}
	
	private function CheckForChange(e:Event):Void 
	{
		if (rect.x != lastRect.x) onChange.dispatch();
		else if (rect.y != lastRect.y) onChange.dispatch();
		else if (rect.width != lastRect.width) onChange.dispatch();
		else if (rect.height != lastRect.height) onChange.dispatch();
		lastRect.setTo(rect.x, rect.y, rect.width, rect.height);
	}
	
	public var rect(get, set):Rectangle;
	public function get_rect():Rectangle 
	{
		return _rect;
	}
	
	public function set_rect(value:Rectangle):Void 
	{
		_rect = value;
	}
	
	public var onChange(get, null):Signal0;
	public function get_onChange():Signal0
	{
		return _onChange;
	}
}