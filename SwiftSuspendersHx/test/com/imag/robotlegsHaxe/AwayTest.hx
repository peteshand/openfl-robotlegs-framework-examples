package com.imag.robotlegsHaxe;

import away3d.containers.View3D;
import away3d.entities.Mesh;
import away3d.materials.ColorMaterial;
import away3d.primitives.CubeGeometry;
import openfl.display.Sprite;
import openfl.events.Event;

/**
 * ...
 * @author P.J.Shand
 */
class AwayTest extends Sprite
{
	var view3d:View3D;

	public function new() 
	{
		super();
		
		view3d = new View3D();
		addChild(view3d);
		
		var geo:CubeGeometry = new CubeGeometry(500, 500, 500);
		var material:ColorMaterial = new ColorMaterial(0xFF0000);
		var mesh:Mesh = new Mesh(geo, material);
		mesh.rotationX = 45;
		view3d.scene.addChild(mesh);
		
		addEventListener(Event.ENTER_FRAME, Update);
	}
	
	private function Update(e:Event):Void 
	{
		view3d.render();
	}
}