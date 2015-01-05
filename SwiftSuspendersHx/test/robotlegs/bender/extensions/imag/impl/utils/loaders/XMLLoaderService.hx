package robotlegs.bender.extensions.imag.impl.utils.loaders;
import msignal.Signal.Signal1;
import msignal.Signal.Signal2;
import openfl.events.ErrorEvent;
import openfl.events.Event;
import openfl.events.IOErrorEvent;
import openfl.net.URLLoader;
import openfl.net.URLRequest;

/**
 * ...
 * @author P.J.Shand
 */
class XMLLoaderService 
{
	public function XMLLoaderService() 
	{
		
	}
	
	public function load(url:String):XMLLoader
	{
		var xmlLoader:XMLLoader = new XMLLoader();
		xmlLoader.load(url);
		return xmlLoader;
	}
}



class XMLLoader
{
	public var available:Bool = true;
	public var url:String;
	
	private var request:URLRequest;
	private var loader:URLLoader;
	
	public var onComplete = new Signal2(Xml, String);
	public var onFail = new Signal1(String);
	
	public function XMLLoader(url:String="")
	{
		this.url = url;
	}
	
	public function load(url:String):Void
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
	
	private function OnLoadComplete(e:Event):Void 
	{
		available = true;
		onComplete.dispatch(Xml(loader.data), url);
		this.dispose();
	}
	
	private function OnError(e:ErrorEvent):Void 
	{
		trace("Load Error: " + e);
		available = true;
		onComplete.dispatch(null, url);
	}
	
	public function dispose():Void 
	{
		loader.removeEventListener(Event.COMPLETE, OnLoadComplete);
		loader.removeEventListener(ErrorEvent.ERROR, OnError);
		loader = null;
		request = null;
		onComplete = null;
	}
}