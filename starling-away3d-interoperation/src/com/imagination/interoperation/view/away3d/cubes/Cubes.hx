package com.imagination.interoperation.view.away3d.cubes;

import away3d.containers.ObjectContainer3D;
import away3d.entities.Mesh;
import away3d.lights.DirectionalLight;
import away3d.materials.ColorMaterial;
import away3d.materials.lightpickers.StaticLightPicker;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;
import com.imagination.interoperation.view.away3d.cubes.cube.Cube;
import openfl.Vector;

/**
 * ...
 * @author P.J.Shand
 */

@:rtti
@:keepSub
class Cubes extends ObjectContainer3D 
{
	private var cubes:Vector<Cube>;
	private var colour:UInt;
	private var depth:Int;
	
	public function new(depth:Int=1000, colour:UInt=0xFFFFFF) 
	{
		super();
		this.depth = depth;
		this.colour = colour;
		trace("Cubes");
	}
	
	public function initialize():Void 
	{
		trace("Cubes initialize");
		var light:DirectionalLight = new DirectionalLight();
		var lightPicker:StaticLightPicker = new StaticLightPicker([light]);
		
		var geo:CubeGeometry = new CubeGeometry(60, 60, 60);
		var material:ColorMaterial = new ColorMaterial(colour);
		material.lightPicker = lightPicker;
		
		cubes = new Vector<Cube>();
		for (i in 0...50) 
		{
			var cube:Cube = new Cube(geo, material);
			addChild(cube);
			cube.z = ((i / 50) * -depth) + depth;
			cubes.push(cube);
		}
	}
	
	public function update() 
	{
		for (i in 0...cubes.length) 
		{
			cubes[i].update();
		}
	}
}