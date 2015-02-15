package com.imag.core.services.peer2peer 
{
	import com.imag.core.utils.delay.Delay;
	import flash.display.Sprite;
	import flash.errors.IOError;
	import flash.events.Event;
	import flash.events.NetStatusEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.GroupSpecifier;
	import flash.net.NetConnection;
	import flash.net.NetGroup;
	import flash.net.NetGroupReplicationStrategy;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;

	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class PeerObject 
	{
		public var groupID:String;
		private var autoStart:Boolean;
		
		private var nc:NetConnection;
		private var groupspec:GroupSpecifier;
		public var group:NetGroup;
		
		private var _numberOfConnectedPairs:int = 0;
		private var _connected:Boolean = false;
		
		public var connectionRefused:Signal = new Signal();
		public var connectionSuccess:Signal = new Signal();
		public var neighborConnect:Signal = new Signal();
		public var neighborDisconnect:Signal = new Signal();
		public var onNetStatusEvent:Signal = new Signal(String);
		public var onMsg:Signal = new Signal(Object);
		
		private var onMsgs:Dictionary = new Dictionary(true);
		
		
		public var frameBuffer:int = 0;
		public var dispatchToSelf:Boolean = false;
		
		public var ipMulticast:String = "239.254.254.2";
		public var ipMulticastPort:int = 1935;
		
		private var _running:Boolean = false;
		
		private var frameBufferCount:int = 0;
		private var activeFrames:int = 0;
		private var frames:Vector.<Vector.<Object>>;
		private var s:Sprite = new Sprite();
		
		public function PeerObject(groupID:String/*, serviceURL:String, autoStart:Boolean, frameBuffer:int*/) 
		{
			trace("groupID = " + groupID);
			this.groupID = groupID;
			
			frames = new Vector.<Vector.<Object>>(frameBuffer+1, true);
			for (var i:int = 0; i < frames.length; i++) 
			{
				frames[i] = new Vector.<Object>();
			}
		}
		
		public function connect(serviceURL:String):void
		{
			if (nc == null){
				nc = new NetConnection();
				nc.addEventListener(NetStatusEvent.NET_STATUS, netStatus);
				nc.addEventListener(SecurityErrorEvent.SECURITY_ERROR, netSecurityError);
			}
			trace("serviceURL = " + serviceURL);
			nc.connect(serviceURL);
		}
		
		public function disconnect():void
		{
			if (nc){
				nc.close();
				nc.removeEventListener(NetStatusEvent.NET_STATUS, netStatus);
				nc.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, netSecurityError);
				nc = null;
			}
			if (group) {
				group.removeEventListener(NetStatusEvent.NET_STATUS, netStatus);	
				group.close();
				group = null;
			}
			stop();
		}
		
		private function netSecurityError(e:SecurityErrorEvent):void 
		{
			trace("netSecurityError: " + e);
		}
		
		public function send(payload:Object):void 
		{
			frames[frameBufferCount].push(payload);
		}
		
		public function clearMsgs():void
		{
			for (var j:int = 0; j < frames[frameBufferCount].length; j++) 
			{
				frames[frameBufferCount].splice(0, 1);
			}
		}
		
		public function clearAllMsgs():void
		{
			frames = new Vector.<Vector.<Object>>(frameBuffer+1, true);
			for (var i:int = 0; i < frames.length; i++) 
			{
				frames[i] = new Vector.<Object>();
			}
		}
		
		public function start():void 
		{
			_running = true;
			s.addEventListener(Event.ENTER_FRAME, Update);
		}
		
		public function stop():void 
		{
			_running = false;
			s.removeEventListener(Event.ENTER_FRAME, Update);
		}
		
		private function Update(e:Event):void 
		{
			if (frames[frameBufferCount].length > 0) activeFrames++;
			else clearMsgs();
			
			frameBufferCount++;
			
			if (frameBufferCount >= frames.length) {
				frameBufferCount = 0;
				if (activeFrames != 0) SendMessage();
				activeFrames = 0;
			}
		}
			
		private function SendMessage():void 
		{
			if (dispatchToSelf) MsgReceived(frames);
			if (connected && group && numberOfConnectedPairs > 0) {
				group.sendToAllNeighbors(frames);
			}
			clearAllMsgs();
		}
		
		public function dispose():void
		{
			this.disconnect();
		}
		
		public function onSubPacketReceived(objectID:String=""):Signal 
		{
			if (objectID == "") {
				return onMsg;
			}
			else {
				if (!onMsgs[objectID]) onMsgs[objectID] = new Signal(Object);
				return onMsgs[objectID];
			}
		}
		
		private function netStatus(event:NetStatusEvent):void
		{
			onNetStatusEvent.dispatch(event.info.code);
			
			trace("event.info.code = " + event.info.code);
			switch(event.info.code){
				case "NetConnection.Connect.Success":
					setupGroup();
					break;
				case "NetConnection.Connect.Closed":
					connected = false;
					break;
				case "NetGroup.Connect.Success":
					OnNetGroupConnectSuccess();
					break;
				case "NetGroup.Connect.Rejected":
					OnNetGroupConnectRejected();
					break;
				case "NetGroup.Neighbor.Connect":
					OnNeighborConnect();
					break;
				case "NetGroup.Neighbor.Disconnect":
					OnNeighborDisconnect();
					break;
				case "NetGroup.Posting.Notify":
					MsgReceived(Vector.<Vector.<Object>>(event.info.message));
					break;
				case "NetGroup.SendTo.Notify":
					MsgReceived(Vector.<Vector.<Object>>(event.info.message));
					break;
				
				case "NetGroup.Replication.Request":
					ReplicationRequest(event);
					break;
				case "NetGroup.Replication.Fetch.Result":
					ReplicationResult(event);
					break;
				case "NetConnection.Connect.NetworkChange":
					OnNetworkChange();
					break;
			}
		}
		
		private function OnNetworkChange():void 
		{
			
		}
		
		private function ReplicationRequest(event:NetStatusEvent):void 
		{
			//group.writeRequestedObject(event.info.requestID,obj[event.info.index])
		}
		
		private function ReplicationResult(event:NetStatusEvent):void 
		{
			//group.addHaveObjects(event.info.index,event.info.index);
		}
		
		private function setupGroup():void
		{
			groupspec = new GroupSpecifier(groupID);
			groupspec.peerToPeerDisabled = false;
			groupspec.serverChannelEnabled = true;
			groupspec.ipMulticastMemberUpdatesEnabled = true;
			groupspec.multicastEnabled = true;
			groupspec.postingEnabled = true;
			
			groupspec.routingEnabled = true;
			groupspec.objectReplicationEnabled = true;
			
			groupspec.addIPMulticastAddress(ipMulticast + ":" + ipMulticastPort);
			
			var groupId:String = groupspec.groupspecWithAuthorizations(); 
			
			group = new NetGroup(nc, groupId);
			group.addEventListener(NetStatusEvent.NET_STATUS, netStatus);	
			/*if (CONFIG::air) {
				group.replicationStrategy = NetGroupReplicationStrategy.LOWEST_FIRST;
			}*/
			connected = true;
		}
		
		
		
		private function MsgReceived(frames:Vector.<Vector.<Object>>):void 
		{
			for (var j:int = 0; j < frames.length; j++) 
			{
				if (j == 0) FrameMsgReceived(Vector.<*>(frames[j]));
				else Delay.byFrames(j, FrameMsgReceived, [frames[j]]);
			}
		}
		
		private function FrameMsgReceived(messageObjects:Vector.<*>):void 
		{
			for (var i:int = 0; i < messageObjects.length; i++) 
			{
				onMsg.dispatch(messageObjects[i]);
				
				for (var property:* in messageObjects[i]) {
					if (onMsgs[property]) Signal(onMsgs[property]).dispatch(messageObjects[i][property]);
				}
			}
		}
		
		private function OnNetGroupConnectSuccess():void 
		{
			connected = true;
			if (autoStart) this.start();
		}
		
		private function OnNetGroupConnectRejected():void 
		{
			connected = false;
		}
		
		private function OnNeighborConnect():void 
		{
			numberOfConnectedPairs++;
			neighborConnect.dispatch();
		}
		
		private function OnNeighborDisconnect():void 
		{
			numberOfConnectedPairs--;
			neighborDisconnect.dispatch();
		}
		
		public function get connected():Boolean 
		{
			return _connected;
		}
		
		public function set connected(value:Boolean):void 
		{
			if (_connected == value) return;
			_connected = value;
			if (connected) connectionSuccess.dispatch();
			else connectionRefused.dispatch();
		}
		
		public function get numberOfConnectedPairs():int 
		{
			return _numberOfConnectedPairs;
		}
		
		public function set numberOfConnectedPairs(value:int):void 
		{
			_numberOfConnectedPairs = value;
		}
		
		/*public function get serviceURL():String 
		{
			return _serviceURL;
		}
		
		public function set serviceURL(value:String):void 
		{
			if (_serviceURL == value) return;
			_serviceURL = value;
			this.dispose();
			this.initialize();
		}*/
		
		public function get running():Boolean 
		{
			return _running;
		}
	}
}