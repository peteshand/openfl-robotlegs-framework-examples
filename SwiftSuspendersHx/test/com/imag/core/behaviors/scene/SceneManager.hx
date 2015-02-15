package com.imag.core.behaviors.scene;

import com.imag.core.model.scene.SceneModel;
import msignal.Signal.Signal0;
/**
 * ...
 * @author P.J.Shand
 */
class SceneManager 
{
	public static var sceneModel:SceneModel;
	
	public var onActive = new Signal0();
	public var onInactive = new Signal0();
	private var sceneObjects = new Map<String, SceneObject>();
	
	public function new() 
	{
		SceneManager.sceneModel.change.add(OnSceneChange);
	}
	
	private function OnSceneChange():Void 
	{
		var active:Bool = false;
		for (item in sceneObjects) 
		{
			if (item.uri == SceneManager.sceneModel.uri || item.uri == "*") {
				if (item.mask) {
					active = false;
					break;
				}
				else {
					active = true;
				}
			}
		}
		if (active) {
			onActive.dispatch();
		}
		else {
			onInactive.dispatch();
		}
	}
	
	public function addURI(uri:String):Void 
	{
		sceneObject(uri).mask = false;
		check();
	}
	
	public function maskURI(uri:String):Void 
	{
		sceneObject(uri).mask = true;
		check();
	}
	
	public function check():Void 
	{
		OnSceneChange();
	}
	
	private function sceneObject(uri:String):SceneObject 
	{
		if (sceneObjects[uri] == null) {
			sceneObjects[uri] = new SceneObject(uri);
		}
		return sceneObjects[uri];
	}
}