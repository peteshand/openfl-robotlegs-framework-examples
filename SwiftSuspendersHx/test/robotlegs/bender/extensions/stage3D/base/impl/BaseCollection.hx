package robotlegs.bender.extensions.stage3D.base.impl;

import flash.utils.Dictionary;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class BaseCollection 
{
	/*============================================================================*/
	/* private Properties
	/*============================================================================*/
	
	/** Collection of all registered views. **/
	private var _collection = new Map<String, Dynamic>();
	
	/**
	 * Total number of view instances in dictionary (since Dictionary doesn't
	 * keep track of number of items in it, and looping through it is expensive).
	 */		
	private var _length:UInt = 0;
	
	public var items(get, null):Map<String, Dynamic>;
	public var length(get, null):UInt;
	
	/**
	 * Get view instances in collection.
	 * 
	 * @return Returns Starling instances collection. 
	 */		
	public function get_items():Map<String, Dynamic>
	{
		return _collection;
	}

	/**
	 * Number of items in collection.
	 */		
	public function get_length():UInt
	{
		return _length;
	}
}