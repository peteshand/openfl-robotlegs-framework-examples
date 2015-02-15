package com.imag.robotlegsHaxe.view.away3d.display
{
	import robotlegs.bender.bundles.mvcs.Mediator;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ExampleAwayObjectMediator extends Mediator 
	{
		[Inject] public var view:ExampleAwayObject;
		
		public function ExampleAwayObjectMediator():void 
		{
			super();
		}
		
		override public function initialize():void
		{
			view.initialize();
		}
	}
}