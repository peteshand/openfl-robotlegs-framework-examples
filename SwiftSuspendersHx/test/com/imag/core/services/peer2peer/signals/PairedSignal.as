package com.imag.core.services.peer2peer.signals 
{
	import com.imag.core.services.peer2peer.IPeerConnection;
	import com.imag.core.services.peer2peer.PeerConnectionCirrus;
	import com.imag.proto.beaconLocator.model.beacon.RegionVO;
	import flash.utils.describeType;
	import org.osflash.signals.Signal;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class PairedSignal extends Signal 
	{
		public static var peerConnection:IPeerConnection;
		
		public function PairedSignal(...rest) 
		{
			super(rest);
			
			if (!peerConnection){
				peerConnection = new PeerConnectionCirrus(describeType(this).@name, "9d665927ed29017b901d0c6c-2978dd023407");
				peerConnection.dispatchToSelf = true;
				peerConnection.onPacketReceived.add(OnPacketReceived);
				peerConnection.connect();
				peerConnection.start();
			}
			
			for (var i:int = 0; i < rest.length; i++) 
			{
				if (rest[i] is Class) {
					peerConnection.register(Class(rest[i]));
				}
			}
		}
		
		override public function dispatch(...rest):void
		{
			peerConnection.send.apply(this, rest);
		}
		
		private function OnPacketReceived(...rest):void 
		{
			super.dispatch.apply(this, rest);
		}
	}
}