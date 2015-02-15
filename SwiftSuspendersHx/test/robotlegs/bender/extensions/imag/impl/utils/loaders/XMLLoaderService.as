package robotlegs.bender.extensions.imag.impl.utils.loaders {
	import flash.net.URLLoader;
	import flash.system.Capabilities;
	import org.osflash.signals.Signal;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class XMLLoaderService 
	{
		public function XMLLoaderService() 
		{
			
		}
		
		public function load(url:String, onCompleteSignal:Signal=null):XMLLoader
		{
			var xmlLoader:XMLLoader = new XMLLoader();
			xmlLoader.load(url);
			return xmlLoader;
		}
	}
}

import flash.events.ErrorEvent;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.net.URLLoader;
import flash.net.URLRequest;
import org.osflash.signals.Signal;

class XMLLoader
{
	public var available:Boolean = true;
	public var url:String;
	
	private var request:URLRequest;
	private var loader:URLLoader;
	
	public var onComplete:Signal = new Signal(XML, String);
	public var onFail:Signal = new Signal(String);
	
	public function XMLLoader(url:String="")
	{
		this.url = url;
	}
	
	public function load(url:String):void
	{
		this.url = url;
		if (!loader) {
			loader = new URLLoader();
			loader.addEventListener(Event.COMPLETE, OnLoadComplete);
			loader.addEventListener(ErrorEvent.ERROR, OnError);
			loader.addEventListener(IOErrorEvent.IO_ERROR, OnError);
			
		}
		
		available = false;
		request = new URLRequest(url);
		loader.load(request);
	}
	
	private function OnLoadComplete(e:Event):void 
	{
		available = true;
		onComplete.dispatch(XML(loader.data), url);
		this.dispose();
	}
	
	private function OnError(e:ErrorEvent):void 
	{
		trace("Load Error: " + e);
		available = true;
		onComplete.dispatch(null, url);
	}
	
	public function dispose():void 
	{
		loader.removeEventListener(Event.COMPLETE, OnLoadComplete);
		loader.removeEventListener(ErrorEvent.ERROR, OnError);
		loader = null;
		request = null;
		onComplete = null;
	}
}