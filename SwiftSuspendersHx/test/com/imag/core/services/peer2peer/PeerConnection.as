package com.imag.core.services.peer2peer 
{
	import com.imag.core.utils.classTools.ClassRegistrar;
	import org.osflash.signals.Signal;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	internal class PeerConnection implements IPeerConnection  
	{
		private static var peerObjects:Vector.<PeerObject> = new Vector.<PeerObject>();
		protected var peerObject:PeerObject;
		
		public function PeerConnection(groupID:String) 
		{
			peerObject = getPeerObject(groupID);
		}
		
		private function getPeerObject(groupID:String):PeerObject 
		{
			for (var i:int = 0; i < PeerConnection.peerObjects.length; i++) {
				if (PeerConnection.peerObjects[i].groupID == groupID) return PeerConnection.peerObjects[i];
			}
			var peerObject:PeerObject = new PeerObject(groupID);
			PeerConnection.peerObjects.push(peerObject);
			return peerObject;
		}
		
		public function connect():void
		{
			throw new Error("connect() much be overriden");
		}
		
		public function disconnect():void
		{
			peerObject.disconnect();
		}
		
		public function start():void
		{
			peerObject.start();
		}
		
		public function stop():void
		{
			peerObject.stop();
		}
		
		public function register(_class:Class):void
		{
			ClassRegistrar.register(_class);
		}
		
		public function send(payload:Object):void
		{
			peerObject.send(payload);
		}
		
		public function get connected():Boolean 
		{
			return peerObject.connected;
		}
		
		public function get running():Boolean 
		{
			return peerObject.running;
		}
		
		public function get frameBuffer():int 
		{
			return peerObject.frameBuffer;
		}
		
		public function set frameBuffer(value:int):void 
		{
			peerObject.frameBuffer = value;
		}
		
		public function get dispatchToSelf():Boolean 
		{
			return peerObject.dispatchToSelf;
		}
		
		public function set dispatchToSelf(value:Boolean):void 
		{
			peerObject.dispatchToSelf = value;
		}
		
		public function get ipMulticast():String 
		{
			return peerObject.ipMulticast;
		}
		
		public function set ipMulticast(value:String):void 
		{
			peerObject.ipMulticast = value;
		}
		
		public function get ipMulticastPort():int 
		{
			return peerObject.ipMulticastPort;
		}
		
		public function set ipMulticastPort(value:int):void 
		{
			peerObject.ipMulticastPort = value;
		}
		
		public function get connectionRefused():Signal 
		{
			return peerObject.connectionRefused;
		}
		
		public function get connectionSuccess():Signal 
		{
			return peerObject.connectionSuccess;
		}
		
		public function get neighborConnect():Signal 
		{
			return peerObject.neighborConnect;
		}
		
		public function get neighborDisconnect():Signal 
		{
			return peerObject.neighborDisconnect;
		}
		
		public function get onNetStatusEvent():Signal 
		{
			return peerObject.onNetStatusEvent;
		}
		
		/*public function onPackageReceived(objectID:String=""):Signal 
		{
			
		}*/
		
		public function get onPacketReceived():Signal
		{
			return peerObject.onMsg;
		}
		
		public function onSubPacketReceived(objectID:String = ""):Signal
		{
			return peerObject.onSubPacketReceived(objectID);
		}
	}
}