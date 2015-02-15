package com.imag.core.services.email 
{
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import flash.net.URLVariables;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class EmailService 
	{
		private var serverScript:String = "http://peteshand.net/email/email.php";
		private var toEmail:Vector.<String> = new Vector.<String>();
		public var fromEmail:String = "";
		
		public function EmailService() 
		{
			
		}
		
		public function addEmail(email:String):void
		{
			toEmail.push(email);
		}
		
		public function send(subject:String, body:String):void
		{
			// TODO, backend msg if offline
			
			if (fromEmail == "") {
				throw new Error("EmailService.fromEmail needs to be set");
				return;
			}
			if (toEmail.length == 0) {
				throw new Error("EmailService.addEmail('email address address') needs to be called at least once");
				return;
			}
			
			for (var i:int = 0; i < toEmail.length; i++) 
			{
				var variables:URLVariables = new URLVariables();
				variables.to = toEmail[i];
				variables.from = fromEmail;
				variables.subject = subject;
				variables.body = body;
				
				var request:URLRequest = new URLRequest(serverScript);
				request.data = variables;
				request.method = URLRequestMethod.POST;
				
				var urlLoader:URLLoader = new URLLoader();
				urlLoader.addEventListener(Event.COMPLETE, OnSendComplete);
				urlLoader.addEventListener(IOErrorEvent.IO_ERROR, OnSendError);
				urlLoader.load(request);
			}
			
			trace("SEND TEST REPORT");
		}
		
		private function OnSendError(e:IOErrorEvent):void 
		{
			trace("Error sending email: " + e);
		}
		
		private function OnSendComplete(e:Event):void 
		{
			URLLoader(e.target).removeEventListener(Event.COMPLETE, OnSendComplete);
			trace("TEST REPORT SENT: " + e);
		}
	}
}