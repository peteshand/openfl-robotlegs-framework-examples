package robotlegs.bender.extensions.imag.impl.commands.errorLogging 
{
	import flash.events.UncaughtErrorEvent;
	import robotlegs.bender.bundles.mvcs.Command;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ErrorLogCommand extends Command 
	{
		private var fileLog:FileLog;
		[Inject] public var contextView:ContextView;
		
		public function ErrorLogCommand() 
		{
			super();
		}
		
		override public function execute():void
		{
			fileLog = new FileLog();
			contextView.view.loaderInfo.uncaughtErrorEvents.addEventListener(UncaughtErrorEvent.UNCAUGHT_ERROR, onUncaughtError);
        }           
		
        private function onUncaughtError(e:UncaughtErrorEvent):void 
        {
			var message:String;
            if (e.error["message"])
            {
                message = e.error["message"];
            }
            else if (e.error["text"])
            {
                message = e.error["text"];
            }
            else
            {
                message = e.error["toString"]();
            }
			
			fileLog.log(message);
			e.preventDefault();
		}
	}
}