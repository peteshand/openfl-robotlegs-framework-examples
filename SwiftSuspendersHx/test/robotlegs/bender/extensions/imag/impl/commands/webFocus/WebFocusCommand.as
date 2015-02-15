package robotlegs.bender.extensions.imag.impl.commands.webFocus 
{
	import com.imag.core.utils.delay.Delay;
	import flash.external.ExternalInterface;
	import flash.net.URLVariables;
	import robotlegs.bender.bundles.mvcs.Command;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class WebFocusCommand extends Command 
	{
		[Inject] public var contextView:ContextView;
		//[Inject] public var model:Model;
		[Embed(source="WebFocus.js", mimeType="application/octet-stream")]
		private static const JsWebFocus:Class;
		private static var JsWebFocusString:String;
		
		
		public function WebFocusCommand() { }
		
		override public function execute():void
		{
			if (!ExternalInterface.available) return;
			
			JsWebFocusString = new JsWebFocus();
			Delay.byFrames(60, SetFocus);
			ExternalInterface.call(JsWebFocusString, SWFName);
		}
		
		private function SetFocus():void 
		{
			ExternalInterface.call(JsWebFocusString, SWFName);
		}
		
		private function get SWFName():String
		{
			var swfName:String;
			swfName = contextView.view.loaderInfo.url;
			swfName = swfName.slice(swfName.lastIndexOf("/") + 1); // Extract the filename from the url
			swfName = swfName.slice(0, -4); // Remove the ".swf" file extension
			swfName = new URLVariables("path=" + swfName).path; // this is a hack to decode URL-encoded values
			return swfName;
		}
	}
}