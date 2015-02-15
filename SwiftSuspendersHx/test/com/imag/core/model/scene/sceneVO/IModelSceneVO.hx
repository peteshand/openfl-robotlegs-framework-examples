package com.imag.core.model.scene.sceneVO;
	
/**
 * ...
 * @author P.J.Shand
 */
interface IModelSceneVO 
{
	function child(index:Int):ModelSceneVO;
	function childById(id:String):ModelSceneVO;
}