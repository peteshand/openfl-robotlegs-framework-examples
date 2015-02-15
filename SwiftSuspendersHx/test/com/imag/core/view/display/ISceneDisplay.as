package com.imag.core.view.display 
{
	import com.imag.core.model.scene.sceneVO.SceneVO;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public interface ISceneDisplay 
	{
		function Show():void;
		function Hide():void;
		
		function initialize():void;
		
		function get uris():Vector.<String>;
	}
}