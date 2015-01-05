package robotlegs.bender.extensions.imag.impl.view.stage3DExtension;

import flare.basic.Scene3D;
import flare.basic.Viewer3D;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Rectangle;
import robotlegs.bender.extensions.imag.api.view.stage3DExtension.ILayer;

/**
 * ...
 * @author P.J.Shand
 */
class FlareLayer extends Sprite implements ILayer 
{
	private var scene:Scene3D;
	
	public function FlareLayer() 
	{
		super();
		addEventListener(Event.ADDED_TO_STAGE, OnAdd);
	}
	
	private function OnAdd(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, OnAdd);
		scene = new Viewer3D(this);
		scene.stop();
	}
	
	
	public function update():Void
	{
		scene.update();
	}
	
	public function set rect(rect:Rectangle):Void
	{
		scene.viewPort.x = rect.x;
		scene.viewPort.y = rect.y;
		scene.viewPort.width = rect.width;
		scene.viewPort.height = rect.height;
	}
}