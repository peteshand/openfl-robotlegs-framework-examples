package com.imagination.robotlegs.starling.view.starling;
import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
class CheckerboardStarlingLayerMediator extends Mediator 
{
	@inject public var view:CheckerboardStarlingLayer;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
	}
}