package robotlegs.bender.extensions.imag.impl.commands.viewportResize;

import flash.display.Stage;
import flash.events.Event;
#if js
import js.Browser;
import js.html.CanvasElement;
import js.html.DivElement;
import lime.ui.Window;
#end

import robotlegs.bender.bundles.mvcs.Command;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.stage3D.base.api.IViewport;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class FullStageViewportCommand extends Command 
{
	@inject public var viewport:IViewport;
	@inject public var contextView:ContextView;
	private var stage:Stage;
	private var resizeCount:Int;
	private var canvas:CanvasElement;
	private var div:DivElement;
	
	public function new() 
	{
		
	}
	
	override public function execute():Void
	{
		stage = contextView.view.stage;
		stage.addEventListener(Event.RESIZE, OnStageResize);
		
		#if js
			Browser.window.addEventListener ("resize", OnWindowResize, false);
			stage.addEventListener(Event.ENTER_FRAME, JSResizer);
		#end
	}
	
	private function OnStageResize(e:Event):Void 
	{
		viewport.rect.setTo(0, 0, stage.stageWidth, stage.stageHeight);
	}
	
	#if js
	private function OnWindowResize (event:js.html.Event):Void
	{
		UpdateWindowDimensions();
		resizeCount = 0;
	}
	
	private function JSResizer(e:Event):Void 
	{
		if (resizeCount < 2) {
			
			UpdateWindowDimensions();
		}
		resizeCount++;
	}
	
	private function UpdateWindowDimensions():Void
	{
		var width = Browser.window.innerWidth;
		var height = Browser.window.innerHeight;
		
		viewport.rect.setTo(0, 0, width, height);
		
		var openflContent = Browser.document.getElementById('openfl-content');
		openflContent.style.width = width + 'px';
		openflContent.style.height = height + 'px';
		
		trace(div);
		div = cast(openflContent.childNodes[0]);
		div.style.width = width + 'px';
		div.style.height = height + 'px';
		
		canvas = cast(div.childNodes[0]);
		if (canvas != null){
			canvas.width = width;
			canvas.height = height;
			
			trace("canvas.width = " + canvas.width);
		}
	}
	
	#end
}