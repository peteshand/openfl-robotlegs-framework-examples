package robotlegs.bender.extensions.imag.impl.commands.nativeWindow 
{
	CONFIG::desktop import flash.desktop.NativeApplication;
	import flash.events.Event;
	import robotlegs.bender.bundles.mvcs.Command;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class AlwaysOnTopCommand extends Command 
	{
		[Inject] public var contextView:ContextView;
		
		public function AlwaysOnTopCommand() { }
		
		override public function execute():void
		{
			CONFIG::release {
				contextView.view.stage.addEventListener(Event.ENTER_FRAME, OnFirstFrame);
			}
		}
		
		private function OnFirstFrame(e:Event):void 
		{
			CONFIG::desktop {
				contextView.view.stage.removeEventListener(Event.ENTER_FRAME, OnFirstFrame);
				NativeApplication.nativeApplication.activeWindow.alwaysInFront = true;
			}
		}
	}

}