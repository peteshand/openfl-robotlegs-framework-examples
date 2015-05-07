package com.imagination.robotlegs.starling.view.starling;
import openfl.Assets;
import openfl.display.BitmapData;
import openfl.display.Sprite;
import openfl.events.Event;
import robotlegs.bender.extensions.stage3D.starling.impl.StarlingLayer;
import starling.core.Starling;
import starling.display.Quad;
import starling.extensions.ParticleSystem;
import starling.extensions.PDParticleSystem;
import starling.textures.Texture;



/**
 * ...
 * @author P.J.Shand
 */
class MainStarlingLayer extends StarlingLayer
{
	private var mParticleSystem:ParticleSystem;
	private var broadcast:Sprite;
	private var time:Float = 0;
	
	public function new() 
	{
		super();
	}
	
	public function initialize():Void 
	{
		trace("MainStarlingLayer initialize");
		
		var quad:Quad = new Quad(200, 200, 0xFFFF0000);
		addChild(quad);
		
		/*var psConfig:Xml = Xml.parse(Assets.getText("img/stars.pex"));
		var starsParticle:BitmapData = Assets.getBitmapData("img/stars.png");
		
		var psTexture:Texture = Texture.fromBitmapData(starsParticle);

		mParticleSystem = new PDParticleSystem(psConfig, psTexture);
		mParticleSystem.emitterX = 400;
		mParticleSystem.emitterY = 300;
		mParticleSystem.maxCapacity = 100;
		mParticleSystem.emissionRate = 50;
		this.addChild(mParticleSystem);

		//Starling.Juggler.add(mParticleSystem);
		
		mParticleSystem.start();
		
		//
		*/
		broadcast = new Sprite();
		broadcast.addEventListener(Event.ENTER_FRAME, Update);
	}
	
	private function Update(e:Event):Void 
	{
		//mParticleSystem.advanceTime(time);
		//time++;
		
		//trace("numChildren = " + this.numChildren);
	}
}