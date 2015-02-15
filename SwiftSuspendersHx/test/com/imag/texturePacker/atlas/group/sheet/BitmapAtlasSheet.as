package com.imag.texturePacker.atlas.group.sheet 
{
	import away3d.tools.utils.TextureUtils;
	import com.imag.core.utils.delay.Delay;
	import com.imag.texturePacker.atlas.BitmapAtlasUtils;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.geom.Point;
	import org.osflash.signals.Signal;
	import starling.textures.Texture;
	import starling.textures.TextureAtlas;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class BitmapAtlasSheet
	{
		public static var MAX_SIZE:uint = 2048;
		public static var STORE_BMD:Boolean = true;
		public static var PADDING:uint = 1;
		
		private var minDimensions:Point = new Point();
		private var placementAreas:Vector.<PlacementArea> = new Vector.<PlacementArea>();
		private var currentPlacementArea:PlacementArea;
		private var bitmapData:BitmapData;
		private var bitmapAtlasObjects:Vector.<BitmapAtlasObject>;
		private var _textureAtlas:TextureAtlas;
		private var _texture:Texture;
		private var _atlasXML:XML;
		
		public var updateSignal:Signal = new Signal();
		
		private static var placement:Point = new Point();
		private var bm:Bitmap;
		private var groupID:String;
		
		public function BitmapAtlasSheet(groupID:String) 
		{
			this.groupID = groupID;
			initParams();
		}
		
		public function initParams():void
		{
			bitmapAtlasObjects = new Vector.<BitmapAtlasObject>();
			placementAreas = new Vector.<PlacementArea>();
			
			currentPlacementArea = new PlacementArea(0, 0, MAX_SIZE, MAX_SIZE);
			placementAreas.push(currentPlacementArea);
		}
		
		public function addBitmapData(allocationObject:BitmapAtlasObject):Boolean 
		{
			if (allocationObject.width > MAX_SIZE || allocationObject.height > MAX_SIZE) {
				trace("bitmap larger than max texture size");
				return false;
			}
			for (var i:int = 0; i < placementAreas.length; i++) 
			{
				if (placementAreas[i].available) {
					if (placementAreas[i].width >= allocationObject.width) {
						if (placementAreas[i].height >= allocationObject.height) {
							allocationObject.bitmapAtlasSheet = this;
							placementAreas[i].insert(allocationObject);
							
							placementAreas.push(placementAreas[i].placementAreas[0]);
							placementAreas.push(placementAreas[i].placementAreas[1]);
							placementAreas.splice(i, 1);
							
							bitmapAtlasObjects.push(allocationObject);
							
							if (minDimensions.x < allocationObject.x + allocationObject.width) {
								minDimensions.x = allocationObject.x + allocationObject.width
							}
							if (minDimensions.y < allocationObject.y + allocationObject.height) {
								minDimensions.y = allocationObject.y + allocationObject.height
							}
							
							if (BitmapAtlasUtils.waitTillNextFrame){
								Delay.killDelay(UpdateTextures);
								Delay.nextFrame(UpdateTextures);
							}
							else {
								UpdateTextures();
							}
							return true;
						}
					}
				}
			}
			
			return false;
		}
		
		public function dispose():void 
		{
			if (BitmapAtlasUtils.waitTillNextFrame){
				Delay.nextFrame(Dispose);
			}
			else {
				Dispose();
			}
		}
		
		public function contains(id:String):Boolean 
		{
			for (var i:int = 0; i < bitmapAtlasObjects.length; i++) 
			{
				if (bitmapAtlasObjects[i].id == id) {
					return true;
				}
			}
			return false;
		}
		
		public function forceUpload():void 
		{
			Delay.killDelay(UpdateTextures);
			UpdateTextures();
		}
		
		private function Dispose():void 
		{
			if (_textureAtlas) {
				if (_textureAtlas.texture) {
					_textureAtlas.texture.dispose();
				}
				_textureAtlas.texture.root.onRestore = null;
				_textureAtlas.dispose();
				_textureAtlas = null;
			}
			if (bm) {
				if (bm.parent) {
					bm.parent.removeChild(bm);
				}
			}
			if (bitmapData) {
				bitmapData.dispose();
				bitmapData = null;
			}
		}
		
		private function UpdateTextures():void 
		{
			if (_textureAtlas) {
				Dispose();
			}
			if (minDimensions.x == 0 || minDimensions.y == 0) return;
			minDimensions.x = TextureUtils.getBestPowerOf2(minDimensions.x);
			minDimensions.y = TextureUtils.getBestPowerOf2(minDimensions.y);
			bitmapData = new BitmapData(minDimensions.x, minDimensions.y, true, 0x00000000);
			bitmapData.lock();
			for (var i:int = 0; i < bitmapAtlasObjects.length; i++) 
			{
				bitmapData.draw(bitmapAtlasObjects[i].bitmapData, bitmapAtlasObjects[i].matrix, null, null, null, true);
			}
			bitmapData.unlock();
			
			_textureAtlas = new TextureAtlas(texture, atlasXML);
			_textureAtlas.texture.root.onRestore = OnContextRestore;
			updateSignal.dispatch();
			
			bitmapData.dispose();
			bitmapData = null;
		}
		
		private function OnContextRestore():void 
		{
			if (bitmapData){
				_textureAtlas.texture.root.uploadBitmapData(bitmapData);
			}
		}
		
		public function get textureAtlas():TextureAtlas 
		{
			return _textureAtlas;
		}
		
		public function get atlasXML():XML 
		{
			var _atlasXMLString:String = "";
			_atlasXMLString += '<TextureAtlas imagePath="null">';
			for (var i:int = 0; i < bitmapAtlasObjects.length; i++) 
			{
				_atlasXMLString += '<SubTexture name="' + bitmapAtlasObjects[i].id + '" x="' + bitmapAtlasObjects[i].x + '" y="' + bitmapAtlasObjects[i].y + '" width="' + bitmapAtlasObjects[i].width + '" height="' + bitmapAtlasObjects[i].height + '"/>';
			}
			_atlasXMLString += '</TextureAtlas>';
			return XML(_atlasXMLString);
		}
		
		private function get texture():Texture 
		{
			_texture = Texture.fromBitmapData(bitmapData, false);
			return _texture;
		}
	}
}