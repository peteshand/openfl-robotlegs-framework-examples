package com.imag.texturePacker.atlas.group 
{
	import com.imag.core.utils.delay.Delay;
	import com.imag.texturePacker.atlas.BitmapAtlasUtils;
	import com.imag.texturePacker.atlas.group.sheet.BitmapAtlasObject;
	import com.imag.texturePacker.atlas.group.sheet.BitmapAtlasSheet;
	import flash.display.BitmapData;
	import flash.utils.Dictionary;
	import org.osflash.signals.Signal;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class BitmapAtlasGroup 
	{
		private var allocationObjects:Vector.<BitmapAtlasObject> = new Vector.<BitmapAtlasObject>();
		
		private var sheets:Vector.<BitmapAtlasSheet> = new Vector.<BitmapAtlasSheet>();
		private var _currentSheet:BitmapAtlasSheet;
		private var currentSheetIndex:int = 0;
		
		private var objects:Dictionary = new Dictionary(true);
		
		private var atlasReadySignals:Dictionary = new Dictionary(true);
		private var groupID:String;
		private var clearIDs:Vector.<String> = new Vector.<String>();
		private var altasImageIndexs:Vector.<int> = new Vector.<int>();
		
		public function BitmapAtlasGroup(groupID:String) 
		{
			this.groupID = groupID;
		}
		
		public function addBitmapData(bmd:BitmapData, id:String, altasImageIndex:int=0):void 
		{
			var allocationObject:BitmapAtlasObject = checkAlreadyExists(id);
			if (allocationObject) {
				allocationObject.bitmapData = bmd;
				if (allocationObject.updateSignal) {
					allocationObject.updateSignal.dispatch();
					bmd = null;
					return;
				}
				
			}
			else {
				allocationObject = new BitmapAtlasObject();
				allocationObject.bitmapData = bmd;
				allocationObject.id = id;
				allocationObject.width = bmd.width;
				allocationObject.height = bmd.height;
				allocationObjects.push(allocationObject);	
			}
			objects[allocationObject.id] = allocationObject;
			
			allocationObject.addAltasImageIndex(altasImageIndex);
			
			if (BitmapAtlasUtils.waitTillNextFrame){
				Delay.killDelay(ProcessAllocations);
				Delay.nextFrame(ProcessAllocations);
			}
			else {
				ProcessAllocations();
			}
		}
		
		private function checkAlreadyExists(id:String):BitmapAtlasObject 
		{
			for each (var item:BitmapAtlasObject in objects) 
			{
				if (item.id == id) {
					return item;
				}
			}
			return null;
		}
		
		private function ProcessAllocations():void 
		{
			SortAllocations.sort(allocationObjects);
			for (var i:int = 0; i < allocationObjects.length; i++) 
			{
				if (!objects[allocationObjects[i].id]) {
					allocationObjects.splice(i, 1);
					i--;
					continue;
				}
				var placedSuccessfully:Boolean = currentSheet.addBitmapData(allocationObjects[i]);
				if (placedSuccessfully) {
					allocationObjects[i].updateSignal = atlasUpdate(allocationObjects[i].id);
					allocationObjects.splice(i, 1);
					i--;
				}
			}
			
			if (allocationObjects.length > 0) {
				createNewCurrentSheet();
				ProcessAllocations();
			}
			else {
				//atlasReady.dispatch();
				for (var j:int = 0; j < atlasReadySignals.length; j++) 
				{
					if (objects[atlasReadySignals[i].id]) {
						atlasReadySignals[i].dispatch();
					}
				}
			}
		}
		
		private function createNewCurrentSheet():void 
		{
			_currentSheet = new BitmapAtlasSheet(groupID);
			sheets.push(_currentSheet)
			currentSheetIndex++;
		}
		
		public function releaseBitmapData(id:String, altasImageIndex:int=0):void 
		{
			if (objects[id]) {
				clearIDs.push(id);
				altasImageIndexs.push(altasImageIndex);
				if (BitmapAtlasUtils.waitTillNextFrame){
					Delay.killDelay(ProcessAllocations);
					Delay.killDelay(RecalculateAllocations);
					Delay.nextFrame(RecalculateAllocations);
				}
			}
		}
		
		private function RecalculateAllocations():void 
		{
			for (var j:int = 0; j < clearIDs.length; j++) 
			{
				var id:String = clearIDs[j]
				if (objects[id]) {
					BitmapAtlasObject(objects[id]).removeAltasImageIndex(altasImageIndexs[j]);
					
					if (BitmapAtlasObject(objects[id]).atlasImageIndexCount == 0) {
						BitmapAtlasObject(objects[id]).dispose();
						objects[id] = null;
						delete objects[id];
					}
				}
			}
			
			clearIDs = new <String>[];
			altasImageIndexs = new <int>[];
			
			for (var i:int = 0; i < sheets.length; i++) 
			{
				sheets[i].dispose();
				sheets[i] = null;
				sheets.splice(i, 1);
			}
			
			allocationObjects = new Vector.<BitmapAtlasObject>();
			for each (var item:BitmapAtlasObject in objects) 
			{
				allocationObjects.push(item);
			}
			
			currentSheetIndex = 0;
			createNewCurrentSheet()
			
			ProcessAllocations();
		}
		
		public function getBitmapAtlas(id:String):BitmapAtlasSheet 
		{
			var bitmapAtlasObject:BitmapAtlasObject = objects[id] as BitmapAtlasObject;
			if (bitmapAtlasObject) {
				return bitmapAtlasObject.bitmapAtlasSheet;
			}
			else {
				for (var i:int = 0; i < sheets.length; i++) 
				{
					if (sheets[i].contains(id)) {
						return sheets[i];
					}
				}
				return null;
			}
		}
		
		public function get currentSheet():BitmapAtlasSheet 
		{
			if (!_currentSheet) {
				createNewCurrentSheet();
			}
			return _currentSheet;
		}
		
		public function atlasUpdate(id:String):Signal 
		{
			if (!atlasReadySignals[id]) atlasReadySignals[id] = new Signal();
			return atlasReadySignals[id];
		}
		
		public function forceUpload():void 
		{
			if (allocationObjects.length > 0) {
				ProcessAllocations();
				for (var i:int = 0; i < sheets.length; i++) 
				{
					sheets[i].forceUpload();
				}
			}
		}
		
		public function dispose():void 
		{
			
		}
	}
}
import com.imag.texturePacker.atlas.group.sheet.BitmapAtlasObject;

class SortAllocations
{
	public function SortAllocations()
	{
		
	}
	
	public static function sort(allocationObjects:Vector.<BitmapAtlasObject>):void 
	{
		var sortArray:Array = new Array();
		for (var i:int = 0; i < allocationObjects.length; i++) 
			{ sortArray.push(allocationObjects[i]); }
		sortArray = sortArray.sortOn("area", Array.NUMERIC);
		
		allocationObjects = new Vector.<BitmapAtlasObject>();
		for (var j:int = sortArray.length-1; j >= 0; j--) 
		{
			allocationObjects.push(sortArray[j]);
		}
	}
}