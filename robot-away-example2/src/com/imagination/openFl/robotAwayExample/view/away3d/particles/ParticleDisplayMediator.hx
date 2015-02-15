package com.imagination.openFl.robotAwayExample.view.away3d.particles;

import robotlegs.bender.bundles.mvcs.Mediator;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
class ParticleDisplayMediator extends Mediator 
{
	@inject public var view:ParticleDisplay;
	
	public function new() 
	{
		
	}
	
	override public function initialize():Void
	{
		view.initialize();
	}
}