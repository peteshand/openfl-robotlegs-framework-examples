package blaze.service.p2p.sync 
{
	import blaze.service.p2p.P2PService;
	import flash.utils.describeType;
	import org.osflash.signals.Signal;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class SyncObject 
	{
		private var p2pService:P2PService;
		private var properties:Vector.<String>;
		private var signals:Vector.<Signal>;
		private var _active:Boolean = true;
		private var xml:XML;
		private var localModel:Object;
		private var sharedModel:Object;
		private var groupID:String;
		
		public function SyncObject(p2pService:P2PService, localModel:Object, sharedModel:Object) 
		{
			this.sharedModel = sharedModel;
			this.localModel = localModel;
			this.p2pService = p2pService;
			
			
			xml = describeType(localModel);
			groupID = xml.@name;
			
			properties = new Vector.<String>();
			signals = new Vector.<Signal>();
			
			p2pService.groupSignal(groupID, "modelUpdate").add(OnValueRecieved);
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
				object[properties[i]] = localModel[properties[i]];
			}
			p2pService.addMessgae( { modelUpdate:object}, groupID);
		}
		
		private function OnValueRecieved(modelUpdate:Object):void 
		{
			for (var i:int = 0; i < signals.length; i++) 
			{ signals[i].remove(OnSendValues); }
			
			for (var item:String in modelUpdate) 
			{
				trace("item = " + item);
				sharedModel[item] = modelUpdate[item];
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
}