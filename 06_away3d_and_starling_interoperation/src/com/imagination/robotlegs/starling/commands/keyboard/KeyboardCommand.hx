package com.imagination.robotlegs.starling.commands.keyboard;

import com.imagination.robotlegs.starling.definitions.scene.SceneIDs;
import robotlegs.bender.bundles.mvcs.Command;
import robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap;
import robotlegs.bender.extensions.imag.impl.model.scene.SceneModel;
	
/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class KeyboardCommand extends Command 
{
	@inject public var sceneModel:SceneModel;
	@inject public var keyboardMap:IKeyboardMap;
	
	public function new() { }
	
	override public function execute():Void
	{
		keyboardMap.map(SetScene, "1", {params:[SceneIDs.XXX]});
	}
	
	private function SetScene(uri:String):Void 
	{
		sceneModel.uri = uri;
	}
}