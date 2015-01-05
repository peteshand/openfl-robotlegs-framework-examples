package robotlegs.bender.extensions.imag.impl.services.stage3DExtension;

import away3d.core.managers.Stage3DManager;
import away3d.core.managers.Stage3DProxy;
import away3d.events.Stage3DEvent;
import msignal.Signal.Signal0;
import openfl.events.Event;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.extensions.imag.api.model.stage3DExtension.IViewport;
import robotlegs.bender.extensions.imag.api.services.stage3DExtension.IRenderer;
import robotlegs.bender.extensions.imag.api.view.stage3DExtension.ILayer;
import robotlegs.bender.framework.api.IInjector;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.api.ILogger;

/**
 * ...
 * @author P.J.Shand
 * 
 */
class Renderer implements IRenderer
{
	/*============================================================================*/
	/* Private Properties                                                         */
	/*============================================================================*/
	private var _injector:IInjector;
	private var _logger:ILogger;
	private var _onReady = new Signal0();
	
	@inject public var contextView:ContextView;
	@inject public var viewport:IViewport;
	
	private var layers:Array<ILayer> = new Array<ILayer>();
	private var stage3DManager:Stage3DManager;
	private var _stage3DProxy:Stage3DProxy;
	private var _profile:String;
	
	/*============================================================================*/
	/* Constructor                                                                */
	/*============================================================================*/
	public function Renderer(context:IContext)
	{
		_injector = context.injector;
		_logger = context.getLogger(this);
	}
	
	public function init(profile:String, antiAlias:Int=4):Void
	{
		_profile = profile;
		
		stage3DManager = Stage3DManager.getInstance(contextView.view.stage);
		_stage3DProxy = stage3DManager.getFreeStage3DProxy(false, profile);
		_stage3DProxy.enableDepthAndStencil = true;
		
		_stage3DProxy.addEventListener(Stage3DEvent.CONTEXT3D_CREATED, onContextCreated);
		_stage3DProxy.antiAlias = antiAlias;
	}
	
	private function onContextCreated(e:Stage3DEvent):Void 
	{
		_onReady.dispatch();
		
		viewport.init();
		viewport.onChange.add(OnViewportChange);
		viewport.rect.setTo(0, 0, contextView.view.stage.stageWidth, contextView.view.stage.stageHeight);
	}
	
	private function OnViewportChange():Void 
	{
		_stage3DProxy.x = viewport.rect.x;
		_stage3DProxy.y = viewport.rect.y;
		_stage3DProxy.width = viewport.rect.width;
		_stage3DProxy.height = viewport.rect.height;
		
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
			trace("[Renderer, addLayerAt], index outside bounds, reverting to addLayerAt");
			addLayer(layer);
			return;
		}
		layers.splice(index, 0, layer);
	}
	
	public function removeLayer(layer:ILayer):Void
	{
		for (i in 0...layers.length)
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
		
		stage3DProxy.clear();
		for (i in 0...layers.length)
		{
			layers[i].update();
		}
		stage3DProxy.present();
	}
	
	public var onReady(get, null):Signal0;
	public function get_onReady():Signal0 
	{
		return _onReady;
	}
	
	public var stage3DProxy(get, null):Stage3DProxy;
	public function get_stage3DProxy():Stage3DProxy 
	{
		return _stage3DProxy;
	}
	
	public var profile(get, null):String;
	public function get_profile():String 
	{
		return _profile;
	}
}