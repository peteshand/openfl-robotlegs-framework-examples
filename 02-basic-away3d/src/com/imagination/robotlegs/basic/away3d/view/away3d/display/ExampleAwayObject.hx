package com.imagination.robotlegs.basic.away3d.view.away3d.display;

import away3d.containers.ObjectContainer3D;
import away3d.entities.Mesh;
import away3d.materials.ColorMaterial;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ExampleAwayObject extends ObjectContainer3D 
{
	public function new() 
	{
		super();
	}
	
	public function initialize():Void 
	{
		var geo:CubeGeometry = new CubeGeometry(600, 500, 500);
		var material:ColorMaterial = new ColorMaterial(0xFF00FF);
		var mesh:Mesh = new Mesh(geo, material);
		mesh.rotationX = 45;
		addChild(mesh);
	}
}