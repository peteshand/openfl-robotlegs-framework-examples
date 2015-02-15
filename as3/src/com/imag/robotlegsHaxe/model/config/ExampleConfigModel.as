package com.imag.robotlegsHaxe.model.config
{
	import robotlegs.bender.extensions.config.api.IConfigModel;
	import robotlegs.bender.extensions.config.impl.model.BaseConfigModel;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ExampleConfigModel extends BaseConfigModel implements IConfigModel 
	{
		public static var example_static_string:String;
		public static var example_static_number:Number;
		
		public var example_int:int;
		public var example_number:Number;
		public var example_uint:uint;
		public var example_uint2:uint;
		
		public var example_string:String;
		public var example_boolean:Boolean;
		public var example_array:Array;
		public var example_vector:Vector.<int>;
		public var example_XML:XML;
		public var example_JSON:Object;
		
		public function ExampleConfigModel() { }
	}
}