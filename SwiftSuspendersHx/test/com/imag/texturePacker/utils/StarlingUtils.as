package com.imag.texturePacker.utils 
{
	import com.imag.texturePacker.starling.AtlasImage;
	import com.imag.texturePacker.starling.DynamicSprite;
	import flash.geom.Rectangle;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.utils.describeType;
	import starling.display.Image;
	import starling.textures.Texture;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class StarlingUtils 
	{
		static private var groupID:String;
		static private var autoAllocateToGPU:Boolean;
		
		public function StarlingUtils() 
		{
			
		}
		
		public static function createDynamicSprite(display:DisplayObject, groupID:String, autoAllocateToGPU:Boolean=true):DynamicSprite 
		{
			StarlingUtils.autoAllocateToGPU = autoAllocateToGPU;
			StarlingUtils.groupID = groupID;
			var sprite:DynamicSprite = new DynamicSprite();
			if (display is MovieClip) {
				fromMovieClip(sprite, MovieClip(display));
			}
			else if (display is BitmapData) {
				fromBitmapData(sprite, BitmapData(display));
			}
			return sprite;
		}
		
		private static function fromBitmapData(parent:DynamicSprite, bmd:BitmapData):void 
		{
			var id:String = Number(Math.random() * 100000000000).toString(16);
			var atlasImage:AtlasImage = new AtlasImage(bmd, id, groupID, autoAllocateToGPU);
			atlasImage.x = 0;
			atlasImage.y = 0;
			atlasImage.name = id;
			parent[id] = atlasImage;
			parent.atlasImages.push(atlasImage);
			parent.addChildAt(atlasImage,0);
		}
		
		private static function fromMovieClip(parent:DynamicSprite, display:MovieClip):void 
		{
			if (display.name.indexOf("instance") != -1) {
				display.name = describeType(display).@name;
			}
			for (var i:int = display.numChildren-1; i >= 0; i--) 
			{
				var child:DisplayObject = display.getChildAt(i);
				var id:String = getChildID(child);
				
				var bounds:Rectangle = child.getBounds(child);
				var atlasImage:AtlasImage = new AtlasImage(child, id, groupID, autoAllocateToGPU);
				atlasImage.x = child.x;
				atlasImage.y = child.y;
				
				atlasImage.scaleX = child.scaleX;
				atlasImage.scaleY = child.scaleY;
				atlasImage.rotation = child.rotation / 180 * Math.PI;
				
				atlasImage.name = child.name;
				parent[child.name] = atlasImage;
				parent.atlasImages.push(atlasImage);
				parent.addChildAt(atlasImage, 0);
			}
		}
		
		private static function getChildID(child:DisplayObject):String 
		{
			var returnString:String = child.name;
			if (child.parent) returnString = getChildID(child.parent) + "/" + returnString;
			return returnString;
		}
	}

}