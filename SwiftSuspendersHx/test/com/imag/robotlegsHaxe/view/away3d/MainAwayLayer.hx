package com.imag.robotlegsHaxe.view.away3d;

import away3d.core.managers.Stage3DProxy;
import away3d.entities.Mesh;
import away3d.materials.ColorMaterial;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;
import com.imag.robotlegsHaxe.view.away3d.display.ExampleAwayObject;
import openfl.events.Event;
import robotlegs.bender.extensions.stage3D.away3d.impl.AwayLayer;

/**
 * ...
 * @author P.J.Shand
 */
class MainAwayLayer extends AwayLayer 
{
	var exampleAwayObject:ExampleAwayObject;
	public function new(profile:String) 
	{
		super(profile);
	}
	
	public function initialize():Void 
	{
		exampleAwayObject = new ExampleAwayObject();
		scene.addChild(exampleAwayObject);
		
		/*var geo:CubeGeometry = new CubeGeometry(600, 500, 500);
		var material:ColorMaterial = new ColorMaterial(0xFF00FF);
		var mesh:Mesh = new Mesh(geo, material);
		mesh.rotationX = 45;
		scene.addChild(mesh);*/
		
		//trace("numChildren = " + scene.numChildren);
		//trace("initialize numTriangles = " + this.entityCollector.numTriangles);
		//this.render();
		
		this.stage.addEventListener(Event.ENTER_FRAME, Update);
	}
	
	private function Update(e:Event):Void 
	{
		exampleAwayObject.rotationY += 1;
	}
	
	override public function process():Void
	{
		this.render();
	}
}