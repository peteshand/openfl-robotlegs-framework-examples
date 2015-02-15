package robotlegs.bender.extensions.imag.impl.commands.stageSetup;

import flash.display.Stage;
import flash.display.StageAlign;
import flash.display.StageScaleMode;
import robotlegs.bender.bundles.mvcs.Command;
import robotlegs.bender.extensions.contextView.ContextView;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class StageSetupCommand extends Command 
{
	@inject public var contextView:ContextView;
	
	public function new() 
	{
		
	}
	
	override public function execute():Void
	{
		var stage:Stage = contextView.view.stage;
		stage.scaleMode = StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;
	}
}