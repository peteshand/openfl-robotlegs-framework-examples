package robotlegs.bender.extensions.imag.impl.commands.viewportResize;

import flash.display.Stage;
import flash.events.Event;
import robotlegs.bender.bundles.mvcs.Command;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.imag.api.model.stage3DExtension.IViewport;
//import robotlegs.bender.extensions.imag.api.model.stage3DExtension.IViewport;

/**
 * ...
 * @author P.J.Shand
 */
class FullStageViewportCommand extends Command 
{
	@inject public var viewport:IViewport;
	@inject public var contextView:ContextView;
	private var stage:Stage;
	
	public function FullStageViewportCommand() 
	{
		super();
	}
	
	override public function execute():Void
	{
		stage = contextView.view.stage;
		stage.addEventListener(Event.RESIZE, OnStageResize);
	}
	
	private function OnStageResize(e:Event):Void 
	{
		viewport.rect.setTo(0, 0, stage.stageWidth, stage.stageHeight);
	}
}