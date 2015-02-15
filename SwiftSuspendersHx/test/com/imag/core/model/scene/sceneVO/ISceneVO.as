package com.imag.core.model.scene.sceneVO 
{
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public interface ISceneVO 
	{
		function child(index:int):SceneVO ;
		function childById(id:String):SceneVO;
	}
	
}