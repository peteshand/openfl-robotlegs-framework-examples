package com.imagination.robotlegs.away3d.model.config;

import robotlegs.bender.extensions.config.api.IConfigModel;
import robotlegs.bender.extensions.config.impl.model.BaseConfigModel;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ExampleConfigModel extends BaseConfigModel implements IConfigModel 
{
	public static var example_static_string:String;
	public static var example_static_number:Float;
	
	public var example_int:Int;
	public var example_number:Float;
	public var example_uint:UInt;
	public var example_uint2:UInt;
	
	public var example_string:String;
	public var example_boolean:Bool;
	public var example_array:Array;
	public var example_vector:Array<Int>;
	public var example_XML:XML;
	public var example_JSON:Dynamic;
	
	public function new() { }
}