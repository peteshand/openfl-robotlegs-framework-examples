package com.imag.core.model.scene;

import com.imag.core.behaviors.scene.SceneManager;
import com.imag.core.model.scene.sceneVO.IModelSceneVO;
import com.imag.core.model.scene.sceneVO.ModelSceneVO;
import msignal.Signal.Signal0;
/**
 * ...
 * @author P.J.Shand
 */
class SceneModel 
{
	private var _scene = new Array<Int>();
	public var change = new Signal0();
	private var _uri:String;
	public var uri(get, set):String;
	
	public function new() 
	{
		SceneManager.sceneModel = this;
	}
	
	public function init():Void 
	{
		
	}
	
	public function get_uri():String 
	{
		return _uri;
	}
	
	public function set_uri(value:String):String 
	{
		if (_uri == value) return value;
		_uri = value;
		change.dispatch();
		return value;
	}
}