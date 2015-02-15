package robotlegs.bender.extensions.imag.impl.commands.contextMenu 
{
	import com.greensock.TweenLite;
	import flash.display.DisplayObject;
	import flash.display.StageDisplayState;
	import flash.events.ContextMenuEvent;
	import flash.events.MouseEvent;
	import flash.net.navigateToURL;
	import flash.net.URLRequest;
	import flash.ui.ContextMenu;
	import flash.ui.ContextMenuItem;
	import robotlegs.bender.bundles.mvcs.Command;
	import robotlegs.bender.extensions.contextView.ContextView;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class ContextMenuCommand extends Command 
	{
		private var _menu0:ContextMenuItem;
		private var _menu1:ContextMenuItem;
		private var _ViewContextMenu:ContextMenu;
		[Inject] public var contextView:ContextView;
		
		public function ContextMenuCommand() { }
		private var _rightClickMenuEnabled:Boolean = true;
		
		override public function execute():void
		{
			// Doesn't work with AIR
			initRightClickMenu();
			
			//contextView.view.stage.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, OnRightClickDown);
			//contextView.view.stage.addEventListener(MouseEvent.RIGHT_CLICK, OnRightClick);
		}
		
		private function OnRightClickDown(e:MouseEvent):void 
		{
			updateRightClickMenu();
		}
		
		private function OnRightClick(e:MouseEvent):void 
		{
			updateRightClickMenu();
		}
		
		private function initRightClickMenu():void
		{
			_menu0 = new ContextMenuItem("Imagination", true, true, true);
			//_menu1 = new ContextMenuItem("View Source", true, true, true);
			//_menu0.addEventListener(ContextMenuEvent.MENU_ITEM_SELECT, visitWebsite);
			//_menu1.addEventListener(ContextMenuEvent.MENU_ITEM_SELECT, visitWebsite);
			_ViewContextMenu = new ContextMenu();
			
			updateRightClickMenu();
		}
		
		private function updateRightClickMenu():void
		{
			_ViewContextMenu.customItems = [_menu0];
			contextView.view.contextMenu = _ViewContextMenu;
		}
		
		/*private function visitWebsite(e:ContextMenuEvent):void
		{
			var url:String = "http://google.com";
			var request:URLRequest = new URLRequest(url);
			try {
				navigateToURL(request);
			} catch (error:Error) {
				
			}
		}*/
	}
}