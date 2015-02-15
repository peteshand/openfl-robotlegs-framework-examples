package com.imag.core.services.peer2peer 
{
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class PeerConnectionCirrus extends PeerConnection 
	{
		private var key:String;
		
		public function PeerConnectionCirrus(groupID:String, key:String) 
		{
			super(groupID);	
			this.key = key;
		}
		
		override public function connect():void
		{
			peerObject.connect("rtmfp://p2p.rtmfp.net/" + key + "/");
		}
	}
}