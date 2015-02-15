package robotlegs.bender.extensions.imag.impl.model.activity;

import openfl.events.Event;
import openfl.events.MouseEvent;
import openfl.events.TouchEvent;
import robotlegs.bender.extensions.contextView.ContextView;

/**
 * ...
 * @author P.J.Shand
 */
class ActivityModel 
{
	@inject public var contextView:ContextView;
	
	private var animationCount:Int = 0;
	private var InteractionCount:Int = 0;
	
	private var _throttlingActive:Bool = false;
	private var _throttleFramerate:Bool = false;
	
	public var timeout:Int = 2;
	public var throttleFPS:Int = 4;
	public var standardFPS:Int = 60;
	
	private var InteractiveEvents:Array<String>;
	
	public function new() 
	{
		InteractiveEvents = [
			MouseEvent.MOUSE_DOWN,
			MouseEvent.MOUSE_MOVE,
			MouseEvent.MOUSE_UP,
			MouseEvent.MOUSE_WHEEL,
			TouchEvent.TOUCH_BEGIN,
			TouchEvent.TOUCH_MOVE,
			TouchEvent.TOUCH_END,
		];
	}
	
	public function animating():Void 
	{
		animationCount = 0;
	}
	
	public function Interacting():Void 
	{
		InteractionCount = 0;
	}
	
	public var throttlingActive(get, set):Bool;
	
	public function get_throttlingActive():Bool 
	{
		return _throttlingActive;
	}
	
	public function set_throttlingActive(value:Bool):Bool 
	{
		if (_throttlingActive == value) return value;
		_throttlingActive = value;
		if (throttlingActive) {
			contextView.view.stage.addEventListener(Event.ENTER_FRAME, Update);
			for (i in 0...InteractiveEvents.length) 
			{
				contextView.view.stage.addEventListener(InteractiveEvents[i], OnInteraction);
			}
		}
		else {
			contextView.view.stage.removeEventListener(Event.ENTER_FRAME, Update);
			for (j in 0...InteractiveEvents.length) 
			{
				contextView.view.stage.removeEventListener(InteractiveEvents[j], OnInteraction);
			}
		}
		return _throttlingActive;

	}
	
	private var throttleFramerate(get, set):Bool;
	
	private function get_throttleFramerate():Bool 
	{
		return _throttleFramerate;
	}
	
	private function set_throttleFramerate(value:Bool):Bool 
	{
		if (_throttleFramerate == value) return value;
		_throttleFramerate = value;
		if (throttleFramerate) contextView.view.stage.frameRate = throttleFPS;
		else contextView.view.stage.frameRate = standardFPS;
		return _throttleFramerate;
	}
	
	private function OnInteraction(e:Event):Void 
	{
		InteractionCount = 0;
	}
	
	private function Update(e:Event):Void 
	{
		animationCount++;
		InteractionCount++;
		
		if (animationCount < timeout * standardFPS || InteractionCount < timeout * standardFPS) {
			throttleFramerate = false;
		}
		else {
			throttleFramerate = true;
		}
	}
}