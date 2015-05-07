package com.imagination.robotlegs.starling.view.starling;

import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */
class MainStarlingLayerMediator extends Mediator 
{
	@inject public var view:MainStarlingLayer;
	
	public function new():Void 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
	}
}