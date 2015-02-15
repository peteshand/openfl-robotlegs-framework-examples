package com.imag.robotlegsHaxe.view.starling.display
{
	import robotlegs.bender.bundles.mvcs.Mediator;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ExampleStarlingObjectMediator extends Mediator 
	{
		[Inject] public var view:ExampleStarlingObject;
		
		public function ExampleStarlingObjectMediator():void 
		{
			super();
		}
		
		override public function initialize():void
		{
			view.initialize();
		}
	}
}