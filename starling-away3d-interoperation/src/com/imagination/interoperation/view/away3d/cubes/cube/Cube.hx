package com.imagination.interoperation.view.away3d.cubes.cube;

import away3d.containers.ObjectContainer3D;
import away3d.core.base.Geometry;
import away3d.entities.Mesh;
import away3d.lights.DirectionalLight;
import away3d.materials.lightpickers.StaticLightPicker;
import away3d.materials.MaterialBase;

/**
 * ...
 * @author P.J.Shand
 */
class Cube extends ObjectContainer3D
{
	private var geo:Geometry;
	private var material:MaterialBase;
	private var count:Int;
	private var amp:Int;
	var mesh:Mesh;
	
	public function new(geo:Geometry, material:MaterialBase) 
	{
		super();
		this.material = material;
		this.geo = geo;
		
		count = cast Math.random() * 360;
		amp = cast Math.random() * 50;
		
		mesh = new Mesh(geo, material);
		mesh.rotationX = 45;
		mesh.rotationY = Math.random() * 360;
		mesh.x = (Math.random() * 3000) - 1500;
		mesh.y = (Math.random() * 1500) - 750;
		addChild(mesh);
	}
	
	public function update() 
	{
		if (mesh != null) {
			mesh.rotationY += 0.5;
		}
		this.y = Math.sin(count / 180 * Math.PI) * amp;
		count++;
	}
	
}