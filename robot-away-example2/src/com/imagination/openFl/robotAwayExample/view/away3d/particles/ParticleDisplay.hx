package com.imagination.openFl.robotAwayExample.view.away3d.particles;

import away3d.animators.data.ParticleProperties;
import away3d.animators.data.ParticlePropertiesMode;
import away3d.animators.nodes.ParticleBillboardNode;
import away3d.animators.nodes.ParticleVelocityNode;
import away3d.animators.ParticleAnimationSet;
import away3d.animators.ParticleAnimator;
import away3d.containers.ObjectContainer3D;
import away3d.core.base.Geometry;
import away3d.entities.Mesh;
import away3d.materials.TextureMaterial;
import away3d.primitives.PlaneGeometry;
import away3d.tools.helpers.ParticleGeometryHelper;
import away3d.utils.Cast;
import openfl.geom.Vector3D;

/**
 * ...
 * @author P.J.Shand
 */
class ParticleDisplay extends ObjectContainer3D
{
	var _particleAnimationSet:ParticleAnimationSet;
	var _particleMesh:Mesh;
	var _particleAnimator:ParticleAnimator;
	
	public function new() 
	{
		super();
		
	}
	
	public function initialize() 
	{
		//setup the particle geometry
		var plane:Geometry = new PlaneGeometry(20, 20, 1, 1, false);
		var geometrySet:Array<Geometry> = new Array<Geometry>();
		for (i in 0...1000){
			geometrySet.push(plane);
		}
		
		//setup the particle animation set
		_particleAnimationSet = new ParticleAnimationSet(true, true);
		_particleAnimationSet.addAnimation(new ParticleBillboardNode());
		_particleAnimationSet.addAnimation(new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
		_particleAnimationSet.initParticleFunc = initParticleFunc;
		
		//setup the particle material
		var material:TextureMaterial = new TextureMaterial(Cast.bitmapTexture("assets/img/blue.png"));
		material.alphaBlending = true;
		//material.blendMode = BlendMode.ADD;
		
		//setup the particle animator and mesh
		_particleAnimator = new ParticleAnimator(_particleAnimationSet);
		_particleMesh = new Mesh(ParticleGeometryHelper.generateGeometry(geometrySet), material);
		_particleMesh.animator = _particleAnimator;
		addChild(_particleMesh);
		
		//start the animation
		_particleAnimator.autoUpdate = true;
		_particleAnimator.start();
	}
	
	private function initParticleFunc(prop:ParticleProperties)
	{
		prop.startTime = Math.random()*5 - 5;
		prop.duration = 5;
		var degree1:Float = Math.random() * Math.PI ;
		var degree2:Float = Math.random() * Math.PI * 2;
		var r:Float = Math.random() * 50 + 400;
		prop.nodes.set(ParticleVelocityNode.VELOCITY_VECTOR3D, new Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2)));
	}
}