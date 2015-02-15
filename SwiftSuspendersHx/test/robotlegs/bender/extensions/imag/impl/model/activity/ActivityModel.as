package robotlegs.bender.extensions.imag.impl.model.activity 
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TouchEvent;
	import org.osflash.signals.Signal;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ActivityModel 
	{
		[Inject] public var contextView:ContextView;
		
		private static var animationCount:int = 0;
		private static var interactionCount:int = 0;
		
		private var _throttlingActive:Boolean = false;
		private var _throttleFramerate:Boolean = false;
		
		public var timeout:int = 2;
		public var throttleFPS:int = 4;
		public var standardFPS:int = 60;
		
		private var interactiveEvents:Vector.<String>;
		
		public function ActivityModel() 
		{
			interactiveEvents = new <String>[
				MouseEvent.MOUSE_DOWN,
				MouseEvent.MOUSE_MOVE,
				MouseEvent.MOUSE_UP,
				MouseEvent.MOUSE_WHEEL,
				TouchEvent.TOUCH_BEGIN,
				TouchEvent.TOUCH_MOVE,
				TouchEvent.TOUCH_END,
			];
		}
		
		public static function animating():void 
		{
			animationCount = 0;
		}
		
		public static function interacting():void 
		{
			interactionCount = 0;
		}
		
		public function get throttlingActive():Boolean 
		{
			return _throttlingActive;
		}
		
		public function set throttlingActive(value:Boolean):void 
		{
			if (_throttlingActive == value) return;
			_throttlingActive = value;
			if (throttlingActive) {
				contextView.view.stage.addEventListener(Event.ENTER_FRAME, Update);
				for (var i:int = 0; i < interactiveEvents.length; i++) 
				{
					contextView.view.stage.addEventListener(interactiveEvents[i], OnInteraction);
				}
			}
			else {
				contextView.view.stage.removeEventListener(Event.ENTER_FRAME, Update);
				for (var j:int = 0; j < interactiveEvents.length; j++) 
				{
					contextView.view.stage.removeEventListener(interactiveEvents[j], OnInteraction);
				}
			}
		}
		
		private function get throttleFramerate():Boolean 
		{
			return _throttleFramerate;
		}
		
		private function set throttleFramerate(value:Boolean):void 
		{
			if (_throttleFramerate == value) return;
			_throttleFramerate = value;
			if (throttleFramerate) contextView.view.stage.frameRate = throttleFPS;
			else contextView.view.stage.frameRate = standardFPS;
		}
		
		private function OnInteraction(e:Event):void 
		{
			interactionCount = 0;
		}
		
		private function Update(e:Event):void 
		{
			animationCount++;
			interactionCount++;
			
			if (animationCount < timeout * standardFPS || interactionCount < timeout * standardFPS) {
				throttleFramerate = false;
			}
			else {
				throttleFramerate = true;
			}
		}
	}
}