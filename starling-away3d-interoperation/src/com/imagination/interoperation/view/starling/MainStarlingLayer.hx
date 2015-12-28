package com.imagination.interoperation.view.starling;

import openfl.Assets;
import openfl.display.BitmapData;
import openfl.Vector;
import robotlegs.bender.extensions.stage3D.starling.impl.StarlingLayer;
import starling.core.Starling;
import starling.display.MovieClip;
import starling.display.Quad;
import starling.utils.AssetManager;
import starling.textures.Texture;
import starling.events.EnterFrameEvent;


/**
 * ...
 * @author P.J.Shand
 */
class MainStarlingLayer extends StarlingLayer
{
	private var time:Float = 0;
	private var assets:AssetManager;
	private var mMovies:Vector<MovieClip>;
	
	public function new() 
	{
		super();
	}
	
	public function initialize():Void 
	{
		assets = new AssetManager();
		
		var atlas_xml:Xml = Xml.parse(Assets.getText("img/atlas.xml"));
		var atlas:BitmapData = Assets.getBitmapData("img/atlas.png");
		
		assets.enqueueWithName(atlas, "atlas");
		assets.enqueueWithName(atlas_xml, "atlas_xml");
		
		assets.loadQueue(function(ratio:Float):Void
		{
			if (ratio == 1) onComplete(assets);
		});
	}
	
	function onComplete(assets:AssetManager) 
	{
		var frames:Vector<Texture> = assets.getTextures("flight");
		mMovies = new Vector<MovieClip>();
		var num:Int = 10;
		for (i in 0...num) 
		{
			var t:Float = i / num;
			var mMovie:MovieClip = new MovieClip(frames, 15);
			mMovie.currentFrame = Math.floor(frames.length * Math.random());
			mMovie.y = -30 + (t * 460);
			mMovie.x = (i * (350 + (Math.random() * 50))) % 960;
			mMovie.scaleX = mMovie.scaleY = 0.6;
			addChild(mMovie);
			Starling.current.juggler.add(mMovie);
			
			mMovies.push(mMovie);
		}
		
		addEventListener(EnterFrameEvent.ENTER_FRAME, Update);
	}
	
	private function Update(e:EnterFrameEvent):Void 
	{
		for (i in 0...mMovies.length) 
		{
			mMovies[i].x += 1;
			if (mMovies[i].x > 960) mMovies[i].x = -200;
		}
	}
}