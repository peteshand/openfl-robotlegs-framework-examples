package com.imagination.robotlegs.away3d.view.away3d.display;

import away3d.containers.ObjectContainer3D;
import away3d.entities.Mesh;
import away3d.materials.ColorMaterial;
import away3d.materials.TextureMaterial;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;
import away3d.textures.BitmapTexture;
import openfl.Assets;

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
		var bmd = Assets.getBitmapData("img/woodBox.jpg");
		var texture = new BitmapTexture(bmd, true);
		var material = new TextureMaterial(texture);
		var geo = new CubeGeometry(600, 500, 500, 1, 1, 1, false);
		//var material = new ColorMaterial(0xFF00FF);
		var mesh = new Mesh(geo, material);
		mesh.rotationX = 45;
		addChild(mesh);
	}
}