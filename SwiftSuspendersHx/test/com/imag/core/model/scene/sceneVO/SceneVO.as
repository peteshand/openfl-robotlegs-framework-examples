package com.imag.core.model.scene.sceneVO 
{
	import flash.utils.Dictionary;
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class SceneVO
	{
		private var active:Boolean = true;
		private var root:SceneVO;
		private var parent:SceneVO;
		private var index:int = 0;
		private var id:String;
		private var children:Dictionary = new Dictionary();
		public var childrenVec:Vector.<SceneVO> = new Vector.<SceneVO>();
		private var _URIs:Vector.<String>;
		
		public function SceneVO() 
		{
			
		}
		
		public function add(index:*):SceneVO 
		{
			var child:SceneVO = getChild(index);
			return child;
		}
		
		private function getChild(index:*):SceneVO 
		{
			if (!children[index]) {
				if (this.parent) {
					this.parent.active = false;
				}
				
				var child:SceneVO = new SceneVO();
				child.index = childrenVec.length;
				if (this.parent) child.root = root;
				else child.root = this;
				child.parent = this;
				child.id = index;
				children[index] = child;
				childrenVec.push(child);
			}
			return SceneVO(children[index]);
		}
		
		public function get URIs():Vector.<String> 
		{
			_URIs = new Vector.<String>();
			for (var i:int = 0; i < childrenVec.length; i++) childrenVec[i].URIs;
			if (root && this.active) root._URIs.push(localURI());
			return _URIs;
		}
		
		private function localURI():String
		{
			if (parent) return parent.localURI() + id + "/";
			else return "";
		}
	}
}