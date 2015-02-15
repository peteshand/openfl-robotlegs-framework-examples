package robotlegs.bender.extensions.stage3D.away3d.impl ;

import away3d.containers.View3D;
import robotlegs.bender.extensions.stage3D.base.impl.BaseCollection;
/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class AwayCollection extends BaseCollection
{
	
	public function new(awayCollectionData:Array<Dynamic>) 
	{
		if (awayCollectionData != null){
			addItem(cast(awayCollectionData[0], View3D), cast(awayCollectionData[1], String));
		}
	}
	
	/*============================================================================*/
	/* Public Methods
	/*============================================================================*/
	
	/**
	 * Add View3D instance to collection.
	 * 
	 * <p>Instance will be added to dictionary with key as name provided. When 
	 * using this collection with SARS, View3D views will be mapped to injector
	 * and differentiated by named injection. Name will be exact same as one
	 * provieded when adding instance to this collection.</p>
	 * 
	 * @param view3D View3D instace to add to collection.
	 * 
	 * @param name Name by which View3D instance will be remembered.
	 * 
	 * @return Return number of instances in collection.
	 */
	
	public var view3Ds:Array<View3D> = new Array<View3D>();
	
	public function addItem(view3D:View3D, name:String):UInt
	{
		view3Ds.push(view3D);
		// CHECK
		if (_collection[name] == null) {
			_collection[name] = view3D;
			_length++;
		}
		return _length;
	}
	
	/**
	 * Remove View3D item from collection by its name.
	 * 
	 * @param name Name by which View3D instance was added to collection.
	 * 
	 * @return Returns View3D instance which was removed if it is found, or if 
	 * not found by that name, returns <code>null</code>. 
	 */		
	public function removeItem(name:String):View3D
	{
		var result:View3D = getItem(name);
		
		for (i in 0...view3Ds.length) 
		//for (var i:Int = 0; i < view3Ds.length; i++) 
		{
			if (view3Ds[i] == result) view3Ds.splice(i, 1);
		}
		//If View3D instance is found in collection, remove entry
		if (result != null) {
			_collection.remove(name);
			_length--;
		}
		return result;
	}
	
	/**
	 * Get View3D instance by name.
	 * 
	 * @param name Name provided when View3D instance was added to collection.
	 * 
	 * @return Returns View3D instance it it was found, or <code>null</code> 
	 * otherwise.
	 */		
	public function getItem(name:String):View3D
	{
		// CHECK
		if (_collection[name] == null) return null;
		return cast(_collection[name], View3D);
	}
}