package robotlegs.bender.extensions.imag.impl.commands.fullscreen 
{
	import com.greensock.TweenLite;
	import flash.display.DisplayObject;
	import flash.display.StageDisplayState;
	import flash.events.MouseEvent;
	import robotlegs.bender.bundles.mvcs.Command;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class FullscreenCommand extends Command 
	{
		[Inject] public var contextView:ContextView;
		private var coolingDown:Boolean = false;
		private var coolDownCount:int = 150;
		private var enterFullscreenOnStartup:Boolean = true;
		
		public function FullscreenCommand() { }
		
		override public function execute():void
		{
			attachTo(contextView.view.stage);
		}
		
		private function attachTo(displayObject:DisplayObject):void
		{
			if (enterFullscreenOnStartup && CONFIG::desktop) {
				if (CONFIG::release) {
					GoFullScreen();
				}
				displayObject.addEventListener(MouseEvent.DOUBLE_CLICK, OnDoubleClickFullscreen);
			}
			else {
				displayObject.addEventListener(MouseEvent.DOUBLE_CLICK, OnDoubleClickToggle);
			}
		}
		
		private function GoFullScreen():void 
		{
			CONFIG::air {
				contextView.view.stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;
				
				contextView.view.stage.nativeWindow.activate();
				contextView.view.stage.nativeWindow.alwaysInFront = true;
				return;
			}
			contextView.view.stage.displayState = StageDisplayState.FULL_SCREEN;
		}
		
		private function ExitFullScreen():void 
		{
			contextView.view.stage.displayState = StageDisplayState.NORMAL;
		}
		
		private function OnDoubleClickFullscreen(e:MouseEvent):void 
		{
			var exit:Boolean = true;
			if (!e.shiftKey) return;
			if (e.type == MouseEvent.DOUBLE_CLICK) exit = false;
			if (exit) return;
			
			GoFullScreen();
		}
		
		private function OnDoubleClickToggle(e:MouseEvent):void 
		{
			if (!e.shiftKey) return;
			
			if (!coolingDown){
				if (contextView.view.stage.displayState == StageDisplayState.NORMAL) GoFullScreen();
				else ExitFullScreen();
				coolingDown = true;
				TweenLite.delayedCall(0.5, OnCooldownComplete);
			}
		}
		
		private function OnCooldownComplete():void 
		{
			coolingDown = false;
		}
	}

}