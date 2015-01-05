package robotlegs.bender.extensions.away3d.impl; 

import away3d.containers.View3D;
import away3d.core.managers.Stage3DProxy;
import flash.geom.Rectangle;
import robotlegs.bender.extensions.imag.api.view.stage3DExtension.ILayer;

/**
 * ...
 * @author P.J.Shand
 */
 class AwayLayer extends View3D implements ILayer
{
	public function AwayLayer(stage3DProxy:Stage3DProxy, profile:String) 
	{
		super(null, null, null, false, profile);
		
		this.shareContext = true;
		this.stage3DProxy = stage3DProxy;
		this.rightClickMenuEnabled = false;
	}
	
	public function update():Void
	{
		this.render();
	}
	
	public function set rect(rect:Rectangle):Void
	{
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
	}
}