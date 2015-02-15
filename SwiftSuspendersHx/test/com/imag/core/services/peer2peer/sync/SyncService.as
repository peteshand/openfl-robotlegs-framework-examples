package blaze.service.p2p.sync
{
	import com.imag.model.SharedModel;
	import blaze.service.p2p.P2PService;
	import com.imag.model.LocalModel;
	import flash.utils.describeType;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class SyncService 
	{
		private var p2pService:P2PService;
		private var modelSyncObjects:Dictionary= new Dictionary();
		
		public function SyncService() 
		{
			p2pService = new P2PService();
		}
		
		public function map(localModel:Object, sharedModel:Object):SyncObject 
		{
			var localXML:XML = describeType(localModel);
			var sharedXML:XML = describeType(sharedModel);
			var id:String = localXML.@name + "-" + sharedXML.@name;
			if (!modelSyncObjects[id]) {
				modelSyncObjects[id] = new SyncObject(p2pService, localModel, sharedModel);
			}
			return SyncObject(modelSyncObjects[id]);
		}
	}
}