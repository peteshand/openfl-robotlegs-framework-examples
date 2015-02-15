package robotlegs.bender.extensions.imag.impl.commands.fullscreen 
{
	import com.mesmotronic.ane.AndroidFullScreen;
	import flash.events.TouchEvent;
	import robotlegs.bender.bundles.mvcs.Command;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class AndroidFullscreenCommand extends Command 
	{
		[Inject] public var contextView:ContextView;
		
		public function AndroidFullscreenCommand() 
		{
			super();
		}
		
		override public function execute():void
		{
			if (AndroidFullScreen.isSupported) {
				if (AndroidFullScreen.isImmersiveModeSupported){
					AndroidFullScreen.immersiveMode(false);
					contextView.view.stage.addEventListener(TouchEvent.TOUCH_BEGIN, OnTouchBegin);
				}
			}
		}
		
		private function OnTouchBegin(e:TouchEvent):void 
		{
			AndroidFullScreen.immersiveMode(false);
		}
		
	}
}