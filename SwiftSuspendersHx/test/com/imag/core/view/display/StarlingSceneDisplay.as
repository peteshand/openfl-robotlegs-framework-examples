package com.imag.core.view.display 
{
	import starling.display.Sprite;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class StarlingSceneDisplay extends Sprite implements ISceneDisplay 
	{
		private var _sceneIndices:Vector.<Vector.<int>> = new Vector.<Vector.<int>>();
		//private var _sceneIndices:Array = new Array();
		
		public function StarlingSceneDisplay() 
		{
			super();
			
		}
		
		public function setSceneIndices(level:int, indices:Vector.<int>):void
		{
			if (level > _sceneIndices.length) {
				for (var i:int = _sceneIndices.length; i < level; i++) 
				{
					_sceneIndices[i] = new <int>[0];
				}
			}
			_sceneIndices[level] = indices;
		}
		
		public function getSceneIndices(level:int):Vector.<int>
		{
			if (level > _sceneIndices.length) {
				for (var i:int = _sceneIndices.length; i < level; i++) 
				{
					_sceneIndices[i] = new <int>[0];
				}
			}
			return _sceneIndices[level];
		}
		
		public function Show():void
		{
			this.visible = true;
		}
		
		public function Hide():void
		{
			this.visible = false;
		}
		
		public function get sceneIndices():Vector.<Vector.<int>> 
		{
			return _sceneIndices;
		}
	}
}