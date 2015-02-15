package com.imag.core.behaviors.scene;

/**
 * ...
 * @author P.J.Shand
 */
class SceneObject 
{
	public var mask:Bool = false;
	public var uri:String;
	
	public function new(uri:String) 
	{
		this.uri = uri;
	}
}