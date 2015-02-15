package com.imag.texturePacker.starling 
{
	import com.imag.texturePacker.atlas.BitmapAtlasUtils;
	import com.imag.texturePacker.atlas.group.sheet.BitmapAtlasSheet;
	import com.imag.texturePacker.utils.BitmapDataUtils;
	import flash.display.DisplayObject;
	import flash.geom.Rectangle;
	import flash.text.StaticText;
	import flash.utils.Dictionary;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import org.osflash.signals.Signal;
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.textures.Texture;
	import starling.textures.TextureAtlas;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class AtlasImage extends Sprite 
	{
		private var display:*;
		private var m_sID:String;
		private var m_sGroupID:String;
		
		public var image:Image;
		private var textureAtlas:TextureAtlas;
		
		private var GPUMemoryAllocated:Boolean = false;
		public var update:Signal = new Signal(AtlasImage);
		
		private var _placeHolderTexture:Texture;
		private var _w:Number = 100;
		private var _h:Number = 100;
		
		private static var altasCount:int = 0;
		private var altasImageIndex:int;
		public var _bounds:Rectangle = new Rectangle();
		private var m_iAlign:int = Alignment.TOP_LEFT;
		
		private var tempImage:Image;
		private static var _inactiveStarlingTextures:Dictionary = new Dictionary();
		
		public function AtlasImage(display:*, id:String, groupID:String="", autoAllocateToGPU:Boolean=true) 
		{
			super();
			
			altasImageIndex = altasCount;
			altasCount++;
			
			this.display = display;
			this.m_sID = this.name = id;
			this.m_sGroupID = groupID;
			
			findBounds();
			createTempWidthHeightImage();
			if (autoAllocateToGPU) allocateGPUMemory();
		}
		
		private function findBounds():void 
		{
			if (display is BitmapData) _bounds = BitmapData(display).rect;
			else if (display is DisplayObject)
			{	
				_bounds = DisplayObject(display).getBounds(DisplayObject(display));
			}
		}
		
		public function allocateGPUMemory():void 
		{
			if (GPUMemoryAllocated) return;
			GPUMemoryAllocated = true;
			
			if (display.width == 0 || display.height == 0) {
				return;
			}
			
			var bmd:BitmapData;
			if (display is BitmapData) {
				bmd = display as BitmapData;
				_bounds = bmd.rect;
			}
			else if (display is DisplayObject) {
				
				_bounds = DisplayObject(display).getBounds(DisplayObject(display));
				bmd = BitmapDataUtils.fromDisplayObject(display as DisplayObject);
			}
			else {
				throw new Error("display type not supported: " + display);
				return;
			}
			
			createTempWidthHeightImage();
			
			_w = _bounds.width;
			_h = _bounds.height;
			
			BitmapAtlasUtils.atlasUpdate(m_sID, m_sGroupID).add(OnAtlasUpdate);
			BitmapAtlasUtils.addBitmapData(bmd, m_sID, m_sGroupID, altasImageIndex);
		}
		
		private function createTempWidthHeightImage():void 
		{
			if (!tempImage){
				tempImage = new Image(AtlasImage.inactiveStarlingTexture(groupID));
				addChild(tempImage);
				tempImage.x = _bounds.x;
				tempImage.y = _bounds.y;
				tempImage.width = _bounds.width;
				tempImage.height = _bounds.height;
			}
		}
		
		public function releaseGPUMemory():void 
		{
			if (!GPUMemoryAllocated) return;
			GPUMemoryAllocated = false;
			disposeImage();
			BitmapAtlasUtils.atlasUpdate(id, groupID).remove(OnAtlasUpdate);
			BitmapAtlasUtils.releaseBitmapData(m_sID, m_sGroupID, altasImageIndex);
		}
		
		private function disposeImage():void 
		{
			if (image) {
				if (image.parent) {
					image.parent.removeChild(image);
				}
				image.dispose();
				image = null;
			}
		}
		
		override public function dispose():void {
			BitmapAtlasUtils.atlasUpdate(id, groupID).remove(OnAtlasUpdate);
			releaseGPUMemory();
			super.dispose();
		}
		
		private function OnAtlasUpdate():void 
		{
			if (tempImage) {
				if (tempImage.parent) {
					tempImage.parent.removeChild(tempImage);
				}
				tempImage.dispose();
				tempImage = null;
			}
			
			disposeImage();
			
			var bitmapAtlasSheet:BitmapAtlasSheet = BitmapAtlasUtils.getBitmapAtlas(m_sID, m_sGroupID);
			if (bitmapAtlasSheet){
				textureAtlas = bitmapAtlasSheet.textureAtlas;
				
				if (!textureAtlas) return;
				
				var texture:Texture = textureAtlas.getTexture(m_sID);
				
				if (!texture) return;
				
				if (image) {
					image.texture = texture;
				}
				else {
					image = new Image(texture);
					addChild(image);	
				}
				image.x = _bounds.x;
				image.y = _bounds.y;
				
				_w = image.width;
				_h = image.height;
			}
			else {
				/*image.texture = placeHolderTexture;
				image.width = _w;
				image.height = _h;*/
				//addChild(image);
			}
			if (image) Alignment.align(align, image);
			
			update.dispatch(this);
			//display = null;
		}
		
		public function get placeHolderTexture():Texture 
		{
			if (!_placeHolderTexture) {
				_placeHolderTexture = Texture.fromColor(32, 32, 0xFF00FF00);
			}
			return _placeHolderTexture;
		}
		
		public function get id():String {
			return m_sID;
		}
		
		public function get groupID():String {
			return m_sGroupID;
		}
		
		public function get align():int {
			return m_iAlign;
		}
		
		public function set align(value:int):void {
			m_iAlign = value;
			if (image) {
				Alignment.align(align, image);
			}
		}
		
		static public function inactiveStarlingTexture(groupID:String):Texture 
		{
			if (!_inactiveStarlingTextures[groupID]) {
				_inactiveStarlingTextures[groupID] = Texture.fromColor(16, 16, 0xFF0000);
			}
			return Texture(_inactiveStarlingTextures[groupID]);
			
			/*if (!_inactiveStarlingTexture) _inactiveStarlingTexture = Texture.fromColor(16, 16, 0xFF0000);
			return _inactiveStarlingTexture;*/
		}
		
		static public function forceUpload():void 
		{
			BitmapAtlasUtils.forceUpload();
		}
	}
}