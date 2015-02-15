package com.imag.core.services.peer2peer 
{
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class PeerConnectionServer extends PeerConnection 
	{
		private var serverURL:String;
		
		public function PeerConnectionServer(groupID:String, serverURL:String) 
		{
			super(groupID);
			this.serverURL = serverURL;
		}
		
		override public function connect():void
		{
			peerObject.connect("rtmfp://" + serverURL + "/multicast/");
		}
	}
}