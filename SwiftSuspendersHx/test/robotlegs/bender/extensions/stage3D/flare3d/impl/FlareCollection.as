package robotlegs.bender.extensions.stage3D.flare3d.impl 
{
	import flare.basic.Viewer3D;
	import robotlegs.bender.extensions.stage3D.base.impl.BaseCollection;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class FlareCollection extends BaseCollection
	{
		
		public function FlareCollection(flareCollectionData:Array=null) 
		{
			if (flareCollectionData){
				addItem(Viewer3D(flareCollectionData[0]), String(flareCollectionData[1]));
			}
		}
		
		/*============================================================================*/
		/* Public Methods
		/*============================================================================*/
		
		/**
		 * Add Viewer3D instance to collection.
		 * 
		 * <p>Instance will be added to dictionary with key as name provided. When 
		 * using this collection with SARS, Viewer3D views will be mapped to injector
		 * and differentiated by named injection. Name will be exact same as one
		 * provieded when adding instance to this collection.</p>
		 * 
		 * @param viewer3D Viewer3D instace to add to collection.
		 * 
		 * @param name Name by which Viewer3D instance will be remembered.
		 * 
		 * @return Return number of instances in collection.
		 */
		
		public var view3Ds:Vector.<Viewer3D> = new Vector.<Viewer3D>();
		
		public function addItem(viewer3D:Viewer3D, name:String):uint
		{
			view3Ds.push(viewer3D);
			if (_collection[name] == undefined) {
				_collection[name] = viewer3D;
				_length++;
			}
			return _length;
		}
		
		/**
		 * Remove Viewer3D item from collection by its name.
		 * 
		 * @param name Name by which Viewer3D instance was added to collection.
		 * 
		 * @return Returns Viewer3D instance which was removed if it is found, or if 
		 * not found by that name, returns <code>null</code>. 
		 */		
		public function removeItem(name:String):Viewer3D
		{
			var result:Viewer3D = getItem(name);
			
			for (var i:int = 0; i < view3Ds.length; i++) 
			{
				if (view3Ds[i] == result) view3Ds.splice(i, 1);
			}
			//If Viewer3D instance is found in collection, remove entry
			if (result) {
				delete _collection[name];
				_length--;
			}
			
			return result;
		}
		
		/**
		 * Get Viewer3D instance by name.
		 * 
		 * @param name Name provided when Viewer3D instance was added to collection.
		 * 
		 * @return Returns Viewer3D instance it it was found, or <code>null</code> 
		 * otherwise.
		 */		
		public function getItem(name:String):Viewer3D
		{
			if (_collection[name] == undefined)
				return null;
			
			return Viewer3D(_collection[name]);
		}
	}

}