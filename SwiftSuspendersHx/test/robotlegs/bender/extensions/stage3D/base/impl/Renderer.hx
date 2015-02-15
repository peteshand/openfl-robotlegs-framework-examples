package robotlegs.bender.extensions.stage3D.base.impl;

import msignal.Signal.Signal0;
import openfl.display.Stage3D;
import openfl.display3D.Context3DRenderMode;
import openfl.events.Event;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.stage3D.base.api.ILayer;
import robotlegs.bender.extensions.stage3D.base.api.IRenderer;
import robotlegs.bender.extensions.stage3D.base.api.IViewport;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.ILogger;

/**
 * ...
 * @author P.J.Shand
 * 
 */
@:rtti
class Renderer implements IRenderer
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	private var _injector:IInjector;
	private var _logger:ILogger;
	private var _onReady:Signal0 = new Signal0();
	
	@inject public var contextView:ContextView;
	@inject public var viewport:IViewport;
	
	private var layers = new Array<ILayer>();
	//private var stage3DManager:Stage3DManager;
	//private var _stage3DProxy:Stage3DProxy;
	private var _profile:Dynamic;
	private var freeFreeStage3DIndex:Int = 0;
	private var _stage3D:Stage3D;
	
	public var onReady(get, null):Signal0;
	public var stage3D(get, null):Stage3D;
	public var profile(get, null):String;
	
	/*============================================================================*/
	/* Constructor                                                                */
	/*============================================================================*/
	public function Renderer(context:IContext)
	{
		_injector = context.injector;
		_logger = context.getLogger(this);
	}
	
	public function init(profile:Dynamic, antiAlias:Int=0):Void
	{
		_profile = profile;
		
		_onReady.dispatch();
		
		_stage3D = contextView.view.stage.stage3Ds[freeFreeStage3DIndex];
		stage3D.addEventListener(Event.CONTEXT3D_CREATE, contextCreatedHandler);
		
		var renderMode:Context3DRenderMode = Context3DRenderMode.AUTO;
        stage3D.requestContext3D(Std.string(renderMode));
		freeFreeStage3DIndex++;
	}
	
	private function contextCreatedHandler(e:Event):Void 
	{
		stage3D.context3D.configureBackBuffer(contextView.view.stage.stageWidth, contextView.view.stage.stageHeight, 0, true);
		
		_onReady.dispatch();
		
		viewport.init();
		viewport.onChange.add(OnViewportChange);
		viewport.rect.setTo(0, 0, contextView.view.stage.stageWidth, contextView.view.stage.stageHeight);
	}
	
	private function OnViewportChange():Void 
	{
		stage3D.x = viewport.rect.x;
		stage3D.y = viewport.rect.y;
		
		if (stage3D.context3D != null) {
			stage3D.context3D.configureBackBuffer(cast(viewport.rect.width, Int), cast(viewport.rect.height, Int), 0, true);
		}
		
		for (i in 0...layers.length)
		{
			layers[i].rect = viewport.rect;
		}
	}
	
	public function start():Void
	{
		contextView.view.stage.addEventListener(Event.ENTER_FRAME, Update);
	}
	
	public function stop():Void
	{
		contextView.view.stage.removeEventListener(Event.ENTER_FRAME, Update);
	}
	
	public function addLayer(layer:ILayer):Void
	{
		layers.push(layer);
	}
	
	public function addLayerAt(layer:ILayer, index:Int):Void
	{
		if (layers.length < index) {
			trace("[Renderer, addLayerAt], index outside bounds, reverting to addLayer");
			addLayer(layer);
			return;
		}
		
		//layers.splice(index, 0, layer);
		
		// CHECK
		var copyLayers = layers.copy();
		layers = new Array<ILayer>();
		for (i in 0...copyLayers.length) 
		{
			if (i == index) {
				layers.push(layer);
			}
			layers.push(copyLayers[i]);
		}
	}
	
	public function removeLayer(layer:ILayer):Void
	{
		for (i in 0...layers.length) 
		//for (var i:Int = 0; i < layers.length; i++) 
		{
			if (layers[i] == layer) {
				layers.splice(i, 1);
			}
		}
	}
	
	public function render():Void
	{
		Update(null);
	}
	
	private function Update(e:Event):Void 
	{
		if (layers.length == 0) return;
		
		if (_stage3D == null) return;
		if (_stage3D.context3D == null) return;
		
		stage3D.context3D.clear();
		for (i in 0...layers.length) 
		{
			layers[i].process();
		}
		stage3D.context3D.present();
	}
	
	public function get_onReady():Signal0
	{
		return _onReady;
	}
	
	public function get_stage3D():Stage3D 
	{
		return _stage3D;
	}
	
	
	public function get_profile():String 
	{
		return _profile;
	}
}