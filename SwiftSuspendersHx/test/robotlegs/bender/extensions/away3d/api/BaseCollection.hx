package robotlegs.bender.extensions.away3d.api;

import flash.utils.Dictionary;

/**
 * ...
 * @author P.J.Shand
 */
class BaseCollection 
{
	/*============================================================================*/
	/* Protected Properties
	/*============================================================================*/
	
	/** Collection of all registered views. **/
	private var _collection:Dictionary = new Dictionary(true);
	
	/**
	 * Total number of Starling instances in dictionary (since Dictionary doesn't
	 * keep track of number of items in it, and looping through it is expensive).
	 */		
	private var _length:UInt = 0;
	
	public function BaseCollection() 
	{
		
	}
	
	
	/**
	 * Get Starling instances in collection.
	 * 
	 * @return Returns Starling instances collection. 
	 */		
	public function get items():Dictionary
	{
		return _collection;
	}

	/**
	 * Number of items in collection.
	 */		
	public function get length():UInt
	{
		return _length;
	}
}