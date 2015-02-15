package com.imag.core.model.scene.sceneVO;

/**
 * ...
 * @author P.J.Shand
 */
class ModelSceneVO implements IModelSceneVO
{
	public var parent:ModelSceneVO;
	public var index:Int = 0;
	public var id:String;
	public var children = new Array<ModelSceneVO>();
	
	public function new() 
	{
		
	}
	
	public function child(index:Int):ModelSceneVO 
	{
		if (index > children.length) return null;
		if (index == children.length) {
			var modelSceneVO:ModelSceneVO = new ModelSceneVO();
			modelSceneVO.parent = this;
			modelSceneVO.index = index;
			children.push(modelSceneVO);
			return modelSceneVO;
		}
		return children[index];
	}
	
	public function childById(id:String):ModelSceneVO 
	{
		for (i in 0...children.length) 
		{
			if (children[i].id == id) return children[i];
		}
		var modelSceneVO:ModelSceneVO = new ModelSceneVO();
		modelSceneVO.parent = this;
		modelSceneVO.id = id;
		modelSceneVO.index = children.length;
		children.push(modelSceneVO);
		return modelSceneVO;
	}
}