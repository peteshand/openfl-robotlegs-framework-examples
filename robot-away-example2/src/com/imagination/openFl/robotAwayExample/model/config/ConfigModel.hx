package com.imagination.openFl.robotAwayExample.model.config;

import robotlegs.bender.extensions.imag.api.model.config.IConfigModel;
import robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
class ConfigModel extends BaseConfigModel implements IConfigModel 
{
	public var test:String;
	public var test1:Int;
	public static var test2:Int;
	public var testProperty:String;
	
	public function new()
	{
		super();
	}
}