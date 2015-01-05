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
class StageSetupCommand extends Command 
{
	@inject public var contextView:ContextView;
	
	public function StageSetupCommand() 
	{
		super();
	}
	
	override public function execute():Void
	{
		var stage:Stage = contextView.view.stage;
		stage.scaleMode = StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;
	}
}