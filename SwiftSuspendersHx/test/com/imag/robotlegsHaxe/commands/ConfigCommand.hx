package com.imag.robotlegsHaxe.commands;

import robotlegs.bender.bundles.mvcs.Command;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class ConfigCommand extends Command
{
	//[Inject] public var comService:RTMFPComService;
	//[Inject] public var configModel:ConfigModel;
	
	public function new() 
	{
		
	}
	
	override public function execute():Void
	{
		trace("execute ConfigCommand");
	}
}