package com.imag.texturePacker.atlas 
{
	import com.imag.texturePacker.atlas.group.BitmapAtlasGroup;
	import com.imag.texturePacker.atlas.group.sheet.BitmapAtlasSheet;
	import flash.display.BitmapData;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class BitmapAtlasUtils
	{
		private static var _waitTillNextFrame:Boolean = true;
		
		private static var DEFAULT_GROUP_ID:String = 'defaultGroupID';
		private static var bitmapAtlasGroups:Dictionary = new Dictionary();
		
		public function BitmapAtlasUtils() 
		{
			
		}
		
		private static function AtlasGroups(groupID:String=""):BitmapAtlasGroup
		{
			if (groupID == "") groupID = BitmapAtlasUtils.DEFAULT_GROUP_ID
			if (!bitmapAtlasGroups[groupID]) {
				bitmapAtlasGroups[groupID] = new BitmapAtlasGroup(groupID);
			}
			return BitmapAtlasGroup(bitmapAtlasGroups[groupID])
		}
		
		public static function addBitmapData(bmd:BitmapData, id:String, groupID:String="", altasImageIndex:int=0):void 
		{
			AtlasGroups(groupID).addBitmapData(bmd, id, altasImageIndex);
		}
		
		public static function releaseBitmapData(id:String, groupID:String, altasImageIndex:int=0):void 
		{
			AtlasGroups(groupID).releaseBitmapData(id, altasImageIndex);
		}
		public static function getBitmapAtlas(id:String, groupID:String=""):BitmapAtlasSheet 
		{
			return AtlasGroups(groupID).getBitmapAtlas(id);
		}
		
		public static function currentSheet(groupID:String=""):BitmapAtlasSheet 
		{
			return AtlasGroups(groupID).currentSheet;
		}
		
		public static function atlasUpdate(id:String, groupID:String=""):Signal 
		{
			return AtlasGroups(groupID).atlasUpdate(id);
		}	
		
		public static function forceUpload():void
		{
			for each (var item:BitmapAtlasGroup in bitmapAtlasGroups) 
			{
				item.forceUpload();
			}
		}
		
		static public function disposeGroup(groupID:String):void 
		{
			//AtlasGroups(groupID)
			if (bitmapAtlasGroups[groupID]) {
				BitmapAtlasGroup(bitmapAtlasGroups[groupID]).dispose();
				bitmapAtlasGroups[groupID] = null;
				delete bitmapAtlasGroups[groupID];
			}
		}
		
		static public function get waitTillNextFrame():Boolean 
		{
			return _waitTillNextFrame;
		}
		
		static public function set waitTillNextFrame(value:Boolean):void 
		{
			_waitTillNextFrame = value;
			if (!waitTillNextFrame) {
				trace("WARNING! setting waitTillNextFrame to false will cause large texture uploads every time a new image is added");
			}
		}
	}
}