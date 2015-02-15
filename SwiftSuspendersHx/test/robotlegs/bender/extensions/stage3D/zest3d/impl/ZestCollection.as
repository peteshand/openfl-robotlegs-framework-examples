package robotlegs.bender.extensions.stage3D.zest3d.impl 
{
	import robotlegs.bender.extensions.stage3D.base.impl.BaseCollection;
	import zest3d.applications.Zest3DApplication;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ZestCollection extends BaseCollection
	{
		
		public function ZestCollection(zestCollectionData:Array=null) 
		{
			if (zestCollectionData){
				addItem(Zest3DApplication(zestCollectionData[0]), String(zestCollectionData[1]));
			}
		}
		
		/*============================================================================*/
		/* Public Methods
		/*============================================================================*/
		
		/**
		 * Add Zest3DApplication instance to collection.
		 * 
		 * <p>Instance will be added to dictionary with key as name provided. When 
		 * using this collection with SARS, Zest3DApplication views will be mapped to injector
		 * and differentiated by named injection. Name will be exact same as one
		 * provieded when adding instance to this collection.</p>
		 * 
		 * @param zest3DApplication Zest3DApplication instace to add to collection.
		 * 
		 * @param name Name by which Zest3DApplication instance will be remembered.
		 * 
		 * @return Return number of instances in collection.
		 */
		
		public var zest3DApplications:Vector.<Zest3DApplication> = new Vector.<Zest3DApplication>();
		
		public function addItem(zest3DApplication:Zest3DApplication, name:String):uint
		{
			zest3DApplications.push(zest3DApplication);
			if (_collection[name] == undefined) {
				_collection[name] = zest3DApplication;
				_length++;
			}
			return _length;
		}
		
		/**
		 * Remove Zest3DApplication item from collection by its name.
		 * 
		 * @param name Name by which Zest3DApplication instance was added to collection.
		 * 
		 * @return Returns Zest3DApplication instance which was removed if it is found, or if 
		 * not found by that name, returns <code>null</code>. 
		 */		
		public function removeItem(name:String):Zest3DApplication
		{
			var result:Zest3DApplication = getItem(name);
			
			for (var i:int = 0; i < zest3DApplications.length; i++) 
			{
				if (zest3DApplications[i] == result) zest3DApplications.splice(i, 1);
			}
			//If Zest3DApplication instance is found in collection, remove entry
			if (result) {
				delete _collection[name];
				_length--;
			}
			
			return result;
		}
		
		/**
		 * Get Zest3DApplication instance by name.
		 * 
		 * @param name Name provided when Zest3DApplication instance was added to collection.
		 * 
		 * @return Returns Zest3DApplication instance it it was found, or <code>null</code> 
		 * otherwise.
		 */		
		public function getItem(name:String):Zest3DApplication
		{
			if (_collection[name] == undefined)
				return null;
			
			return Zest3DApplication(_collection[name]);
		}
	}
}