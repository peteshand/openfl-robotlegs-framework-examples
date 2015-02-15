package com.imag.core.services.peer2peer 
{
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class PeerConnectionServerless extends PeerConnection 
	{
		
		public function PeerConnectionServerless(groupID:String) 
		{
			super(groupID);
			
		}
		
		override public function connect():void
		{
			peerObject.connect("rtmfp://");
		}
	}
}