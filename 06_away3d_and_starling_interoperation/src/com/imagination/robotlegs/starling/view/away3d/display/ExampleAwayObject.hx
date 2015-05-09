package com.imagination.robotlegs.starling.view.away3d.display;

import away3d.containers.ObjectContainer3D;
import away3d.entities.Mesh;
import away3d.lights.DirectionalLight;
import away3d.materials.ColorMaterial;
import away3d.materials.lightpickers.StaticLightPicker;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;
import openfl.Vector;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class ExampleAwayObject extends ObjectContainer3D 
{
	private var cubes:Vector<Mesh>;
	private var colour:UInt;
	var depth:Int;
	
	public function new(depth:Int=1000, colour:UInt=0xFFFFFF) 
	{
		super();
		this.depth = depth;
		this.colour = colour;
		
	}
	
	public function initialize():Void 
	{
		var light:DirectionalLight = new DirectionalLight();
		var lightPicker:StaticLightPicker = new StaticLightPicker([light]);
		
		var geo:CubeGeometry = new CubeGeometry(60, 60, 60);
		var material:ColorMaterial = new ColorMaterial(colour);
		
		cubes = new Vector<Mesh>();
		for (i in 0...50) 
		{
			var mesh:Mesh = new Mesh(geo, material);
			mesh.rotationX = 45;
			mesh.rotationY = Math.random() * 360;
			mesh.x = (Math.random() * 2000) - 1000;
			mesh.y = (Math.random() * 1500) - 750;
			mesh.z = ((i / 50) * -depth) + depth;
			addChild(mesh);
			cubes.push(mesh);
		}
		
		material.lightPicker = lightPicker;
	}
	
	public function update() 
	{
		for (i in 0...cubes.length) 
		{
			cubes[i].rotationY += 0.5;
		}
	}
}