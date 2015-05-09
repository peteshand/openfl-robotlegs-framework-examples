package com.imagination.robotlegs.starling.view.away3d;

import away3d.core.managers.Stage3DProxy;
import away3d.entities.Mesh;
import away3d.materials.ColorMaterial;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;
import com.imagination.robotlegs.starling.view.away3d.display.ExampleAwayObject;
import openfl.events.Event;
import robotlegs.bender.extensions.stage3D.away3d.impl.AwayLayer;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainAwayLayer2 extends AwayLayer 
{
	var exampleAwayObject:ExampleAwayObject;
	public function new(profile:String) 
	{
		super(profile);
	}
	
	public function initialize():Void 
	{
		exampleAwayObject = new ExampleAwayObject(400, 0x55FF99);
		scene.addChild(exampleAwayObject);
		
		exampleAwayObject.z = -400;
		this.stage.addEventListener(Event.ENTER_FRAME, Update);
	}
	
	private function Update(e:Event):Void 
	{
		exampleAwayObject.update();
	}
	
	override public function process():Void
	{
		this.render();
	}
}