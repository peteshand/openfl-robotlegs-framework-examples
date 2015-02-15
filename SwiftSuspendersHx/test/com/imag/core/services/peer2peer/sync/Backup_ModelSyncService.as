package blaze.service.p2p.sync
{
	import blaze.service.p2p.P2PService;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ModelSyncService 
	{
		private var p2pService:P2PService;
		private var modelSyncObjects:Dictionary= new Dictionary();
		
		public function ModelSyncService() 
		{
			p2pService = new P2PService();
		}
		
		public function register(model:Object, newProperties:Array, signal:Signal):void
		{
			syncObject(model).register(newProperties, signal);
		}
		
		private function syncObject(model:Object):ModelSyncObject 
		{
			if (!modelSyncObjects[model]) {
				modelSyncObjects[model] = new ModelSyncObject(p2pService, model);
			}
			return ModelSyncObject(modelSyncObjects[model]);
		}
	}
}
import blaze.service.p2p.P2PService;
import flash.utils.describeType;
import flash.utils.getAliasName;
import org.osflash.signals.Signal;

class ModelSyncObject
{
	private var model:Object;
	private var p2pService:P2PService;
	private var properties:Vector.<String>;
	private var signals:Vector.<Signal>;
	private var _active:Boolean = true;
	private var xml:XML;
	
	public function ModelSyncObject(p2pService:P2PService, model:Object) 
	{
		this.p2pService = p2pService;
		this.model = model;
		
		
		xml = describeType(model);
		
		
		properties = new Vector.<String>();
		signals = new Vector.<Signal>();
		
		p2pService.groupSignal(xml.name, "modelUpdate").add(OnValueRecieved);
	}
	
	public function register(newProperties:Array, signal:Signal):void 
	{
		for (var i:int = 0; i < newProperties.length; i++) 
		{
			properties.push(newProperties[i]);
		}
		signals.push(signal);
		
		if (active) signal.add(OnSendValues);
	}
	
	private function OnSendValues():void 
	{
		var object:Object = new Object();
		for (var i:int = 0; i < properties.length; i++) 
		{
			object[properties[i]] = model[properties[i]];
		}
		p2pService.addMessgae( { modelUpdate:object}, xml.name);
	}
	
	private function OnValueRecieved(modelUpdate:Object):void 
	{
		for (var i:int = 0; i < signals.length; i++) 
		{ signals[i].remove(OnSendValues); }
		
		for (var item:String in modelUpdate) 
		{
			trace("item = " + item);
			model[item] = modelUpdate[item];
		}
		
		if (active) {
			for (var j:int = 0; j < signals.length; j++) 
			{
				signals[j].add(OnSendValues);
			}
		}
	}
	
	public function get active():Boolean 
	{
		return _active;
	}
	
	public function set active(value:Boolean):void 
	{
		_active = value;
		for (var i:int = 0; i < signals.length; i++) 
		{
			if (active) signals[i].add(OnSendValues);
			else signals[i].remove(OnSendValues);
		}
	}
}