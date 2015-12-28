package com.imagination.interoperation.view.away3d;

import away3d.cameras.lenses.PerspectiveLens;
import away3d.core.managers.Stage3DProxy;
import away3d.entities.Mesh;
import away3d.materials.ColorMaterial;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;
import com.imagination.interoperation.view.away3d.cubes.Cubes;
import openfl.events.Event;
import robotlegs.bender.extensions.stage3D.away3d.impl.AwayLayer;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class MainAwayLayer extends AwayLayer 
{
	var cubes:Cubes;
	
	public function new(profile:String) 
	{
		super(profile);
	}
	
	public function initialize():Void 
	{
		cubes = new Cubes();
		scene.addChild(cubes);
		
		cast(camera.lens, PerspectiveLens).fieldOfView = 60;
		
		this.stage.addEventListener(Event.ENTER_FRAME, Update);
	}
	
	private function Update(e:Event):Void 
	{
		cubes.update();
	}
	
	override public function process():Void
	{
		this.render();
	}
}