package com.imagination.interoperation.commands.example;
import com.imagination.interoperation.model.example.ExampleModel;
import robotlegs.bender.bundles.mvcs.Command;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ExampleCommand extends Command 
{
	@inject public var exampleModel:ExampleModel;
	
	public function new() { }
	
	override public function execute():Void
	{
		exampleModel.value = 1;
	}
}