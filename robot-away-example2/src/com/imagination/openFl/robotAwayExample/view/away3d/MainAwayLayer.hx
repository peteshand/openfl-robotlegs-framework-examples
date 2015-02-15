package com.imagination.openFl.robotAwayExample.view.away3d;

import away3d.containers.ObjectContainer3D;
import away3d.core.managers.Stage3DProxy;
import away3d.entities.Mesh;
import away3d.materials.ColorMaterial;
import away3d.materials.methods.EnvMapMethod;
import away3d.primitives.CubeGeometry;
import away3d.primitives.PlaneGeometry;
import away3d.primitives.SkyBox;
import away3d.primitives.TorusGeometry;
import away3d.textures.BitmapCubeTexture;
import away3d.utils.Cast;
import com.imagination.openFl.robotAwayExample.view.away3d.display.ExampleAwayObject;
import com.imagination.openFl.robotAwayExample.view.away3d.particles.ParticleDisplay;
import openfl.display.BitmapData;
import openfl.events.Event;
import openfl.events.MouseEvent;
import openfl.geom.Point;
import robotlegs.bender.extensions.stage3D.away3d.impl.AwayLayer;

/**
 * ...
 * @author P.J.Shand
 */

class MainAwayLayer extends AwayLayer 
{
	var exampleAwayObject:ExampleAwayObject;
	var _torus:Mesh;
	var _skyBox:SkyBox;
	var cameraContainer:ObjectContainer3D;
	public var targetRotation:Point = new Point();
	public var delay:Int = 5;
	
	public function new(profile:String) 
	{
		super(profile);
	}
	
	public function initialize():Void 
	{
		exampleAwayObject = new ExampleAwayObject();
		//scene.addChild(exampleAwayObject);
		
		cameraContainer = new ObjectContainer3D();
		scene.addChild(cameraContainer);
		
		cameraContainer.addChild(camera);
		
		addSkybox();
		
		
		//var particleDisplay:ParticleDisplay = new ParticleDisplay();
		//scene.addChild(particleDisplay);
		
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
	
	
	
	
	
	function addSkybox() 
	{
		//setup the cube texture
		
		var cubeTexture:BitmapCubeTexture = new BitmapCubeTexture(
				Cast.bitmapData("img/skybox/snow_positive_x.jpg"), 
				Cast.bitmapData("img/skybox/snow_negative_x.jpg"), 
				Cast.bitmapData("img/skybox/snow_positive_y.jpg"), 
				Cast.bitmapData("img/skybox/snow_negative_y.jpg"), 
				Cast.bitmapData("img/skybox/snow_positive_z.jpg"), 
				Cast.bitmapData("img/skybox/snow_negative_z.jpg"));
				
		var material:ColorMaterial = new ColorMaterial(0xFFFFFF, 1);
		material.specular = 0.5;
		material.ambient = 0.25;
		material.ambientColor = 0x111199;
		material.ambient = 1;
		material.addMethod(new EnvMapMethod(cubeTexture, 1));
		
		//setup the scene
		_torus = new Mesh(new TorusGeometry(150, 60, 40, 20), material);
		scene.addChild(_torus);
		
		_skyBox = new SkyBox(cubeTexture);
		scene.addChild(_skyBox);
	}
	
	private function Update(e:Event):Void 
	{
		exampleAwayObject.rotationY += 1;
	}
	
	override public function process():Void
	{
		cameraContainer.rotationX = ((cameraContainer.rotationX * delay) + targetRotation.x) / (delay + 1);
		cameraContainer.rotationY = ((cameraContainer.rotationY * delay) + targetRotation.y) / (delay + 1);
		
		
		this.render();
	}
}