package com.imag.core.view.display 
{
	import com.imag.core.model.scene.SceneModel;
	import com.imag.core.utils.string.StringMatch;
	import robotlegs.bender.bundles.mvcs.Mediator;
	
	/**
	 * ...
	 * @author P.J.Shand
	 */
	public class SceneDisplayMediator extends Mediator 
	{
		[Inject] public var view:ISceneDisplay;
		[Inject] public var sceneModel:SceneModel;
		
		public function SceneDisplayMediator() 
		{
			super();
		}
		
		override public function initialize():void
		{
			view.initialize();
			sceneModel.change.add(OnSceneChange);
		}
		
		private function OnSceneChange():void 
		{
			trace("OnSceneChange");
			
			if (StringMatch.checkVec(sceneModel.uri, view.uris)) {
				view.Show();
			}
			else {
				view.Hide();
			}
		}
	}
}