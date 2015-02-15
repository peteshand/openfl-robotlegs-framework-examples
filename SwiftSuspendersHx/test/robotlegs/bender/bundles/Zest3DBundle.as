package robotlegs.bender.bundles
{
	import robotlegs.bender.extensions.stage3D.zest3d.ZestIntegrationExtension;
	import robotlegs.bender.extensions.stage3D.zest3d.ZestStageSyncExtension;
	import robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension;
	import robotlegs.bender.framework.api.IBundle;
	import robotlegs.bender.framework.api.IContext;
	
	public class Zest3DBundle implements IBundle
	{
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			context.install(
				Stage3DStackExtension,
				ZestIntegrationExtension,
				ZestStageSyncExtension
			);
			
		}
	}
}
